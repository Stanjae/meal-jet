import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import { Badge, Paper } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import type { TSelectFilterData } from '@/lib/types';

type Props = {
  data: TSelectFilterData[];
  value?: string;
  setValue?: (value: string) => void;
};

const MJSelectFilter = ({ data, value, setValue }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleSelect = (selectedValue: string) => {
    if (setValue) {
      setValue(selectedValue);
    }
    close();
  };

  const ref = useClickOutside(() => close());
  return (
    <div className="relative">
      <div
        onClick={open}
        className="px-3 cursor-pointer z-50 flex justify-between items-center min-w-20 border border-gray-200 rounded-lg text-lg py-1"
      >
        {value}
        <IconChevronDown size={12} />
      </div>
      {opened && (
        <Paper
          withBorder
          shadow="sm"
          ref={ref}
          className="absolute top-12 md:right-0 min-w-52 py-1.5"
        >
          {data.map((item) => (
            <div
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-3 py-1"
              key={item.value}
              onClick={() => handleSelect(item.value)}
            >
              <Badge size="sm" circle>
                {item.secondaryLabel}
              </Badge>
              {item.label}

              {value === item.value && <IconCheck size={14} className="ml-auto" />}
            </div>
          ))}
        </Paper>
      )}
    </div>
  );
};

export default MJSelectFilter;
