import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

type Props = {
  value: number;
  increment: () => void;
  decrement: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
};

export default function MJActionGroupButton({
  value,
  increment,
  decrement,
  size = 'md',
  disabled,
}: Props) {
  return (
    <ActionIcon.Group>
      <ActionIcon disabled={disabled} variant="default" size={size} radius="md" onClick={decrement}>
        <IconChevronDown color="var(--mantine-color-red-text)" />
      </ActionIcon>
      <ActionIcon.GroupSection
        variant="default"
        size={size}
        bg="var(--mantine-color-body)"
        miw={60}
      >
        {value}
      </ActionIcon.GroupSection>
      <ActionIcon disabled={disabled} variant="default" size={size} radius="md" onClick={increment}>
        <IconChevronUp color="var(--mantine-color-teal-text)" />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
