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
  getOrderDetails: '/orders/get-order-details',
  getOrderDetailsById: '/orders/get-order-details-by-id',
  getVendorOrders: '/orders/get-vendor-orders',
  updateOrderStatus: '/orders/update-order-status',
  vendorRetryDispatch: '/orders/vendor/retry-dispatch',
  riderAcceptDispatch: '/orders/rider/accept-dispatch',
  riderUpdateDeliveryStatus: '/orders/rider/update-delivery-status',
  getCustomerOrders: '/orders/get-customer-orders',
  getCustomerOrdersSummary: '/orders/get-customer-orders-summary',
  revalidateCheckoutSession: '/orders/revalidate-checkout-session',

  //payments
  initializePayment: '/payments/initialize',

  //rider
  createRider: '/rider/create-rider',
  checkRiderApprovalStatus: '/rider/is-rider-approved',

  //wallet
  createWallet: '/wallet/create-wallet',
};
