import { useState, type ReactElement } from 'react';
import { IconMap, IconMapPinFilled } from '@tabler/icons-react';
import type { SetValues } from '@mantine/form';
import { useClickOutside, useDebouncedCallback } from '@mantine/hooks';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { useGetGoogleLocation } from '@/lib/api/services';
import type { MJGoogleLocation } from '@/lib/types/api/externals.types';

type LocationFieldValue = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates: number[];
};

type Props<T extends object> = {
  setValues: SetValues<T>;
  name: string;
  label: string;
  defaultValue?: string;
  error: string;
};

export default function MJSearchLocationField<T extends object>({
  setValues,
  name,
  label,
  defaultValue,
  error,
}: Props<T>): ReactElement {
  const [value, setValue] = useState(defaultValue || '');
  const [opened, setOpened] = useState(false);

  const ref = useClickOutside(() => setOpened(false));

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term.length === 0) {
      setOpened(false);
      setValue('');
      return;
    }
    setValue(term);
    setOpened(true);
  }, 0);
  const { data, isLoading } = useGetGoogleLocation(value);

  console.log('Google location results:', data);

  const handleSelect = (result: MJGoogleLocation) => {
    setValue(`${result.street} ${result.city}`);
    const selectedLocation: LocationFieldValue = {
      street: result.street,
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
  };
  return (
    <div ref={ref} className="relative">
      <MJTextinput
        leftSection={<IconMap />}
        autoComplete="off"
        placeholder="Search location"
        value={value}
        onChange={(event) => handleSearch(event.currentTarget.value)}
        label={label}
        error={error}
      />
      {opened && (
        <div className=" bg-white shadow rounded-md px-2 py-5 space-y-1 absolute w-full z-10 left-0 top-16 overflow-y-scroll max-h-60">
          {isLoading && <p>Loading...</p>}
          {!isLoading && data?.length === 0 && <p>No results found</p>}
          {!isLoading &&
            data?.map((result: MJGoogleLocation, index: number) => (
              <div
                key={index}
                className=" flex items-start p-2 gap-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleSelect(result)}
              >
                <IconMapPinFilled size={16} color="gray" />
                <div>
                  {result.street}
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
