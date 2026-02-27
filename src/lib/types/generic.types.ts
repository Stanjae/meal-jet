import type { IconProps } from '@tabler/icons-react';

export type MJDropdownOption = {
  label: string;
  value?: string;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  color?: string;
  disabled?: boolean;
  action?: () => void;
  type: 'button' | 'label' | 'divider';
};

export type MJDashboardNavOption = {
  label: string;
  path: string;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
};

export type MJCarouselDataItem = {
  id: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  status?: 'discount' | 'exclusive';
  statusText?: string;
  price?: number;
  distance?: string;
  duration?: string;
  quantity?: number;
  totalQuantity?: number;
};
