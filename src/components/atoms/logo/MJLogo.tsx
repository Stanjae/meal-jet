import { Link } from '@tanstack/react-router';
import { Image } from '@mantine/core';

type Props = {
  width?: number;
  height?: number;
  src?: string;
  className?: string;
  mode?: 'light' | 'dark';
};

const MJLogo = ({ width, height, src, className, mode = 'light' }: Props) => {
  const hamburgerImg = mode === 'dark' ? '/logo-dark.png' : src || '/logo.png';
  return (
    <Link to="/">
      <Image
        src={hamburgerImg}
        className={className || 'rounded-lg'}
        fit="cover"
        h={height || 45}
        w={width || 200}
        alt="MJ Logo"
      />
    </Link>
  );
};

export default MJLogo;
