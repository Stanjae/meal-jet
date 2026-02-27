import { IconDownload, IconUpload } from '@tabler/icons-react';
import { Group } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

const CustomerWallet = () => {
  return (
    <div className="p-6.5 bg-primary wallet-bg overflow-hidden relative rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="300"
        viewBox="0 0 50 50"
        fill="currentColor"
        className="fill-white/20 absolute -left-10 -top-10"
      >
        <path stroke="none" d="M0 0h50v50H0z" fill="none" />
        <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="300"
        viewBox="0 0 50 50"
        fill="currentColor"
        className="fill-white/30 absolute -left-5 top-10"
      >
        <path stroke="none" d="M0 0h50v50H0z" fill="none" />
        <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
      </svg>
      <div className=" text-white">
        <h4 className=" text-sm text-white font-medium">Balance</h4>
        <h2 className="text-[35px] mb-2 font-bold text-white">{formatCurrency(7800, 'NGN')}</h2>
      </div>
      <Group>
        <MJButton variant="default" leftSection={<IconDownload />}>
          Top Up
        </MJButton>
        <MJButton variant="default" leftSection={<IconUpload />}>
          Transfer
        </MJButton>
      </Group>
    </div>
  );
};

export default CustomerWallet;
