import { useState } from 'react';
import { IconDots } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { ActionIcon, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MJTable } from '@/components/atoms/table/MJTable';
import MJDropdown from '@/components/molecules/dropdowns/MJDropdown';
import { ConfirmationModal } from '@/components/molecules/modals/ConfirmationModal';
import { useGetMenuItems, useHandleMenuItem } from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { MJDropdownOption, MJRecord, MJTableColumn } from '@/lib/types';

type MenuItemsTableProps = {
  search?: string;
  selectedCategory?: string | null;
  selectedStock?: string | null;
};

export const MenuItemsTable = ({
  search,
  selectedCategory,
  selectedStock,
}: MenuItemsTableProps) => {
  const { vendor, user } = useMealJetStore((state) => state);

  const [activePage, setPage] = useState(1);

  const navigate = useNavigate();

  const [confirmationOpened, { open: openConfirmation, close: closeConfirmation }] =
    useDisclosure(false);

  const { deleteMenuItem, deleteMultipleMenuItems, updateMenuItemStockStatus } =
    useHandleMenuItem();

  const [row, setRow] = useState<MJRecord | null>(null);

  const handleEditSelection = (row: MJRecord) => {
    navigate({
      to: '/dashboard/$userId/menu-management/edit/$itemId',
      params: { userId: user?.id as string, itemId: row.id as string },
    });
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteMenuItem.mutateAsync(row?.id as string);
      closeConfirmation();
    } catch (error) {
      console.log(error);
    }
  };
  const menuOptions = (row: MJRecord): MJDropdownOption[] => {
    return [
      {
        label: 'Edit',
        value: 'edit',
        type: 'button',
        action: () => {
          handleEditSelection(row);
        },
      },
      {
        label: 'Delete',
        value: 'delete',
        color: 'red',
        type: 'button',
        action: () => {
          setRow(row);
          openConfirmation();
        },
      },
    ];
  };
  const columns: MJTableColumn[] = [
    { label: 'Image', accessorKey: 'image', isImageAccessor: true },
    { label: 'Name', accessorKey: 'name' },
    { label: 'Category', accessorKey: 'categoryName' },
    { label: 'Price', accessorKey: 'price' },
    {
      label: 'In Stock',
      accessorKey: 'isAvailable',
      render: (data) => (
        <Switch
          onChange={async (event) =>
            await updateMenuItemStockStatus.mutateAsync({
              id: data.id as string,
              isAvailable: event.currentTarget.checked,
            })
          }
          defaultChecked={data.isAvailable as boolean}
        />
      ),
    },
    {
      label: 'Actions',
      accessorKey: 'actions',
      render: (row) => (
        <MJDropdown
          items={menuOptions(row)}
          target={
            <ActionIcon variant="subtle">
              <IconDots />
            </ActionIcon>
          }
        />
      ),
    },
  ];
  const { data, isLoading } = useGetMenuItems(
    {
      vendorId: vendor?.id as string,
      page: activePage,
      search,
      categoryId: selectedCategory as string,
      stockStatus: selectedStock as string,
    },
    (data) => {
      return {
        ...data,
        data: data?.data?.map((item) => ({
          ...item,
          categoryName: item.category.name,
          categoryId: item.category._id,
        })),
      };
    }
  );

  return (
    <div className="mt-4">
      <MJTable
        loading={isLoading}
        data={data?.data}
        columns={columns}
        activePage={activePage}
        setPage={setPage}
        totalPages={data?.meta?.totalPages as number}
        totalCount={data?.meta?.total as number}
        maxTableHeight={650}
        bulkConfirmAction={deleteMultipleMenuItems.mutateAsync}
        bulkConfirmLoading={deleteMultipleMenuItems.isPending}
        isCheckboxSelection
      />
      <ConfirmationModal
        opened={confirmationOpened}
        loading={deleteMenuItem.isPending}
        onClose={closeConfirmation}
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item?"
        onConfirm={handleDeleteCategory}
        type="critical"
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </div>
  );
};
