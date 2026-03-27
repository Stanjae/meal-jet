import { IconPlus, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Divider, Group, Switch } from '@mantine/core';
import type { FormArrayElement, FormErrors, LooseKeys, UseFormReturnType } from '@mantine/form';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJNumberInput from '@/components/atoms/inputs/MJNumberInput';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { initialMenuItemValues } from '@/lib/constants';
import { getCurrencySymbol } from '@/lib/utils/helpers/helpers';
import type { TAddonSchema } from '@/lib/utils/schema';

type TAddonListFormProps<TFormValues extends Record<string, unknown>> = {
  data: TAddonSchema[];
  insertListItem?: UseFormReturnType<TFormValues>['insertListItem'];
  removeListItem?: UseFormReturnType<TFormValues>['removeListItem'];
  formKey: UseFormReturnType<TFormValues>['key'];
  getInputProps: UseFormReturnType<TFormValues>['getInputProps'];
  name: Parameters<UseFormReturnType<TFormValues>['getInputProps']>[0];
  error: FormErrors;
};
const MJAddonListForm = <TFormValues extends Record<string, unknown>>({
  data,
  insertListItem,
  removeListItem,
  formKey,
  getInputProps,
  name,
  error,
}: TAddonListFormProps<TFormValues>) => {
  const insertEmptyData = initialMenuItemValues.addons[0];
  return (
    <div className="w-full space-y-3">
      {data?.map((item, index) => {
        return (
          <section className="bg-gray-100 rounded-md p-2 space-y-2" key={item.key}>
            <MJTextinput
              placeholder="Addon group name (E.g Size, Toppings)"
              {...getInputProps(`${name}.${index}.name`)}
              key={formKey(`${name}.${index}.name`)}
            />
            <Divider my="xs" />
            <div className="space-y-2">
              {item.options.map((_, indexo) => (
                <Group key={indexo} align="center">
                  <MJTextinput
                    placeholder="Option label (Eg. Large)"
                    className="flex-1"
                    key={`${name}.${index}.options.${indexo}.label`}
                    {...getInputProps(`${name}.${index}.options.${indexo}.label`)}
                  />
                  <MJNumberInput
                    placeholder="Extra Price (in Naira)"
                    leftSection={getCurrencySymbol('NGN')}
                    key={`${name}.${index}.options.${indexo}.extraPrice`}
                    {...getInputProps(`${name}.${index}.options.${indexo}.extraPrice`)}
                  />
                  <Switch
                    color="m-green"
                    label="Available"
                    key={`${name}.${index}.options.${indexo}.isAvailable`}
                    {...getInputProps(`${name}.${index}.options.${indexo}.isAvailable`, {
                      type: 'checkbox',
                    })}
                  />
                  <ActionIcon
                    size={'sm'}
                    color="red.5"
                    variant="light"
                    onClick={() => removeListItem?.(`${name}.${index}.options`, indexo)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              ))}
              <MJButton
                fullWidth
                color="m-green"
                radius={20}
                size="sm"
                onClick={() =>
                  insertListItem?.(`${name}.${index}.options`, {
                    ...insertEmptyData.options[0],
                  } as FormArrayElement<TFormValues, LooseKeys<TFormValues>>)
                }
                leftSection={<IconPlus />}
                variant="light"
              >
                Add Option
              </MJButton>
            </div>
            <Group justify="space-between">
              <div className="gap-3 flex items-center">
                <MJNumberInput
                  {...getInputProps(`${name}.${index}.minSelect`)}
                  label={'Min Select'}
                  key={formKey(`${name}.${index}.minSelect`)}
                />
                <MJNumberInput
                  {...getInputProps(`${name}.${index}.maxSelect`)}
                  label={'Max Select'}
                  key={formKey(`${name}.${index}.maxSelect`)}
                />
              </div>
              <Switch
                color="m-green"
                {...getInputProps(`${name}.${index}.required`, { type: 'checkbox' })}
                label={'Required'}
                key={formKey(`${name}.${index}.required`)}
              />
            </Group>
            <Group justify="end">
              <ActionIcon
                color="red.5"
                variant="subtle"
                onClick={() => removeListItem?.(name, index)}
              >
                <IconTrash />
              </ActionIcon>
            </Group>
          </section>
        );
      })}
      <p>{error?.[name]}</p>
      <MJButton
        radius={20}
        fullWidth
        onClick={() =>
          insertListItem?.(name, { ...insertEmptyData } as FormArrayElement<
            TFormValues,
            LooseKeys<TFormValues>
          >)
        }
      >
        Add Addon Group
      </MJButton>
    </div>
  );
};

export default MJAddonListForm;
