import { Drawer, type DrawerProps } from '@mantine/core';

type Props = DrawerProps & {
  children: React.ReactNode;
  title?: string | React.ReactNode;
};
const MJDrawer = ({ children, title, ...props }: Props) => {
  return (
    <Drawer.Root {...props}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title className="text-2xl font-semibold">{title}</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body className="bg-gray-100 py-3">{children}</Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default MJDrawer;
