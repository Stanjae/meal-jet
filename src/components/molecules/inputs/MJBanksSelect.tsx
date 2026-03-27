import type { SetValues } from '@mantine/form';
import MJSelect from '@/components/atoms/inputs/MJSelect';
import { useGetBankNames } from '@/lib/api/services';

type Props<T> = {
  setValues: SetValues<T>;
  name: string;
  label: string;
  error?: string;
  defaultValue?: string;
};

const MJBanksSelect = <T extends object>({
  setValues,
  name,
  label,
  error,
  defaultValue,
}: Props<T>) => {
  const { data } = useGetBankNames();

  const handleChange = (options: { label: string; value: string }) => {
    if (setValues) {
      setValues({ [name]: { bankName: options.label, bankCode: options.value } } as Partial<T>);
    }
  };
  return (
    <div>
      <MJSelect
        defaultValue={defaultValue}
        label={label}
        searchable
        data={data}
        onChange={(_value, option) => handleChange(option)}
      />
      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default MJBanksSelect;
