import { useMemo, useState } from 'react';
import {
  IconBike,
  IconCircleAsterisk,
  IconHeart,
  IconSearch,
  IconStarFilled,
} from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { ActionIcon, Avatar, Badge, Divider, Image, SimpleGrid, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import MJCardSkeleton from '@/components/atoms/loader/MJCardSkeleton';
import MJModal2 from '@/components/atoms/modals/MJModal2';
import MenuItemDetailsCard from '@/components/molecules/cards/MenuItemDetailsCard';
import VendorMenuItemCard from '@/components/molecules/cards/VendorItemCard';
import MJEmptyCard from '@/components/organisms/empty/MJEmptyCard';
import vendorClient from '@/lib/api/clients/vendor';
import { useGetMenuCategories, useGetMenuItems } from '@/lib/api/services';
import { UserType, type IMenuItem } from '@/lib/types';
import { formatCurrency, newDayJs, requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/store/$storeSlug'
)({
  component: RouteComponent,
  beforeLoad: () => requireRole(UserType.CUSTOMER),
  loader: async ({ params: { storeSlug } }) => await vendorClient.getVendorProfile(storeSlug),
});

function RouteComponent() {
  const {
    data: { vendor },
  } = Route.useLoaderData();

  const openDayObj = useMemo(
    () => vendor.openingHours.find((item) => item.day === newDayJs().format('d').toLowerCase()),
    [vendor]
  );

  const [activeTab, setActiveTab] = useState<string | null>('all');

  const [search, setSearch] = useState('');

  const [selectedMenuItem, setSelectedMenuItem] = useState<IMenuItem | null>(null);

  const [openedMenuItemModal, { open: openMenuItemModal, close: closeMenuItemModal }] =
    useDisclosure(false);

  const { data: menuCategories } = useGetMenuCategories({ vendorId: vendor?.id as string });

  const categoryName = useMemo(
    () => menuCategories?.data?.find((item) => item.id === activeTab),
    [menuCategories?.data, activeTab]
  );

  const { data: menuItems, isLoading: isMenuItemsLoading } = useGetMenuItems({
    vendorId: vendor?.id as string,
    categoryId: activeTab === 'all' ? undefined : (activeTab as string),
    search,
  });

  const handleMenuItemClick = (menuItem: IMenuItem) => {
    setSelectedMenuItem(menuItem);
    openMenuItemModal();
  };

  const handleCloseAction = () => {
    setSelectedMenuItem(null);
    closeMenuItemModal();
  };

  const isOpen = newDayJs().isBetween(
    `${newDayJs().format('YYYY-MM-DD')}T${openDayObj?.openTime}`,
    `${newDayJs().format('YYYY-MM-DD')}T${openDayObj?.closeTime}`
  );

  return (
    <div className="relative">
      {/* fixed header */}
      <section className=" fixed w-full space-y-2 z-30 pt-2 bg-white top-15">
        <div className="flex gap-2">
          <div className=" w-72 h-42 relative ">
            <Image
              src={vendor?.coverImage}
              alt={`${vendor?.name} cover image`}
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute bottom-2 left-0 flex w-full px-2 items-center justify-between">
              <Avatar size="md" src={vendor?.logo} />

              <div className="flex items-center gap-2">
                <Badge size="lg" variant="white">
                  {Number(vendor.avgPrepTime) - 10} - {vendor?.avgPrepTime} mins
                </Badge>
                <ActionIcon variant="white" className="rounded-full" size={'lg'}>
                  <IconHeart className="text-secondary" />
                </ActionIcon>
              </div>
            </div>
          </div>

          <div className=" space-y-1.5">
            <h1 className="text-2xl font-medium">{vendor?.name}</h1>
            <p className=" text-gray-400 text-sm">{vendor?.description}</p>
            <p className="text-sm text-primary underline">More Info</p>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {vendor?.deliveryFee > 0 ? (
                  <IconBike size={14} />
                ) : (
                  <IconCircleAsterisk className=" text-secondary" size={14} />
                )}

                <span className={` ${vendor?.deliveryFee > 0 ? '' : 'text-secondary'} text-sm`}>
                  {vendor?.deliveryFee > 0
                    ? `${formatCurrency(vendor.deliveryFee, 'NGN')}`
                    : 'Free delivery'}
                </span>
              </div>
              <Divider orientation="vertical" />
              <div className="flex items-center gap-1">
                <IconStarFilled color="gold" size={14} />
                <p className="font-semibold text-sm">
                  {vendor.avgRating.toFixed(1)}
                  <span className="text-sm text-gray-400 ml-1">({vendor?.totalRatings})</span>
                </p>
              </div>
            </div>

            <p className="font-semibold">
              <span className={`${isOpen ? 'text-green-600' : 'text-red-500'}`}>
                {isOpen ? 'Open now ' : 'Closed '}{' '}
              </span>
              until{' '}
              {!isOpen
                ? newDayJs(`${newDayJs().format('YYYY-MM-DD')}T${openDayObj?.openTime}`).format(
                    'h:mm A'
                  )
                : newDayJs(`${newDayJs().format('YYYY-MM-DD')}T${openDayObj?.closeTime}`).format(
                    'h:mm A'
                  )}
            </p>
          </div>
        </div>
        <MJTextinput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          radius={10}
          className="w-full max-w-6xl my-4"
          leftSection={<IconSearch />}
          placeholder={`Search for ${vendor?.name}`}
        />
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value={'all'}>All</Tabs.Tab>
            {menuCategories?.data?.map((category) => (
              <Tabs.Tab value={category?.id}>{category?.name}</Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </section>

      {/* menu items */}
      <section className=" relative top-70">
        <h2 className="text-xl capitalize mb-5">
          {activeTab === 'all' ? 'All' : categoryName?.name}
        </h2>

        {isMenuItemsLoading && <MJCardSkeleton cols={2} type="menuItem" totalCount={10} />}

        <SimpleGrid cols={2} spacing="md">
          {menuItems?.data?.map((item) => (
            <VendorMenuItemCard handleClick={handleMenuItemClick} menuItem={item} key={item.id} />
          ))}
        </SimpleGrid>

        {/* menu item modal */}
        <MJModal2
          title={isOpen ? '' : 'Closed'}
          size={550}
          opened={openedMenuItemModal}
          onClose={closeMenuItemModal}
        >
          {isOpen ? (
            <MenuItemDetailsCard
              vendor={vendor}
              closeAction={handleCloseAction}
              menuItem={selectedMenuItem}
            />
          ) : (
            <MJEmptyCard type="vendorClosed" />
          )}
        </MJModal2>
      </section>
    </div>
  );
}
