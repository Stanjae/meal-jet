/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement } from 'react';
import { IconAt } from '@tabler/icons-react';
import { Grid } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import MJDateInput from '@/components/atoms/inputs/MJDateInput';
import MJDocumentUpload from '@/components/atoms/inputs/MJDocumentUpload';
import MJImageUpload from '@/components/atoms/inputs/MJImageUpload';
import MJMultiSelect from '@/components/atoms/inputs/MJMultiSelect';
import MJNumberInput from '@/components/atoms/inputs/MJNumberInput';
import MJSelect from '@/components/atoms/inputs/MJSelect';
import MJTextArea from '@/components/atoms/inputs/MJTextArea';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { RIDER_IDENTIFICATION_TYPES, VEHICLES_TYPE } from '@/lib/constants';
import { ModifiedCuisineTypes, ModifiedRestaurantTags } from '@/lib/constants/vendor';
import type { MJTransformedFormField } from '@/lib/types';
import {
  capitalizeFirstLetter,
  getCurrencySymbol,
  optimizeText,
} from '@/lib/utils/helpers/helpers';
import MJAccountNumber from '../inputs/MJAccountNumber';
import MJBanksSelect from '../inputs/MJBanksSelect';
import MJSearchLocationField from '../inputs/MJSearchLocationField';

type Props<T extends object> = {
  fields: MJTransformedFormField[];
  form: UseFormReturnType<T>;
  disabledFields?: string[];
};

