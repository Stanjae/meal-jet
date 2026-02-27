import {
  IconDashboard,
  IconListCheck,
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import type { MJDashboardNavOption, MJDropdownOption } from '../types';

export const multiRoleRoutes: { [key: string]: MJDashboardNavOption[] } = {
  customer: [
    { label: 'Explore', path: '/dashboard/$userId/explore', icon: IconDashboard },
    { label: 'My Orders', path: '/dashboard/$userId/my-orders', icon: IconListCheck },
  ],
  vendor: [
    { label: 'Orders', path: '/dashboard/$userId/orders' },
    { label: 'Menu Management', path: '/dashboard/$userId/menu-management' },
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
