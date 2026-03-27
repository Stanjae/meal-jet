import { useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { Divider, Group, Radio, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import { MJRadioCard } from '@/components/atoms/cards/MJRadioCard';
import MJDrawer from '@/components/atoms/drawer/MJDrawer';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import MJModal from '@/components/atoms/modals/MJModal';
import MJButtonSearchDropdown from '@/components/molecules/inputs/MJButtonSearchDropdown';
import { MenuItemsTable } from '@/components/organisms/data-table/MenuItemsTable';
import AddEditMenuItem from '@/components/organisms/forms/AddEditMenuItem';
import { useGetMenuCategories } from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import { requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(vendor)/menu-management/'
)({
  component: RouteComponent,
  beforeLoad: () => requireRole(UserType.VENDOR),
});

function RouteComponent() {
  const [search, setSearch] = useState('');
  const [searchItem, setSearchItem] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const { vendor } = useMealJetStore((state) => state);

  const { data, isLoading } = useGetMenuCategories(
    { vendorId: vendor?.id as string, search },
    (data) => data.data.map((category) => ({ label: category.name, value: category.id }))
  );

  const [addModalSelectedOption, setAddModalSelectedOption] = useState<string | null>(null);
  const [openedAddItemModal, { open: openAddItemModal, close: closeAddItemModal }] =
    useDisclosure();

  const [openedAddItemDrawer, { open: openAddItemDrawer, close: closeAddItemDrawer }] =
    useDisclosure();

  const handleAddItem = () => {
    if (addModalSelectedOption === 'import_csv') {
      // Handle CSV import logic
    } else if (addModalSelectedOption === 'add_single') {
      openAddItemDrawer();
    } else {
      return null;
    }
  };

  const addItemOptions = [
    {
      name: 'Import Items via CSV',
      description: 'Import multiple items at once using a CSV file',
      id: 'import_csv',
    },
    {
      name: 'Add Single Item',
      description: 'Add a single item by filling out a form',
      id: 'add_single',
    },
  ];

  const stockOptions = [
    { label: 'In Stock', value: 'in_stock' },
    { label: 'Out of Stock', value: 'out_of_stock' },
  ];

  const handleCloseAll = () => {
    closeAddItemModal();
    closeAddItemDrawer();
  };
  return (
    <section>
      <Group justify="space-between">
        <div className="flex items-center gap-4">
          <MJTextinput
            placeholder="Search by Item name"
            leftSection={<IconSearch className="text-primary" />}
            className="w-50"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />

          <MJButtonSearchDropdown
            search={search}
            setSearch={setSearch}
            loading={isLoading}
            defaultValue="Category"
            data={data}
            setSelectedValue={setSelectedCategory}
          />
          <MJButtonSearchDropdown
            defaultValue="Stock"
            data={stockOptions}
            setSelectedValue={setSelectedStock}
          />
        </div>
        <div className="flex items-center gap-4">
          <MJButton color="m-green.9">Export</MJButton>
          <MJButton leftSection={<IconPlus />} onClick={openAddItemModal}>
            Add New Item
          </MJButton>
        </div>
      </Group>

      {/* add item action modals */}
      <MJModal opened={openedAddItemModal} onClose={closeAddItemModal} title="Select an Action">
        <Radio.Group
          value={addModalSelectedOption}
          onChange={setAddModalSelectedOption}
          label="Select an Action"
          withAsterisk
        >
          <Stack>
            {addItemOptions.map((vendor) => (
              <MJRadioCard
                key={vendor.id}
                value={vendor.id}
                title={vendor.name}
                description={vendor.description}
              />
            ))}
          </Stack>
        </Radio.Group>
        <Divider my="md" />
        <MJButton fullWidth disabled={!addModalSelectedOption} onClick={handleAddItem}>
          Continue
        </MJButton>
      </MJModal>

      {/* add item action drawer */}
      <MJDrawer
        size={'97%'}
        position="bottom"
        opened={openedAddItemDrawer}
        onClose={closeAddItemDrawer}
        title="Add an Item"
      >
        <AddEditMenuItem onClose={handleCloseAll} categoryData={data} />
      </MJDrawer>

      <MenuItemsTable
        selectedCategory={selectedCategory}
        search={searchItem}
        selectedStock={selectedStock}
      />
    </section>
  );
}
