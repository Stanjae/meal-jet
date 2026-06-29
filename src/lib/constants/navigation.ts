import {
  IconBurger,
  IconDashboard,
  IconListCheck,
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import type { MJDashboardNavOption, MJDropdownOption } from '../types';

export const multiRoleRoutes: { [key: string]: MJDashboardNavOption[] } = {
  customer: [
    { label: 'Overview', path: '/dashboard/$userId', icon: IconDashboard },
    { label: 'Explore', path: '/dashboard/$userId/explore', icon: IconBurger },
    { label: 'My Orders', path: '/dashboard/$userId/my-orders', icon: IconListCheck },
  ],
  vendor: [
    { label: 'Overview', path: '/dashboard/$userId', icon: IconDashboard },
    { label: 'Orders', path: '/dashboard/$userId/orders', icon: IconListCheck },
    {
      label: 'Menu Management',
      path: '/dashboard/$userId/menu-management',
      children: [
        { label: 'Menu Item/Dishes', path: 'index' },
        { label: 'Categories', path: '/dashboard/$userId/menu-management/categories' },
      ],
    },
  ],
  rider: [
    { label: 'Overview', path: '/dashboard/$userId', icon: IconDashboard },
    {
      label: 'Delivery Schedule',
      path: '/dashboard/$userId/delivery-schedule',
      icon: IconListCheck,
    },
    { label: 'Delivery History', path: '/dashboard/$userId/delivery-history', icon: IconListCheck },
  ],
};

//export custumer dropdown options
export const dasboardDropdownOptions: MJDropdownOption[] = [
  { label: 'Application Settings', type: 'label' },
  { label: 'Profile', value: 'profile', type: 'button', icon: IconUser },
  { label: 'Settings', value: 'settings', type: 'button', icon: IconSettings },
  { label: '', type: 'divider' },
  {
    label: 'Logout',
    value: 'logout',
    type: 'button',
    color: 'red',
    icon: IconLogout,
  },
];

export const HOMEPAGE_NAV_LINKS = [
  { label: 'About us', to: '/about' },
  { label: 'Become a vendor', to: '/become-a-vendor' },
  { label: 'Become a rider', to: '/become-a-rider' },
];

export const FOOTER_LINKS = [
  { title: 'Company', links: ['About us', 'Careers', 'Press', 'Blog'] },
  { title: 'Support', links: ['Help centre', 'Contact us', 'Privacy policy', 'Terms'] },
  {
    title: 'Partners',
    links: ['Become a restaurant', 'Become a rider', 'Advertise', 'Affiliate'],
  },
];
