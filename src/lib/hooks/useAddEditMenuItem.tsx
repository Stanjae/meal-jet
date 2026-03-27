import { useEffect } from 'react';
import { useGetMenuItem, useHandleMenuItem } from '../api/services';
import { initialMenuItemValues } from '../constants';
import { useMealJetStore } from '../store/zustand.store';
import { transformToFormData } from '../utils/helpers/helpers';
import { fullMenuItemsSchema } from '../utils/schema';
import useMealjetForm from './useMealjetForm';

type UseAddEditMenuItemProps = {
  itemId?: string;
  onClose?: () => void;
};

const useAddEditMenuItem = ({ itemId, onClose }: UseAddEditMenuItemProps) => {
  const isEditMode = !!itemId;
  const { vendor } = useMealJetStore((state) => state);
  const {
    errors,
    setValues,
    getValues,
    isValid,
    getInputProps,
    initialize,
    key,
    insertListItem,
    removeListItem,
    onSubmit,
  } = useMealjetForm({
    schema: fullMenuItemsSchema,
    defaultValues: { ...initialMenuItemValues, vendor: vendor?.id as string },
  });

  const { createMenuItem, updateMenuItem } = useHandleMenuItem();

  const { data: menuItemData, isLoading } = useGetMenuItem(
    { vendorId: vendor?.id as string, itemId },
    (data) => {
      return {
        ...data,
        data: {
          ...data.data,
          category: data.data.category._id,
          discountPrice: data.data.discountPrice as number,
          calories: data.data.calories as number,
          image: data.data.image as unknown as File,
          images: data.data.images as unknown as File[],
        }, // Assuming category is an object with an id property
      };
    }
  );

  useEffect(() => {
    const menuItem = menuItemData?.data;
    if (menuItem) {
      initialize(menuItem);
    }
  }, [menuItemData?.data, initialize]);

  const handleSave = () => {
    onSubmit(async (values) => {
      try {
        const newPayload = isEditMode
          ? { ...values, id: itemId } // Include the item ID for updates
          : values;
        const formData = transformToFormData(newPayload);
        if (isEditMode) {
          await updateMenuItem.mutateAsync(formData);
        } else {
          await createMenuItem.mutateAsync(formData);
          if (onClose) {
            onClose();
          }
        }
      } catch (error) {
        console.error('Error creating menu item:', error);
      }
    })();
  };

  console.log('Errors:', errors);

  return {
    errors,
    setValues,
    getValues,
    isValid,
    getInputProps,
    key,
    insertListItem,
    removeListItem,
    handleSave,
    loading: createMenuItem.isPending || updateMenuItem.isPending,
    isInitialValuesLoading: isLoading,
  };
};

export default useAddEditMenuItem;