function MJFormFields<T extends object>({ fields, form, disabledFields }: Props<T>): ReactElement {
  const selectFields = {
    cuisineTypes: ModifiedCuisineTypes,
    tags: ModifiedRestaurantTags,
    vehicle_type: VEHICLES_TYPE,
    identification_type: RIDER_IDENTIFICATION_TYPES,
  };

  const disabledNewFields = new Set(disabledFields ?? []);
  return (
    <Grid>
      {fields.map((field) => {
        if (field.type === 'text') {
          return (
            <Grid.Col span={6} key={field.name}>
              <MJTextinput
                key={field.name}
                {...form.getInputProps(field.name)}
                label={field.title}
                disabled={disabledNewFields.has(field.name)}
              />
            </Grid.Col>
          );
        }
        if (field.type === 'email') {
          return (
            <Grid.Col span={6} key={field.name}>
              <MJTextinput
                key={field.name}
                leftSectionPointerEvents="none"
                {...form.getInputProps(field.name)}
                label={field.title}
                type={field.type}
                leftSection={<IconAt size={16} />}
                disabled={disabledNewFields.has(field.name)}
              />
            </Grid.Col>
          );
        }
        if (field.type === 'phone') {
          return (
            <Grid.Col span={6} key={field.name}>
              <MJTextinput
                key={field.name}
                {...form.getInputProps(field.name)}
                label={field.title}
                disabled={disabledNewFields.has(field.name)}
              />
            </Grid.Col>
          );
        }
        if (field.type === 'textarea') {
          return (
            <Grid.Col span={12} key={field.name}>
              <MJTextArea
                key={field.name}
                {...form.getInputProps(field.name)}
                label={field.title}
                disabled={disabledNewFields.has(field.name)}
              />
            </Grid.Col>
          );
        }
        if (field.type === 'multiselect') {
          return (
            <Grid.Col span={6} key={field.name}>
              <MJMultiSelect
                key={field.name}
                {...form.getInputProps(field.name)}
                label={field.title}
                data={selectFields[field.name as keyof typeof selectFields]}
                clearable
              />
            </Grid.Col>
          );
        }

        if (field.type === 'select') {
          return (
            <Grid.Col span={6} key={field.name}>
              <MJSelect
                key={field.name}
                {...form.getInputProps(field.name)}
                label={field.title}
                data={selectFields[field.name as keyof typeof selectFields]}
              />
            </Grid.Col>
          );
        }

        if (field.type === 'addressSearch') {
          const values = form.getValues() as Record<string, unknown>;
          const address = values?.address as { street?: string; city?: string } | undefined;
          const error = form.errors['address.street'] as string;

          return (
            <Grid.Col span={12} key={field.name}>
              <MJSearchLocationField
                label={field.title}
                name={field.name}
                setValues={form.setValues}
                defaultValue={`${address?.street ?? ''} ${address?.city ?? ''}`.trim()}
                error={error}
              />
            </Grid.Col>
          );
        }

        if (field.type === 'file') {
          const values = form.getValues() as Record<string, unknown>;
          const file = values[field.name] as any;
          return (
            <Grid.Col span={12} key={field.name}>
              <MJDocumentUpload
                className=" border border-dashed w-full h-40 flex items-center justify-center rounded-sm"
                name={field.name}
                label={capitalizeFirstLetter(optimizeText(field.title, 'reversed'))}
                defaultValue={file}
                setValues={form.setValues}
                error={form.errors[field.name] as unknown as string}
              />
            </Grid.Col>
          );
        }

        if (field.type === 'date') {
          return (
            <Grid.Col span={12} key={field.name}>
              <MJDateInput
                key={field.name}
                {...form.getInputProps(field.name)}
                label={field.title}
                valueFormat={'YYYY-MM-DD'}
                disabled={disabledNewFields.has(field.name)}
              />
            </Grid.Col>
          );
        }

        if (field.type === 'image') {
          const values = form.getValues() as Record<string, unknown>;
          const file = values[field.name] as File | null;
          return (
            <Grid.Col span={6} key={field.name}>
              <MJImageUpload
                setValues={form.setValues}
                name={field.name}
                error={form.errors[field.name] as unknown as string}
                defaultValue={file}
              />
            </Grid.Col>
          );
        }

        if (field.type === 'number') {
          const newlabel = field.name.toLowerCase().includes('time')
            ? field.title + ' (in Minutes)'
            : field.title;

          const newSuffux = field.name.toLowerCase().includes('rate')
            ? '%'
            : field.name.toLowerCase().includes('time')
              ? ' mins'
              : undefined;

          const readonly = field.name === 'commissionRate';
          return (
            <Grid.Col span={6} key={field.name}>
              <MJNumberInput
                label={capitalizeFirstLetter(optimizeText(newlabel))}
                key={field.name}
                {...form.getInputProps(field.name)}
                clampBehavior="strict"
                allowNegative={false}
                readOnly={readonly}
                suffix={newSuffux}
              />
            </Grid.Col>
          );
        }
        if (field.type === 'currency') {
          return (
            <Grid.Col span={6} key={field.name}>
              <MJNumberInput
                label={capitalizeFirstLetter(optimizeText(field.title))}
                key={field.name}
                {...form.getInputProps(field.name)}
                clampBehavior="strict"
                allowNegative={false}
                prefix={getCurrencySymbol()}
              />
            </Grid.Col>
          );
        }

        if (field.type === 'group' && field.children) {
          if (field.name.includes('bank')) {
            return Object.keys(field.children).map((child) => {
              if (child === 'bankName') {
                const values = form.getValues() as Record<string, unknown>;
                const bank = values[field.name] as Record<string, unknown>;
                return (
                  <Grid.Col span={6} key={child}>
                    <MJBanksSelect
                      setValues={form.setValues}
                      defaultValue={bank[child] as string}
                      error={form.errors[field.name] as string}
                      name={field.name}
                      label={capitalizeFirstLetter(optimizeText(child))}
                    />
                  </Grid.Col>
                );
              }
              if (child === 'accountName') {
                return (
                  <Grid.Col span={6} key={child}>
                    <MJTextinput
                      label={capitalizeFirstLetter(optimizeText(child))}
                      key={`${field.name}.${child}`}
                      {...form.getInputProps(`${field.name}.${child}`)}
                      readOnly
                    />
                  </Grid.Col>
                );
              } else {
                return (
                  <Grid.Col span={6} key={child}>
                    <MJAccountNumber
                      values={
                        form.getValues()[field.name as keyof typeof form.values] as Record<
                          string,
                          unknown
                        >
                      }
                      setValues={form.setValues}
                      error={form.errors[field.name] as string}
                      name={field.name}
                      label={capitalizeFirstLetter(optimizeText(child))}
                    />
                  </Grid.Col>
                );
              }
            });
          }
        }
        return (
          <Grid.Col span={6} key={field.name}>
            <div>
              {field.title} - {field.type}
            </div>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}

export default MJFormFields as <T extends object>(props: Props<T>) => ReactElement;
