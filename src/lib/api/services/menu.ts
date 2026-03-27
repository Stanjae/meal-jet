import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import type {
  TGetMenuCategoriesParams,
  TGetMenuCategoriesResponse,
  TGetMenuItemParams,
  TGetMenuItemResponse,
  TGetMenuItemsParams,
  TGetMenuItemsResponse,
} from '@/lib/types';
import { ENDPOINTS, menuClient } from '../clients';

export const useCreateMenuCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: menuClient.createMenuCategory,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuCategories] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });
};

export const useUpdateMenuCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: menuClient.updateMenuCategory,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuCategories] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });
};

export const useDeleteMenuCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: menuClient.deleteMenuCategory,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuCategories] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });
};

export const useDeleteMultipleMenuCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: menuClient.deleteMenuCategories,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuCategories] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });
};

export const useGetMenuCategories = <TSelectedData = TGetMenuCategoriesResponse>(
  params: TGetMenuCategoriesParams,
  select?: (data: TGetMenuCategoriesResponse) => TSelectedData
) => {
  return useQuery({
    queryKey: [ENDPOINTS.getMenuCategories, params],
    queryFn: () => menuClient.getMenuCategories(params),
    select,
  });
};

export const useHandleMenuItem = () => {
  const queryClient = useQueryClient();

  const createMenuItem = useMutation({
    mutationFn: menuClient.createMenuItem,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuItems] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });

  const updateMenuItem = useMutation({
    mutationFn: menuClient.updateMenuItem,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuItems] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });

  const deleteMenuItem = useMutation({
    mutationFn: menuClient.deleteMenuItem,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuItems] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });

  const deleteMultipleMenuItems = useMutation({
    mutationFn: menuClient.deleteMenuItems,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuItems] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });

  const updateMenuItemStockStatus = useMutation({
    mutationFn: menuClient.updateMenuItemStockStatus,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getMenuItems] });
    },
    onError: (error: Error) => {
      notifications.show({
        message: error.message,
        color: 'red',
        title: 'Error',
      });
    },
  });

  return {
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    deleteMultipleMenuItems,
    updateMenuItemStockStatus,
  };
};

export const useGetMenuItems = <TSelectedData = TGetMenuItemsResponse>(
  params: TGetMenuItemsParams,
  select?: (data: TGetMenuItemsResponse) => TSelectedData
) => {
  return useQuery({
    queryKey: [ENDPOINTS.getMenuItems, params],
    queryFn: () => menuClient.getMenuItems(params),
    select,
  });
};

export const useGetMenuItem = <TSelectedData = TGetMenuItemResponse>(
  params: TGetMenuItemParams,
  select?: (data: TGetMenuItemResponse) => TSelectedData
) => {
  return useQuery({
    queryKey: [ENDPOINTS.getMenuItem, params],
    queryFn: () => menuClient.getMenuItem(params),
    select,
    enabled: !!params.vendorId && !!params.itemId, // Only run the query if vendorId and itemId are provided
  });
};
