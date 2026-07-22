import { UnstyledButton, type UnstyledButtonProps } from '@mantine/core';

type MJButtonProps = UnstyledButtonProps & {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const MJUnstyledButton = ({ children, type = 'button', onClick, className }: MJButtonProps) => {
  return (
    <UnstyledButton type={type} onClick={onClick} className={className}>
      {children}
    </UnstyledButton>
  );
};

export default MJUnstyledButton;
