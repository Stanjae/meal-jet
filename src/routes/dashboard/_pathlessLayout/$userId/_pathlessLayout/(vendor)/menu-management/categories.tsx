import { useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { AddEditMenuCategory } from '@/components/molecules/modals/AddEditMenuCategory';
import { MenuCategoryTable } from '@/components/organisms/data-table/MenuCategoryTable';
import { useCreateMenuCategory } from '@/lib/api/services';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(vendor)/menu-management/categories'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync, isPending } = useCreateMenuCategory();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <section>
      <Group justify="space-between">
        <div className="flex items-center gap-4">
          <MJTextinput
            placeholder="Search by Category name"
            leftSection={<IconSearch className="text-primary" />}
            className="w-60"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <MJButton color="m-green.8" leftSection={<IconPlus />} onClick={open}>
            Add New Category
          </MJButton>
        </div>
      </Group>
      <MenuCategoryTable search={searchTerm} />
      <AddEditMenuCategory
        loading={isPending}
        handleSubmit={mutateAsync}
        opened={opened}
        onClose={close}
        title="Add New Category"
      />
    </section>
  );
}
