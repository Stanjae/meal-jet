import { Divider, Modal, type MantineTransition, type ModalProps } from '@mantine/core';

type MJModalProps = ModalProps & {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  transition?: MantineTransition;
  hasOverlay?: boolean;
};
export default function MJModal2({
  opened,
  onClose,
  children,
  transition,
  hasOverlay = true,
  ...props
}: MJModalProps) {
  return (
    <Modal.Root
      className="relative"
      p={0}
      opened={opened}
      {...props}
      onClose={onClose}
      transitionProps={{ transition }}
    >
      {hasOverlay !== false && <Modal.Overlay />}
      <Modal.Content>
        <Modal.Header className="absolute bg-transparent right-20 sm:right-1/5  md:right-1/4 lg:right-1/3">
          <Modal.CloseButton className="size-10 p-2 border bg-white shadow rounded-full" />
        </Modal.Header>
        <Modal.Body p={0}>
          {props.title && (
            <>
              <h1 className="text-2xl mt-3 ml-3 font-semibold">{props.title}</h1>
              <Divider my="sm" />
            </>
          )}

          {children}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
