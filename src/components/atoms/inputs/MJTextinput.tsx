import { TextInput, type TextInputProps } from '@mantine/core';

type MJTextinputProps = TextInputProps;

const MJTextinput = (props: MJTextinputProps) => {
  return <TextInput {...props} />;
};

export default MJTextinput;
