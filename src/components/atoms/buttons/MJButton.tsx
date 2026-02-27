import { Button, type ButtonProps } from '@mantine/core';

type MJButtonProps = ButtonProps & {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const MJButton = ({ children, ...buttonProps }: MJButtonProps) => {
  return <Button {...buttonProps}>{children}</Button>;
};

export default MJButton;
