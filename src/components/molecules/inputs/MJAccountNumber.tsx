/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import type { SetValues } from '@mantine/form';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { useVerifyAccountNumber } from '@/lib/api/services';

type Props<T> = {
  label: string;
  setValues: SetValues<T>;
  error: string | undefined;
  name: string;
  values: Record<string, unknown>;
};

const MJAccountNumber = <T extends object>(props: Props<T>) => {
  const [accountNumber, setAccountNumber] = useState('');
  const { data, isLoading } = useVerifyAccountNumber(
    accountNumber,
    parseInt(props.values.bankCode as string, 10)
  );

  useEffect(() => {
    if (data && data.status) {
      props.setValues({
        [props.name]: {
          ...props.values,
          accountName: data.data.account_name.replace(/\d/g, ''),
          accountNumber,
        },
      } as Partial<T>);
    }
  }, [data]);
  return (
    <div>
      <MJTextinput
        label={props.label}
        onChange={(event) => setAccountNumber(event.target.value)}
        error={props.error}
      />
      {isLoading && <Loader className="mt-1" size="xs" />}
    </div>
  );
};

export default MJAccountNumber;
