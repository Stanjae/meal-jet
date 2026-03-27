import { Modal, type MantineTransition, type ModalProps } from '@mantine/core';

type MJModalProps = ModalProps & {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  transition?: MantineTransition;
  hasOverlay?: boolean;
};
export default function MJModal({
  opened,
  onClose,
  title,
  children,
  transition,
  hasOverlay = true,
  ...props
}: MJModalProps) {
  return (
    <Modal.Root opened={opened} {...props} onClose={onClose} transitionProps={{ transition }}>
      {hasOverlay !== false && <Modal.Overlay />}
      <Modal.Content>
        <Modal.Header>
          {title && (
            <Modal.Title className="font-semibold text-lg text-gray-800">{title}</Modal.Title>
          )}
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
