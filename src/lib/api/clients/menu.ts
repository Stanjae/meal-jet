import {
  type TCreateMeuCategoryPayload,
  type TGetMenuCategoriesParams,
  type TGetMenuCategoriesResponse,
  type TGetMenuItemParams,
  type TGetMenuItemResponse,
  type TGetMenuItemsParams,
  type TGetMenuItemsResponse,
  type TPostApiResponse,
  type TUpdateMenuItemStockStatusPayload,
} from '@/lib/types';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

export const menuClient = {
  /**
   * Description - create menu category.
   * @param { TCreateMeuCategoryPayload} payload - The menu category payload.
   * @returns Data fetched from `/menu/create-menu-category`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */

  createMenuCategory: async (payload: TCreateMeuCategoryPayload) => {
    return await Client.post<TPostApiResponse<{ message: string }>>(
      ENDPOINTS.createMenuCategory,
      payload
    );
  },

  /**
   * Description - get menu categories.
   * @param { TGetMenuCategoriesParams} params - The menu category payload.
   * @returns Data fetched from `/menu/get-menu-categories`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */

  getMenuCategories: async ({ vendorId, ...params }: TGetMenuCategoriesParams) => {
    return await Client.get<TGetMenuCategoriesResponse>(
      `${ENDPOINTS.getMenuCategories}/${vendorId}`,
      { params }
    );
  },

  /**
   * Description - update menu category.
   * @param { TCreateMeuCategoryPayload} payload - The menu category payload.
   * @returns Data fetched from `/menu/update-menu-category`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */

  updateMenuCategory: async (payload: TCreateMeuCategoryPayload) => {
    return await Client.patch<TPostApiResponse<{ message: string }>>(
      ENDPOINTS.updateMenuCategory,
      payload
    );
  },

  /**
   * Description - delete menu category.
   * @param { string} categoryId - The menu category ID.
   * @returns Data fetched from `/menu/delete-menu-category`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */

  deleteMenuCategory: async (categoryId: string) => {
    return await Client.delete<TPostApiResponse<{ message: string }>>(
      `${ENDPOINTS.deleteMenuCategory}/${categoryId}`
    );
  },

  /**
   * Description - delete multiple menu categories.
   * @param { string[]} categoryIds - The menu category IDs.
   * @returns Data fetched from `/menu/delete-menu-categories`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  deleteMenuCategories: async (categoryIds: string[]) => {
    return await Client.delete<TPostApiResponse<{ message: string }>>(
      ENDPOINTS.deleteMenuCategories,
      { data: { categoryIds } }
    );
  },

  /**
   * Description - create menu item.
   * @param {FormData} payload - The menu category payload.
   * @returns Data created from `/menu/create-menu-item`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  createMenuItem: async (payload: FormData) => {
    return await Client.post<TPostApiResponse<{ message: string }>>(
      ENDPOINTS.createMenuItem,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  /**
   * Description - get menu items.
   * @param {TGetMenuItemsParams} params - The menu items params.
   * @returns Data created from `/menu/get-menu-item`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  getMenuItems: async ({ vendorId, ...params }: TGetMenuItemsParams) => {
    return await Client.get<TGetMenuItemsResponse>(`${ENDPOINTS.getMenuItems}/${vendorId}`, {
      params,
    });
  },

  /**
   * Description - get menu item detail.
   * @param {TGetMenuItemsParams} params - The menu items params.
   * @returns Data created from `/menu/get-menu-item`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  getMenuItem: async ({ vendorId, ...params }: TGetMenuItemParams) => {
    return await Client.get<TGetMenuItemResponse>(`${ENDPOINTS.getMenuItem}/${vendorId}`, {
      params,
    });
  },

  /**
   * Description - update menu item.
   * @param {FormData} payload - The menu category payload.
   * @returns Data created from `/menu/update-menu-item`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  updateMenuItem: async (payload: FormData) => {
    return await Client.patch<TPostApiResponse<{ message: string }>>(
      ENDPOINTS.updateMenuItem,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  /**
   * Description - delete menu item.
   * @param {string} menuItemId - The menu item ID.
   * @returns Data created from `/menu/delete-menu-item`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  deleteMenuItem: async (itemId: string) => {
    return await Client.delete<TPostApiResponse<{ message: string }>>(
      `${ENDPOINTS.deleteMenuItem}/${itemId}`
    );
  },

  /**
   * Description - delete multiple menu items.
   * @param { string[]} itemIds - The menu item IDs.
   * @returns Data fetched from `/menu/delete-menu-items`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  deleteMenuItems: async (itemIds: string[]) => {
    return await Client.delete<TPostApiResponse<{ message: string }>>(ENDPOINTS.deleteMenuItems, {
      data: { itemIds },
    });
  },

  /**
   * Description - update menu item stock status.
   * @param {TUpdateMenuItemStockStatusPayload} payload - The menu category payload.
   * @returns Data created from `/menu/update-menu-item`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  updateMenuItemStockStatus: async (payload: TUpdateMenuItemStockStatusPayload) => {
    return await Client.patch<TPostApiResponse<{ message: string }>>(
      ENDPOINTS.updateMenuItemStockStatus,
      payload
    );
  },
};
