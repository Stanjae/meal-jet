import { useState, type ReactElement } from 'react';
import { IconMap, IconMapPinFilled } from '@tabler/icons-react';
import { Loader } from '@mantine/core';
import type { SetValues } from '@mantine/form';
import { useClickOutside, useDebouncedCallback } from '@mantine/hooks';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { useGetMapleBoxGeoLocation } from '@/lib/api/services';
import type { IAddress } from '@/lib/types';
import type { MJGoogleLocation } from '@/lib/types/api/externals.types';

type Props<T extends object> = {
  setValues: SetValues<T>;
  name: string;
  label?: string;
  defaultValue?: string;
  error?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  secondaryAction?: (location: IAddress) => void;
};

export default function MJSearchLocationField<T extends object>({
  setValues,
  name,
  label,
  defaultValue,
  error,
  size = 'sm',
  secondaryAction,
}: Props<T>): ReactElement {
  const [value, setValue] = useState(defaultValue || '');
  const [opened, setOpened] = useState(false);

  const ref = useClickOutside(() => setOpened(false));

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term.length >= 6) {
      setOpened(true);
    } else {
      setOpened(false);
    }
    setValue(term);
  }, 0);

  const { data: mapleBoxData, isLoading: mapleBoxIsLoading } = useGetMapleBoxGeoLocation(value);

  const handleSelect = (result: MJGoogleLocation) => {
    setValue(`${result.street}`);
    const selectedLocation: IAddress = {
      street: result.street,
      formattedAddress: result.formattedAddress,
      city: result.city,
      state: result.state,
      country: result.country,
      postalCode: result.postalCode,
      coordinates: result.coordinates,
    };

    setValues({
      [name]: selectedLocation,
    } as Partial<T>);

    setOpened(false);

    if (secondaryAction) {
      secondaryAction(selectedLocation);
    }
  };
  return (
    <div ref={ref} className="relative">
      <MJTextinput
        leftSection={<IconMap />}
        size={size}
        autoComplete="off"
        //onFocus={() => setOpened(true)}
        placeholder="Search location"
        value={value}
        onChange={(event) => handleSearch(event.currentTarget.value)}
        label={label}
        error={error}
      />
      {opened && (
        <div className=" bg-white shadow rounded-md px-2 py-5 space-y-1 absolute w-full z-40 left-0 top-16 overflow-y-scroll max-h-60">
          {mapleBoxIsLoading && <Loader size={'sm'} />}
          {!mapleBoxIsLoading && mapleBoxData?.length === 0 && <p>No results found</p>}
          {!mapleBoxIsLoading &&
            mapleBoxData?.map((result: MJGoogleLocation, index: number) => (
              <div
                key={index}
                className=" flex items-start p-2 gap-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleSelect(result)}
              >
                <IconMapPinFilled size={16} color="gray" />
                <div>
                  {result.formattedAddress}
                  <p className="text-xs text-gray-500">
                    {result.city}, {result.state}, {result.country} {result.postalCode}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
