import { IconArrowNarrowRightDashed } from '@tabler/icons-react';
import { Switch } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import MJSelect from '@/components/atoms/inputs/MJSelect';
import MJTimePicker from '@/components/atoms/inputs/MJTimePicker';
import { DAYS } from '@/lib/constants';
import { capitalizeFirstLetter, optimizeText } from '@/lib/utils/helpers/helpers';

type Props<
  TFormValues extends object,
  TField extends { isClosed: boolean; openTime?: string; closeTime?: string },
> = {
  fields: TField[];
  form: UseFormReturnType<TFormValues>;
  name: string;
};

function MJFormArrayField<
  TFormValues extends object,
  TField extends { isClosed: boolean; openTime?: string; closeTime?: string },
>({ fields, form, name }: Props<TFormValues, TField>) {
  return (
    <section>
      {fields.map((field, index) => (
        <div key={index} className="mb-1 p-4 pb-1 rounded flex items-center gap-4">
          <MJSelect
            placeholder={'Day of the week'}
            data={DAYS}
            key={form.key(`${name}.${index}.day`)}
            {...form.getInputProps(`${name}.${index}.day`)}
          />
          <IconArrowNarrowRightDashed size={20} />
          <Switch
            label="Closed"
            key={form.key(`${name}.${index}.isClosed`)}
            {...form.getInputProps(`${name}.${index}.isClosed`, { type: 'checkbox' })}
          />
          <div className="flex items-center gap-3 flex-1">
            <MJTimePicker
              label={capitalizeFirstLetter(optimizeText('openTime'))}
              className="flex-1"
              disabled={field.isClosed}
              withDropdown
              key={form.key(`${name}.${index}.openTime`)}
              {...form.getInputProps(`${name}.${index}.openTime`)}
            />
            :
            <MJTimePicker
              label={capitalizeFirstLetter(optimizeText('closeTime'))}
              className="flex-1"
              disabled={field.isClosed}
              withDropdown
              key={form.key(`${name}.${index}.closeTime`)}
              {...form.getInputProps(`${name}.${index}.closeTime`)}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default MJFormArrayField;
