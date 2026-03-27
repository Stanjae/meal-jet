import { Group, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import type { TPostApiResponse } from '@/lib/types';
import { ConfirmationModal } from '../modals/ConfirmationModal';

type MultiSelectCheckboxWidgetProps = {
  opened: boolean;
  onClose: () => void;
  text: string;
  onConfirm: () => Promise<TPostApiResponse<{ message: string }> | undefined>;
  loading?: boolean;
};

const MultiSelectCheckboxWidget = ({
  opened,
  onClose,
  text,
  onConfirm,
  loading,
}: MultiSelectCheckboxWidgetProps) => {
  const [confirmationOpened, { open: openConfirmation, close: closeConfirmation }] =
    useDisclosure(false);
  const handleConfirm = async () => {
    try {
      await onConfirm();
      closeConfirmation();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Transition mounted={opened} transition="slide-up" enterDelay={500} exitDelay={300}>
        {(transitionStyle) => (
          <Paper
            shadow="md"
            p="md"
            withBorder
            className=" absolute left-1/2 bottom-[5%] -translate-x-1/2 max-w-lg w-full"
            style={{ ...transitionStyle, zIndex: 1 }}
          >
            <Group justify="space-between">
              <p>{text}</p>
              <div className="flex gap-3 items-center">
                <MJButton color={'gray.6'} radius={35} onClick={onClose}>
                  Cancel
                </MJButton>
                <MJButton loading={loading} onClick={openConfirmation} radius={35}>
                  Confirm
                </MJButton>
              </div>
            </Group>
          </Paper>
        )}
      </Transition>
      <ConfirmationModal
        opened={confirmationOpened}
        loading={loading}
        onClose={closeConfirmation}
        title="Delete Items"
        message={`Are you sure you want to delete the selected item(s)? This action cannot be undone.`}
        onConfirm={handleConfirm}
        type="critical"
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </>
  );
};

export default MultiSelectCheckboxWidget;
