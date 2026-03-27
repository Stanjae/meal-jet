import { Divider, Group } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJModal from '@/components/atoms/modals/MJModal';

type ConfirmationModalProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  type: 'critical' | 'info';
  loading?: boolean;
};

export const ConfirmationModal = ({
  opened,
  onClose,
  title,
  message,
  onConfirm,
  confirmText,
  cancelText,
  type,
  loading,
}: ConfirmationModalProps) => {
  return (
    <MJModal
      centered
      size={'lg'}
      opened={opened}
      onClose={onClose}
      title={title}
      closeOnClickOutside={false}
    >
      <div>
        <p className="text-gray-700">{message}</p>
      </div>
      <Divider my={'md'} />
      <Group justify="end" mt="md" gap={4}>
        <MJButton color="gray.5" size="md" radius={35} onClick={onClose}>
          {cancelText}
        </MJButton>
        <MJButton
          color={type === 'critical' ? 'red.6' : 'blue'}
          onClick={onConfirm}
          loading={loading}
          size="md"
          radius={35}
        >
          {confirmText}
        </MJButton>
      </Group>
    </MJModal>
  );
};
