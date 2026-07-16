import NoDataImage from '@/assets/no-data.svg';
import VendorImage from '@/assets/undraw_empty-cart_574u (1).svg';

export const emptyStateConfig = {
  vendor: {
    title: 'No vendors found',
    description: 'Try adjusting your search or filter criteria',
    imageUrl: VendorImage,
    btnText: 'See Open Vendors',
    path: '/store',
  },
  menuItem: {
    title: 'No menu items found',
    description: 'Try adjusting your search or filter criteria',
    imageUrl: VendorImage,
    btnText: 'See Open Vendors',
    path: '/store',
  },
  vendorClosed: {
    title: 'Vendor is currently closed',
    description: "You can't order from a closed vendor at the moment.",
    imageUrl: VendorImage,
    btnText: 'See Open Vendors',
    path: '/dashboard/$userId/store',
  },
  orderHistory: [
    {
      title: 'No order history',
      description: 'You have not placed any orders yet.',
      imageUrl: VendorImage,
    },
    {
      title: 'No orders found',
      description: 'Try adjusting your search or filter criteria',
      imageUrl: NoDataImage,
    },
  ],
};
