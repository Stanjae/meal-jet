import { useState } from 'react';
import { IconDots } from '@tabler/icons-react';
import { ActionIcon, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MJTable } from '@/components/atoms/table/MJTable';
import MJDropdown from '@/components/molecules/dropdowns/MJDropdown';
import { AddEditMenuCategory } from '@/components/molecules/modals/AddEditMenuCategory';
import { ConfirmationModal } from '@/components/molecules/modals/ConfirmationModal';
import {
  useDeleteMenuCategory,
  useDeleteMultipleMenuCategories,
  useGetMenuCategories,
  useUpdateMenuCategory,
} from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { MJDropdownOption, MJRecord, MJTableColumn } from '@/lib/types';

export const OrderHistoryTable = ({ search }: { search?: string }) => {
  const { vendor } = useMealJetStore((state) => state);

  const [opened, { open, close }] = useDisclosure(false);

  const [activePage, setPage] = useState(1);

  const [confirmationOpened, { open: openConfirmation, close: closeConfirmation }] =
    useDisclosure(false);
  const { mutateAsync, isPending } = useUpdateMenuCategory();

  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } = useDeleteMenuCategory();

  const { mutateAsync: deleteMultipleMutateAsync, isPending: isDeleteMultiplePending } =
    useDeleteMultipleMenuCategories();

  const [row, setRow] = useState<MJRecord | null>(null);

  const handleDeleteCategory = async () => {
    try {
      await deleteMutateAsync(row?.id as string);
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
          setRow(row);
          open();
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
    { label: 'Name', accessorKey: 'name' },
    { label: 'Number of items', accessorKey: 'itemCount' },
    {
      label: 'Visibility',
      accessorKey: 'isVisible',
      render: (data) => (
        <Switch
          onChange={async (event) =>
            await mutateAsync({
              id: data.id as string,
              vendorId: data.vendorId as string,
              isVisible: event.currentTarget.checked,
            })
          }
          defaultChecked={data.isVisible as boolean}
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
  const { data, isLoading } = useGetMenuCategories({
    vendorId: vendor?.id as string,
    page: activePage,
    search,
  });

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
        bulkConfirmAction={deleteMultipleMutateAsync}
        bulkConfirmLoading={isDeleteMultiplePending}
      />
      <AddEditMenuCategory
        loading={isPending}
        defaultValue={row?.name as string}
        categoryId={row?.id as string}
        handleSubmit={mutateAsync}
        opened={opened}
        isEditingMode={true}
        onClose={close}
        title="Edit Category"
      />
      <ConfirmationModal
        opened={confirmationOpened}
        loading={isDeletePending}
        onClose={closeConfirmation}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        onConfirm={handleDeleteCategory}
        type="critical"
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </div>
  );
};
