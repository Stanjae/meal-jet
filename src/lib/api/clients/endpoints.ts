export const ENDPOINTS = {
  //auth
  customerSignUp: '/auth/register',
  verifyEmail: '/auth/verify-email',
  login: '/auth/login',
  logout: '/auth/logout',
  verifyNow: '/auth/verify-now',
  isAuthenticated: '/auth/is-authenticated',
  updateUserProfile: '/auth/update-user-profile',
  deleteUserAddress: '/auth/delete-user-address',
  updateUserCurrentAddress: '/auth/update-user-current-address',

  //vendor
  createVendor: '/vendor/create-vendor',
  vendorProfileCount: '/vendor/profile-count',
  getVendorProfiles: '/vendor/get-vendor-profiles',
  getAllVendors: '/vendor/get-all-vendors',
  getVendorProfile: '/vendor/get-vendor-profile',

  //menu-category
  createMenuCategory: '/menu-category/create',
  getMenuCategories: '/menu-category/get-categories',
  deleteMenuCategory: '/menu-category/delete',
  updateMenuCategory: '/menu-category/update',
  deleteMenuCategories: '/menu-category/delete-multiple-categories',

  //menu-item
  createMenuItem: '/menu/create-menu-item',
  getMenuItems: '/menu/get-menu-items',
  getMenuItem: '/menu/get-menu-item-details',
  deleteMenuItem: '/menu/delete-menu-item',
  updateMenuItem: '/menu/update-menu-item',
  deleteMenuItems: '/menu/delete-menu-items',
  updateMenuItemStockStatus: '/menu/update-stock-status',
  uploadBulkMenuItems: '/menu/upload-bulk-menu-items',

  //orders
  checkout: '/orders/check-out',

  //payments
  initializePayment: '/payments/initialize',
};
