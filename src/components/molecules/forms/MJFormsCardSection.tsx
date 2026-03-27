import { Divider, Grid, Group, Paper, Switch } from '@mantine/core';
import type { FormErrors, UseFormReturnType } from '@mantine/form';
import MJButton from '@/components/atoms/buttons/MJButton';
import { MJDropzone } from '@/components/atoms/inputs/MJDropzone';
import MJImageUpload from '@/components/atoms/inputs/MJImageUpload';
import MJMultiSelect from '@/components/atoms/inputs/MJMultiSelect';
import MJNumberInput from '@/components/atoms/inputs/MJNumberInput';
import MJSelect from '@/components/atoms/inputs/MJSelect';
import MJTextArea from '@/components/atoms/inputs/MJTextArea';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import type { TMenuItemFieldGroup, TMenuItemsFields } from '@/lib/types';
import { getCurrencySymbol } from '@/lib/utils/helpers/helpers';
import type { TAddonSchema } from '@/lib/utils/schema';
import MJAddonListForm from './MJAddonListForm';

type Props<TFormValues extends Record<string, unknown>> = {
  leftSectionFields: TMenuItemFieldGroup[];
  rightSectionFields?: TMenuItemFieldGroup[];
  formKey: UseFormReturnType<TFormValues>['key'];
  getInputProps: UseFormReturnType<TFormValues>['getInputProps'];
  getValues: () => TFormValues;
  insertListItem?: UseFormReturnType<TFormValues>['insertListItem'];
  removeListItem?: UseFormReturnType<TFormValues>['removeListItem'];
  setValues: UseFormReturnType<TFormValues>['setValues'];
  errors: FormErrors;
  handleSubmit?: () => void;
  loading?: boolean;
  isEdit?: boolean;
};
const MJFormsCardSection = <TFormValues extends Record<string, unknown>>({
  leftSectionFields,
  formKey,
  getInputProps,
  getValues,
  insertListItem,
  removeListItem,
  setValues,
  rightSectionFields,
  handleSubmit,
  errors,
  loading,
  isEdit,
}: Props<TFormValues>) => {
  const getFieldPath = (name: TMenuItemsFields['name']) =>
    name as Parameters<typeof getInputProps>[0];

  const returnFields = (field: TMenuItemsFields) => {
    const fieldPath = getFieldPath(field.name);

    if (field.type === 'text') {
      return (
        <div className="flex-1" key={field.name}>
          <MJTextinput
            {...getInputProps(fieldPath)}
            key={formKey(fieldPath)}
            withAsterisk={field.required}
            label={field.label}
            placeholder={field.placeholder}
            error={field.error}
          />
        </div>
      );
    } else if (field.type === 'select') {
      return (
        <div className="flex-1" key={field.name}>
          <MJSelect
            {...getInputProps(fieldPath)}
            key={formKey(fieldPath)}
            withAsterisk={field.required}
            label={field.label}
            placeholder={field.placeholder}
            error={field.error}
            data={field.data}
          />
        </div>
      );
    } else if (field.type === 'textarea') {
      return (
        <div className="w-full" key={field.name}>
          <MJTextArea
            {...getInputProps(fieldPath)}
            key={formKey(fieldPath)}
            withAsterisk={field.required}
            label={field.label}
            placeholder={field.placeholder}
            error={field.error}
          />
        </div>
      );
    } else if (field.type === 'currency' || field.type === 'number') {
      return (
        <div className="flex-1" key={field.name}>
          <MJNumberInput
            key={formKey(fieldPath)}
            {...getInputProps(fieldPath)}
            label={field.label}
            placeholder={field.placeholder}
            error={field.error}
            leftSection={field.type === 'currency' && getCurrencySymbol('NGN')}
          />
        </div>
      );
    } else if (field.type === 'switch') {
      return (
        <div className="flex justify-between w-full" key={field.name}>
          <div>
            <h2 className="font-medium">{field.label}</h2>
            <p className="text-sm text-gray-500">{field.description}</p>
          </div>
          <Switch {...getInputProps(fieldPath, { type: 'checkbox' })} key={formKey(fieldPath)} />
        </div>
      );
    } else if (field.type === 'multiselect') {
      return (
        <div className="w-full" key={field.name}>
          <MJMultiSelect
            {...getInputProps(fieldPath)}
            key={formKey(fieldPath)}
            withAsterisk={field.required}
            label={field.label}
            placeholder={field.placeholder}
            error={field.error}
            data={field.data}
            multiple
          />
        </div>
      );
    } else if (field.type === 'group') {
      return (
        <MJAddonListForm
          key={field.name}
          insertListItem={insertListItem}
          error={errors}
          removeListItem={removeListItem}
          formKey={formKey}
          name={fieldPath}
          getInputProps={getInputProps}
          data={getValues()[fieldPath] as TAddonSchema[]}
        />
      );
    } else if (field.type === 'file') {
      return (
        <div className="w-full" key={field.name}>
          <MJImageUpload
            defaultValue={getValues()[fieldPath] as string}
            name={fieldPath}
            setValues={setValues}
            error={field.error as string}
            className=" w-60 rounded-md flex items-center justify-center h-30 border border-dashed"
          />
        </div>
      );
    } else if (field.type === 'files') {
      return (
        <div className="w-full" key={field.name}>
          <MJDropzone
            defaultValue={getValues()[fieldPath] as string[]}
            label={field.label}
            multiple
            maxFiles={4}
            name={fieldPath}
            setvalues={setValues}
            error={field.error as string}
          />
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <Grid>
      <Grid.Col span={8} className="space-y-4">
        {leftSectionFields.map((field) => {
          return (
            <Paper key={field.title} radius={'lg'} p="md" withBorder>
              <h1>{field.title}</h1>
              {field.description && <p className="text-sm text-gray-500">{field.description}</p>}
              <Divider />
              <div className="flex gap-3 mt-3 flex-wrap">{field.fields.map(returnFields)}</div>
            </Paper>
          );
        })}
      </Grid.Col>
      <Grid.Col className=" space-y-4" span={4}>
        {rightSectionFields?.map((field) => {
          return (
            <Paper key={field.title} radius={'lg'} p="md" withBorder>
              <h1>{field.title}</h1>
              {field.description && <p className="text-sm text-gray-500">{field.description}</p>}
              <Divider />
              <div className="flex gap-3 mt-3 flex-wrap">{field.fields.map(returnFields)}</div>
            </Paper>
          );
        })}

        <Paper radius={'lg'} p="md" withBorder>
          <h1>Actions</h1>
          <Divider />
          <Group grow mt="md">
            <MJButton size="md" radius={25} color="gray.5">
              Cancel
            </MJButton>
            <MJButton
              loading={loading}
              onClick={handleSubmit}
              size="md"
              radius={25}
              color="m-green.9"
            >
              {isEdit ? 'Update' : 'Save'}
            </MJButton>
          </Group>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default MJFormsCardSection;
