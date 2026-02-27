import { Image } from '@mantine/core';

type Props = {
  width?: number;
  height?: number;
  src?: string;
  className?: string;
};

const MJLogo = ({ width, height, src, className }: Props) => {
  const hamburgerImg = src || '/logo.png';
  return (
    <Image
      src={hamburgerImg}
      className={className || 'rounded-lg'}
      fit="cover"
      h={height || 45}
      w={width || 200}
      alt="MJ Logo"
    />
  );
};

export default MJLogo;
