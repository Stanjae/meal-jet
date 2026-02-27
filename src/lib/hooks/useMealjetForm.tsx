import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod/v4';
import { useForm, type UseFormInput } from '@mantine/form';

type MealjetFormProps<T extends Record<string, unknown>> = {
  schema: z.ZodType<T>;
  defaultValues?: UseFormInput<T>['initialValues'];
};

const useMealjetForm = <T extends Record<string, unknown>>({
  schema,
  defaultValues,
}: MealjetFormProps<T>) => {
  return useForm<T>({
    mode: 'uncontrolled',
    initialValues: defaultValues,
    validate: zod4Resolver(schema),
  });
};

export default useMealjetForm;
