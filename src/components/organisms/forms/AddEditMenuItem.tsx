import { LoadingOverlay } from '@mantine/core';
import MJFormsCardSection from '@/components/molecules/forms/MJFormsCardSection';
import { getMenuItemFields, getRightSectionMenuItemFields } from '@/lib/constants';
import useAddEditMenuItem from '@/lib/hooks/useAddEditMenuItem';
import type { MJSelectOption } from '@/lib/types';

type AddEditMenuItemProps = {
  categoryData?: MJSelectOption[];
  itemId?: string;
  onClose?: () => void;
};

const AddEditMenuItem = ({ categoryData, itemId, onClose }: AddEditMenuItemProps) => {
  const {
    errors,
    getInputProps,
    key: formKey,
    getValues,
    insertListItem,
    removeListItem,
    setValues,
    handleSave,
    loading,
    isInitialValuesLoading,
  } = useAddEditMenuItem({ itemId, onClose });

  const leftSectionFields = getMenuItemFields({ errors, selects: { categoryData } });

  const rightSectionFields = getRightSectionMenuItemFields({ errors });
  return (
    <div className="relative">
      <LoadingOverlay
        visible={isInitialValuesLoading && !itemId}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <MJFormsCardSection
        formKey={formKey}
        setValues={setValues}
        getInputProps={getInputProps}
        leftSectionFields={leftSectionFields}
        rightSectionFields={rightSectionFields}
        getValues={getValues}
        insertListItem={insertListItem}
        removeListItem={removeListItem}
        errors={errors}
        handleSubmit={handleSave}
        loading={loading}
        isEdit={!!itemId}
      />
    </div>
  );
};

export default AddEditMenuItem;
