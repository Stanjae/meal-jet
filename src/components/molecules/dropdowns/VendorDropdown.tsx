import { useState } from 'react';
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconCircleCheckFilled,
} from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { ActionIcon, Avatar, Divider, Paper } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import { useGetVendorProfiles } from '@/lib/api/services';
import type { IVendor } from '@/lib/types';

type VendorDropdownProps = {
  defaultValue: IVendor | null;
  setVendorProfile?: (vendor: IVendor) => void;
};

const VendorDropdown = ({ defaultValue, setVendorProfile }: VendorDropdownProps) => {
  const { data } = useGetVendorProfiles();

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [vendorId, setVendorId] = useState<string | null>(defaultValue?.id || null);

  const handleSwapProfile = (value: string) => {
    const selectedVendor = data?.data?.vendors?.find((vendor) => vendor.id === value);
    if (setVendorProfile && selectedVendor) {
      setVendorProfile(selectedVendor);
      setVendorId(selectedVendor.id);
    }
  };

  const navigateToOnboarding = () => navigate({ to: '/dashboard/select-store' });

  const ref = useClickOutside(() => close());
  return (
    <section className="relative">
      <div onClick={open} className="flex items-center gap-2 cursor-pointer">
        <Avatar size={'sm'} src={defaultValue?.logo} />
        <p className="capitalize font-medium text-sm">{defaultValue?.name}</p>
        <ActionIcon className="ml-auto inline-block" variant="subtle">
          <IconChevronDown />
        </ActionIcon>
      </div>

      {opened && (
        <Paper withBorder ref={ref} className="absolute p-2 right-0 top-14 bg-white w-68">
          {data?.data?.vendors?.map((vendor) => (
            <div
              onClick={() => handleSwapProfile(vendor.id)}
              className={`${vendorId === vendor.id ? 'bg-gray-200' : ''} flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer`}
              key={vendor.id}
            >
              <Avatar size={'sm'} src={vendor.logo} />
              <p className="capitalize font-medium text-sm">{vendor.name}</p>
              {vendorId === vendor.id && (
                <IconCircleCheckFilled className="ml-auto" color="green" />
              )}
            </div>
          ))}
          <Divider my={'md'} />
          <MJButton
            onClick={navigateToOnboarding}
            size="md"
            color="gray.2"
            c={'dark'}
            leftSection={<IconAdjustmentsHorizontal />}
            radius={35}
            fullWidth
          >
            Open Console
          </MJButton>
        </Paper>
      )}
    </section>
  );
};

export default VendorDropdown;
