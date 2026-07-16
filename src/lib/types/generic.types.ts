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
  children?: MJDashboardNavOption[];
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

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'multiselect'
  | 'select'
  | 'phone'
  | 'file'
  | 'addressSearch'
  | 'group'
  | 'image'
  | 'number'
  | 'currency'
  | 'email'
  | 'date';

export type MJTransformedFormField = {
  title: string;
  name: string;
  type: FormFieldType;
  children?: Record<string, unknown>;
  preInputDirection?: 'prefix' | 'suffix';
  prefixIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  suffixIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
};

export type MJSelectOption = {
  label: string;
  value: string;
};

export type MJRecord = Record<
  string,
  string | number | boolean | Date | Record<string, unknown> | unknown[]
>;

export type MJTableColumn = {
  label: string;
  accessorKey: string;
  render?: (cellValue: MJRecord) => React.ReactNode;
  isImageAccessor?: boolean;
};

export type TMenuItemsFields = {
  name: string;
  label: string;
  description?: string;
  type: string;
  placeholder?: string;
  required: boolean;
  error?: string;
  data?: MJSelectOption[];
};

export type TMenuItemFieldGroup = {
  title: string;
  fields: TMenuItemsFields[];
  description?: string;
};

export type TSelectFilterData = {
  label: string;
  value: string;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  color?: string;
  disabled?: boolean;
  type: 'button' | 'label' | 'divider';
  secondaryLabel?: number;
};

export type TEmptyStateConfig = {
  title: string;
  description: string;
  imageUrl: string;
};
