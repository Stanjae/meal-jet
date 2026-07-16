import { useMemo, useState } from 'react';
import {
  IconArrowNarrowLeft,
  IconBike,
  IconCircleAsterisk,
  IconHeart,
  IconSearch,
  IconStarFilled,
} from '@tabler/icons-react';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router';
import {
  ActionIcon,
  Avatar,
  Badge,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Tabs,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import MJCardSkeleton from '@/components/atoms/loader/MJCardSkeleton';
import MJModal2 from '@/components/atoms/modals/MJModal2';
import MenuItemDetailsCard from '@/components/molecules/cards/MenuItemDetailsCard';
import VendorMenuItemCard from '@/components/molecules/cards/VendorItemCard';
import MJEmptyCard from '@/components/organisms/empty/MJEmptyCard';
import vendorClient from '@/lib/api/clients/vendor';
import { useGetMenuCategories, useGetMenuItems } from '@/lib/api/services';
import { emptyStateConfig } from '@/lib/constants';
import { UserType, type IMenuItem } from '@/lib/types';
import { formatCurrency, newDayJs, requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/store/$storeSlug'
)({
  component: RouteComponent,
  beforeLoad: () => requireRole([UserType.CUSTOMER]),
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

  const router = useRouter();
  const canGoBack = useCanGoBack();
  return (
    <div className="relative">
      {/*  fixed header for large screens */}
      <section className=" hidden lg:block fixed w-full space-y-2 z-30 pt-2 bg-white top-15">
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
              <span className={`${vendor?.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                {vendor?.isOpen ? 'Open now ' : 'Closed '}{' '}
              </span>
              until{' '}
              {!vendor?.isOpen
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

      {/*  fixed header for small screens */}
      <section className=" lg:hidden block w-full space-y-2 z-30 pt-2 bg-white top-15">
        <div className="h-30 relative">
          <ActionIcon variant="white" className="rounded-full absolute right-3 top-3" size={'lg'}>
            <IconHeart className="text-secondary" />
          </ActionIcon>
          {canGoBack && (
            <ActionIcon
              onClick={() => router.history.back()}
              variant="white"
              className="rounded-full absolute left-3 right-3 top-3"
              size={'lg'}
            >
              <IconArrowNarrowLeft />
            </ActionIcon>
          )}
          <Image
            src={vendor?.coverImage}
            alt={`${vendor?.name} cover image`}
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-1.5">
            <Avatar size="lg" src={vendor?.logo} />
          </div>
        </div>
        <div className=" pt-6 space-y-1.5">
          <h1 className="text-lg text-center font-medium">{vendor?.name}</h1>
          <p className="font-semibold text-center">
            <span className={`${vendor?.isOpen ? 'text-green-600' : 'text-red-500'}`}>
              {vendor?.isOpen ? 'Open now ' : 'Closed '}{' '}
            </span>
            until{' '}
            {!vendor?.isOpen
              ? newDayJs(`${newDayJs().format('YYYY-MM-DD')}T${openDayObj?.openTime}`).format(
                  'h:mm A'
                )
              : newDayJs(`${newDayJs().format('YYYY-MM-DD')}T${openDayObj?.closeTime}`).format(
                  'h:mm A'
                )}
          </p>
          <Paper py="sm" className="my-5" withBorder>
            <Group grow justify="center">
              <div className="border-r border-gray-200">
                <Text c="dimmed" className="text-xs mb-1 text-center font-medium">
                  Delivery fee
                </Text>
                <p
                  className={` ${vendor?.deliveryFee > 0 ? '' : 'text-secondary'} text-sm text-center`}
                >
                  {vendor?.deliveryFee > 0
                    ? `${formatCurrency(vendor.deliveryFee, 'NGN')}`
                    : 'Free delivery'}
                </p>
              </div>
              <div className="border-r border-gray-200">
                <Text c="dimmed" className="text-xs mb-1 text-center font-medium">
                  Preparation time
                </Text>
                <p
                  className={` ${vendor?.deliveryFee > 0 ? '' : 'text-secondary'} text-sm text-center`}
                >
                  {Number(vendor.avgPrepTime) - 10} - {vendor?.avgPrepTime} mins
                </p>
              </div>
              <div className="border-r border-gray-200">
                <Text c="dimmed" className="text-xs text-center font-medium">
                  Ratings
                </Text>
                <div className="flex items-center justify-center gap-1">
                  <IconStarFilled color="gold" size={14} />
                  <p className="font-semibold text-sm">
                    {vendor.avgRating.toFixed(1)}
                    <span className="text-sm text-gray-400 ml-1">({vendor?.totalRatings})</span>
                  </p>
                </div>
              </div>
            </Group>
          </Paper>
        </div>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List className="flex flex-nowrap overflow-x-auto">
            <Tabs.Tab value={'all'}>All</Tabs.Tab>
            {menuCategories?.data?.map((category) => (
              <Tabs.Tab value={category?.id}>{category?.name}</Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </section>

      {/* menu items */}
      <section className=" relative top-7 lg:top-70 pb-7">
        <h2 className="text-xl capitalize mb-5">
          {activeTab === 'all' ? 'All' : categoryName?.name}
        </h2>

        {isMenuItemsLoading && <MJCardSkeleton cols={2} type="menuItem" totalCount={10} />}

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {menuItems?.data?.map((item) => (
            <VendorMenuItemCard handleClick={handleMenuItemClick} menuItem={item} key={item.id} />
          ))}
        </SimpleGrid>

        {/* menu item modal */}
        <MJModal2
          title={vendor?.isOpen ? '' : 'Closed'}
          size={550}
          opened={openedMenuItemModal}
          onClose={closeMenuItemModal}
        >
          {vendor?.isOpen ? (
            <MenuItemDetailsCard
              vendor={vendor}
              closeAction={handleCloseAction}
              menuItem={selectedMenuItem}
            />
          ) : (
            <MJEmptyCard emptyState={emptyStateConfig.vendorClosed} />
          )}
        </MJModal2>
      </section>
    </div>
  );
}
