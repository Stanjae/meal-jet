import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Divider, Paper, Radio, Stack } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import { MJRadioCard } from '@/components/atoms/cards/MJRadioCard';
import MRingJLoader from '@/components/atoms/loader/MRingJLoader';
import { useGetVendorProfiles } from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';

export const SelectStoreForm = () => {
  const { data, isLoading } = useGetVendorProfiles();
  const [value, setValue] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setVendorProfile } = useMealJetStore((state) => state);

  const handleSubmit = () => {
    const selectedVendor = data?.data?.vendors?.find((vendor) => vendor.id === value);
    if (selectedVendor) {
      setVendorProfile(selectedVendor);
      navigate({ to: '/dashboard/$userId/orders', params: { userId: selectedVendor.owner } });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <MRingJLoader />
      </div>
    );
  }

  return (
    <Paper radius={'md'} p="xl" withBorder>
      <Radio.Group value={value} onChange={setValue} label="Select a store to manage" withAsterisk>
        <Stack>
          {data?.data?.vendors?.map((vendor) => (
            <MJRadioCard
              key={vendor.id}
              value={vendor.id}
              status={vendor.status}
              title={vendor.name}
              description={vendor.description}
              address={`${vendor.address.street}, ${vendor.address.city}, ${vendor.address.state} ${vendor.address.postalCode}`}
            />
          ))}
        </Stack>
      </Radio.Group>
      <Divider my="md" />
      <MJButton fullWidth disabled={!value} onClick={handleSubmit}>
        Continue
      </MJButton>
    </Paper>
  );
};
