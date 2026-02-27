import { Button, type ButtonProps } from '@mantine/core';

type MJButtonImgProps = ButtonProps & {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  imgSrc?: string;
};

const MJButtonImg = ({ children, imgSrc, ...buttonProps }: MJButtonImgProps) => {
  return (
    <Button {...buttonProps}>
      {imgSrc && <img src={imgSrc} alt="Button icon" className="mr-2 inline-block w-4 h-4" />}
      {children}
    </Button>
  );
};

export default MJButtonImg;
