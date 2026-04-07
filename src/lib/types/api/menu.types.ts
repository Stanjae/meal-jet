import type { TGetApiResponseWithPagination } from './auth.types';

export type TCreateMeuCategoryPayload = {
  name?: string;
  vendorId: string;
  id?: string;
  isVisible?: boolean;
};

export type IMenuCategory = {
  id: string;
  vendorId: string;
  name: string;
  isVisible: boolean;
  logo: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TGetMenuCategoriesResponse = TGetApiResponseWithPagination<IMenuCategory[]>;

export type TGetMenuCategoriesParams = {
  vendorId: string;
  page?: number;
  search?: string;
};

export type IAddonOption = {
  label: string;
  extraPrice: number;
  isAvailable: boolean;
  quantity?: number;
};

export type IAddon = {
  name: string;
  options: IAddonOption[];
  required: boolean;
  maxSelect: number;
  minSelect: number;
};

export type IMenuItem = {
  id: string;
  vendor: string;
  category: { _id: string; name: string };
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  isAvailable: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  prepTime: number;
  calories?: number;
  allergens: string[];
  addons: IAddon[];
  tags: string[];
  orderCount: number;
  rating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TGetMenuItemsResponse = TGetApiResponseWithPagination<IMenuItem[]>;

export type TGetMenuItemsParams = {
  vendorId: string;
  page?: number;
  search?: string;
  categoryId?: string;
  stockStatus?: string;
};

export type TGetMenuItemResponse = TGetApiResponseWithPagination<IMenuItem>;

export type TGetMenuItemParams = {
  vendorId: string;
  itemId?: string;
};

export type TUpdateMenuItemStockStatusPayload = {
  id: string;
  isAvailable: boolean;
};
