import z from 'zod';
import { menuAllergens, menuItemsTags } from '@/lib/constants';
import {
  ACCEPTED_IMAGE_TYPES,
  booleanSchema,
  createFileOrStringSchema,
  //createFileSchema,
  enumSchema,
  numberSchema,
  stringSchema,
} from './zod';

export const addonsSchema = z.object({
  name: stringSchema().min(2, 'Addon name is required').trim(),
  options: z
    .array(
      z.object({
        label: stringSchema().nonempty({ error: 'Option label is required' }),
        extraPrice: numberSchema('Option extra price is required').nonnegative({
          error: 'Price must be a positive number',
        }),
        isAvailable: booleanSchema().default(true),
      })
    )
    .refine((options) => options.length > 0, { message: 'At least one option is required' }),
  required: booleanSchema().default(false),
  maxSelect: numberSchema().nonnegative(),
  minSelect: numberSchema().min(0),
  key: stringSchema().optional(),
});

export const fullMenuItemsSchema = z.object({
  vendor: stringSchema().optional(),
  name: stringSchema().nonempty({ error: 'Item name is required' }).trim(),
  category: stringSchema().nonempty({ error: 'Item category is required' }).trim(),
  description: stringSchema().nonempty({ error: 'Item description is required' }).trim(),
  price: numberSchema('Item price is required').nonnegative({
    error: 'Price must be a positive number',
  }),
  discountPrice: numberSchema().default(0),
  prepTime: numberSchema('Prep time is required')
    .nonnegative()
    .min(5, 'Preparation time must be at least 5 minutes'),
  isAvailable: booleanSchema().default(true),
  isPopular: booleanSchema().default(false),
  isFeatured: booleanSchema().default(false),
  calories: numberSchema().default(0),
  allergens: z.array(enumSchema(menuAllergens)),
  tags: z
    .array(enumSchema(menuItemsTags))
    .refine((tags) => tags.length > 0, { message: 'Select at least one tag' })
    .refine((tags) => tags.length <= 3, { message: 'You can select up to 3 tags' }),
  addons: z
    .array(addonsSchema)
    .refine(
      (addons) => {
        const hasDuplicateNames = addons.some((addon, index) => {
          return addons.findIndex((a) => a.name === addon.name) !== index;
        });
        return !hasDuplicateNames;
      },
      { message: 'Addon group names must be unique' }
    )
    .refine((addons) => addons.length > 0, { message: 'At least one addon group is required' }),
  image: createFileOrStringSchema({
    maxSizeMB: 5,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
    required: true,
  }),
  images: z
    .array(createFileOrStringSchema({ maxSizeMB: 5, acceptedTypes: ACCEPTED_IMAGE_TYPES }))
    .refine((files) => files.length > 0, { message: 'At least one image is required' }),
});

export const editFullMenuItemsSchema = z.object({
  ...fullMenuItemsSchema.shape,
  image: createFileOrStringSchema({
    maxSizeMB: 5,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
    required: true,
  }),
  images: z
    .array(createFileOrStringSchema({ maxSizeMB: 5, acceptedTypes: ACCEPTED_IMAGE_TYPES }))
    .refine((files) => files.length > 0, { message: 'At least one image is required' }),
});

export type TFullMenuItemSchema = z.infer<typeof fullMenuItemsSchema>;
export type TAddonSchema = z.infer<typeof addonsSchema>;
