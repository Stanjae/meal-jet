import { TimePicker, type TimePickerProps } from '@mantine/dates';

import '@mantine/dates/styles.css';

type Props = TimePickerProps;

export default function MJTimePicker(props: Props) {
  return <TimePicker {...props} />;
}
