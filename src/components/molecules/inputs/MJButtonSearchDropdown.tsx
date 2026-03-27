import { useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Group, Radio } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import MRingJLoader from '@/components/atoms/loader/MRingJLoader';
import type { MJSelectOption } from '@/lib/types';

type MJButtonSearchDropdownProps = {
  defaultValue: string;
  data: MJSelectOption[] | undefined;
  loading?: boolean;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  selectedValue?: string | null;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string | null>>;
};

const MJButtonSearchDropdown = ({
  defaultValue,
  data,
  loading,
  search,
  setSearch,
  setSelectedValue,
}: MJButtonSearchDropdownProps) => {
  const [opened, { toggle, close }] = useDisclosure();
  const [value, setValue] = useState<string | null>(defaultValue || null);

  const ref = useClickOutside(() => close());

  const handleClear = () => {
    setValue(defaultValue || null);
    if (setSelectedValue) setSelectedValue(null);
  };

  const handleConfirm = () => {
    if (setSelectedValue) setSelectedValue(value);
  };

  const getLabelByValue = data?.find((option) => option.value === value)?.label || defaultValue;
  return (
    <section className="relative">
      <MJButton radius={35} size="sm" onClick={toggle} variant="light" leftSection={<IconPlus />}>
        {getLabelByValue}
      </MJButton>
      {opened && (
        <div
          ref={ref}
          className=" p-2 border border-gray-300 bg-white z-20 top-11 rounded-md absolute left-0 w-56"
        >
          <MJTextinput
            leftSection={<IconSearch />}
            size="xs"
            placeholder={`Search by ${defaultValue}`}
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
          />
          <div className="py-2">
            <Radio.Group
              value={value}
              onChange={(val) => {
                setValue(val);
              }}
              withAsterisk
            >
              {loading && (
                <div className="flex justify-center">
                  <MRingJLoader />
                </div>
              )}
              <div className="overflow-y-auto space-y-2 relative h-40">
                {data?.map((option) => (
                  <Radio value={option.value} label={option.label} key={option.value} />
                ))}
              </div>
            </Radio.Group>
          </div>
          <Group gap={10} grow mt={3}>
            <MJButton onClick={handleClear} variant="outline" size="xs">
              Clear
            </MJButton>
            <MJButton size="xs" color="m-green" onClick={handleConfirm}>
              Apply Filter
            </MJButton>
          </Group>
        </div>
      )}
    </section>
  );
};

export default MJButtonSearchDropdown;
