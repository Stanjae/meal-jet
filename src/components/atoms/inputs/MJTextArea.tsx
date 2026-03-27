import { Textarea, type TextareaProps } from '@mantine/core';

type Props = TextareaProps;
const MJTextArea = (props: Props) => {
  return <Textarea {...props} />;
};

export default MJTextArea;
