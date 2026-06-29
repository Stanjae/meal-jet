import { DateInput, type DateInputProps } from '@mantine/dates';

type MJDateInputProps = DateInputProps;

const MJDateInput = (props: MJDateInputProps) => {
  return <DateInput {...props} />;
};

export default MJDateInput;
