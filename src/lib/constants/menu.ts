import type { FormErrors } from '@mantine/form';
import type { MJSelectOption, TMenuItemFieldGroup, TMenuItemsFields } from '../types';

type TMenuItemField = { errors: FormErrors; selects?: { categoryData?: MJSelectOption[] } };

export const getBasicInfoFields = ({ errors, selects }: TMenuItemField): TMenuItemsFields[] => {
  return [
    {
      name: 'name',
      label: 'Item Name',
      placeholder: 'Eg. Grilled Chicken Sandwich',
      type: 'text',
      required: true,
      error: errors.name as string,
    },
    {
      name: 'category',
      label: 'Category',
      placeholder: 'Select category',
      type: 'select',
      required: true,
      error: errors.category as string,
      data: selects?.categoryData,
    },
    {
      name: 'description',
      label: 'Description',
      placeholder: 'Provide a brief description of the item',
      type: 'textarea',
      required: true,
      error: errors.description as string,
    },
  ];
};

export const getPricingAndFulfillmentFields = ({ errors }: TMenuItemField): TMenuItemsFields[] => {
  return [
    {
      name: 'price',
      label: 'Price',
      placeholder: 'Enter the price for the item',
      type: 'currency',
      required: true,
      error: errors.price as string,
    },
    {
      name: 'discountPrice',
      label: 'Discount Price',
      placeholder: 'Enter the discounted price (optional)',
      type: 'currency',
      required: false,
      error: errors.discountPrice as string,
    },
    {
      name: 'prepTime',
      label: 'Preparation Time (in minutes)',
      placeholder: 'Enter the preparation time for the item',
      type: 'number',
      required: true,
      error: errors.prepTime as string,
    },
  ];
};

export const getVisibilityAndMerchandisingFields = ({
  errors,
}: TMenuItemField): TMenuItemsFields[] => {
  return [
    {
      name: 'isAvailable',
      label: 'Available',
      description: 'Show this item on the menu and allow customers to order it',
      type: 'switch',
      required: true,
      error: errors.isAvailable as string,
    },
    {
      name: 'isPopular',
      label: 'Popular',
      description: 'Mark this item as popular to highlight it on the menu',
      type: 'switch',
      required: false,
      error: errors.isPopular as string,
    },
    {
      name: 'isFeatured',
      label: 'Featured',
      description: 'Mark this item as featured to give it more prominence on the menu',
      type: 'switch',
      required: false,
      error: errors.isFeatured as string,
    },
  ];
};

export const getNutritionFields = ({ errors }: TMenuItemField): TMenuItemsFields[] => {
  return [
    {
      name: 'calories',
      label: 'Calories',
      placeholder: 'Enter the calorie count for the item (optional) Eg. 620',
      type: 'number',
      required: false,
      error: errors.calories as string,
    },
    {
      name: 'allergens',
      label: 'Allergens',
      placeholder: 'Select any allergens present in the item',
      type: 'multiselect',
      required: false,
      error: errors.allergens as string,
      data: menuAllergens.map((allergen) => ({ value: allergen, label: allergen })),
    },
    {
      name: 'tags',
      label: 'Tags',
      placeholder: 'Select relevant tags for the item',
      type: 'multiselect',
      required: false,
      error: errors.tags as string,
      data: menuItemsTags.map((tag) => ({ value: tag, label: tag })),
    },
  ];
};

export const getAddonsFields = ({ errors }: TMenuItemField): TMenuItemsFields[] => {
  return [
    {
      name: 'addons',
      label: 'Addons',
      type: 'group',
      required: false,
      error: errors.addons as string,
    },
  ];
};

export const getPrimaryImageGalleryFields = ({ errors }: TMenuItemField): TMenuItemsFields[] => {
  return [
    {
      name: 'image',
      label: 'Primary Image',
      type: 'file',
      required: true,
      error: errors.image as string,
    },
    {
      name: 'images',
      label: 'Gallery Images',
      type: 'files',
      required: false,
      error: errors.images as string,
    },
  ];
};

export const getMenuItemFields = ({ errors, selects }: TMenuItemField): TMenuItemFieldGroup[] => {
  return [
    {
      title: 'Basic Info',
      fields: getBasicInfoFields({ errors, selects }),
    },
    {
      title: 'Pricing and Fulfillment',
      fields: getPricingAndFulfillmentFields({ errors }),
    },
    {
      title: 'Visibility and Merchandising',
      fields: getVisibilityAndMerchandisingFields({ errors }),
    },
    {
      title: 'Nutrition and Tags',
      fields: getNutritionFields({ errors }),
    },
    {
      title: 'Addons',
      description: 'Add customizable options for this menu item, such as extra toppings or sides.',
      fields: getAddonsFields({ errors }),
    },
  ];
};

export const getRightSectionMenuItemFields = ({
  errors,
  selects,
}: TMenuItemField): TMenuItemFieldGroup[] => {
  return [
    {
      title: 'Primary Image & Gallery',
      fields: getPrimaryImageGalleryFields({ errors, selects }),
    },
  ];
};

export const menuItemsTags = [
  'Snacks',
  'African',
  'Breakfast',
  'Meat',
  'Lunch',
  'Fries',
  'Vegetables',
];

export const menuAllergens = [
  'Gluten',
  'Peanuts',
  'Shellfish',
  'Dairy',
  'Soy',
  'Eggs',
  'Tree Nuts',
  'Fish',
];
