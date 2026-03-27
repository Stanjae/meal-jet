import { Loader } from '@mantine/core';

type MRingJLoaderProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
};

const MRingJLoader = ({ size, color }: MRingJLoaderProps) => {
  return <Loader size={size} color={color} />;
};

export default MRingJLoader;
