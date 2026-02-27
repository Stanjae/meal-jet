import { Alert, type AlertProps } from '@mantine/core';

type MJAlertProps = AlertProps & {
  title: string;
  message: string;
  className?: string;
  variant?: 'light' | 'outline' | 'filled';
  color?: string;
};
const MJAlert = ({
  title,
  message,
  className,
  color = 'm-orange',
  variant = 'light',
  ...props
}: MJAlertProps) => {
  return (
    <Alert title={title} className={className} variant={variant} color={color} {...props}>
      {message}
    </Alert>
  );
};

export default MJAlert;
