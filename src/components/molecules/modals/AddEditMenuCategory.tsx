import { useEffect, useState } from 'react';
import { Divider, Group } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import MJModal from '@/components/atoms/modals/MJModal';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { TCreateMeuCategoryPayload, TPostApiResponse } from '@/lib/types';

type AddEditMenuCategoryProps = {
  opened: boolean;
  categoryId?: string;
  onClose: () => void;
  title: string;
  defaultValue?: string;
  handleSubmit?: (
    payload: TCreateMeuCategoryPayload
  ) => Promise<TPostApiResponse<{ message: string }>>;
  loading?: boolean;
  isEditingMode?: boolean;
};
export const AddEditMenuCategory = ({
  opened,
  onClose,
  title,
  defaultValue,
  handleSubmit,
  loading,
  categoryId,
  isEditingMode,
}: AddEditMenuCategoryProps) => {
  const { vendor } = useMealJetStore((state) => state);
  const [categoryName, setCategoryName] = useState(defaultValue ?? '');

  const [error, setError] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (defaultValue) setCategoryName(defaultValue);
  }, [defaultValue]);

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    try {
      await handleSubmit?.({ name: categoryName, vendorId: vendor?.id as string, id: categoryId });
      onClose();
      setCategoryName('');
    } catch (e) {
      console.error('Failed to create category', e);
    }
  };

  return (
    <MJModal transition={'pop'} opened={opened} onClose={onClose} title={title}>
      <div>
        <MJTextinput
          error={error}
          placeholder="Eg: Beverages"
          label="Category Name"
          value={categoryName}
          onChange={(e) => {
            if (error && e.target.value) setError('');
            setCategoryName(e.target.value);
          }}
        />
        <Divider my="lg" />
        <Group justify="space-between">
          <MJButton onClick={onClose} color="gray.6">
            Cancel
          </MJButton>
          <MJButton loading={loading} onClick={handleCreateCategory} color="m-green.8">
            {isEditingMode ? 'Update Category' : 'Create Category'}
          </MJButton>
        </Group>
      </div>
    </MJModal>
  );
};
