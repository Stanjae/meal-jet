import { PasswordInput } from '@mantine/core';

type MJPasswordInputProps = React.ComponentProps<typeof PasswordInput>;

export default function MJPasswordInput(props: MJPasswordInputProps) {
  return <PasswordInput {...props} />;
}
