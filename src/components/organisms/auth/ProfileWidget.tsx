import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  IconArrowRight,
  IconBrandAppleFilled,
  IconCheck,
  IconCopy,
  IconHeart,
  IconLogout,
  IconPointFilled,
  type IconProps,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { ActionIcon, Avatar, CopyButton, Divider, Group, Paper } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJUnstyledButton from '@/components/atoms/buttons/MJUnstyledButton';
import { useCreateWallet } from '@/lib/api/services';
import { useAuth } from '@/lib/hooks';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type Options = {
  label: string;
  preicon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  posticon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  color?: string;
  onclick?: () => void;
};

const ProfileWidget = () => {
  const { user } = useMealJetStore((state) => state);

  const { handleLogout } = useAuth();

  const [openedProfile, { toggle, close: closeProfile }] = useDisclosure(false);

  const ref = useClickOutside(() => closeProfile());

  const fullName = user?.firstName ? user?.firstName + ' ' + user?.lastName : undefined;

  const { mutateAsync } = useCreateWallet();

  const handleCreateWallet = async () => {
    try {
      await mutateAsync({ userId: user?.id as string });
    } catch (error) {
      console.error('Failed to create wallet:', error);
    }
  };

  const dasboardOptions: Options[] = [
    { label: 'Favorites', preicon: IconHeart, posticon: IconArrowRight, onclick: () => {} },
    {
      label: 'Logout',
      color: 'red',
      preicon: IconLogout,
      onclick: handleLogout,
    },
  ];
  return (
    <div className="relative">
      <Avatar onClick={toggle} name={user?.username as string} color="initials" />
      {openedProfile && (
        <Paper
          className="absolute right-0 top-12 w-75 bg-[radial-gradient(circle_at_12%_14%,rgba(252,146,58,0.23),transparent_36%),radial-gradient(circle_at_85%_2%,rgba(141,193,88,0.2),transparent_32%),linear-gradient(145deg,#fffdf8,#ffffff_45%,#f7fbef)] bg-no-repeat bg-cover"
          shadow="md"
          ref={ref}
        >
          <div className="flex flex-col items-center gap-2 px-3 pt-5 pb-3">
            <Avatar name={user?.username as string} color="initials" size="md" />
            <p className="text-lg font-semibold">{fullName || user?.username}</p>
            <p className="text-sm text-gray-500">{user?.phone}</p>
          </div>
          <Divider my="sm" />
          <div className="px-3">
            <Group justify="space-between">
              <p>Wallet Balance</p>
              <p>{formatCurrency(890, 'NGN')}</p>
            </Group>
            <div>
              <section className="my-2 border flex justify-between items-center border-gray-200 rounded-xl px-3 py-1">
                <span className="font-medium text-sm">Paystack - Titan</span>
                <Divider orientation="vertical" />
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">9074848494</span>
                  <CopyButton value={'9074848494'} timeout={2000}>
                    {({ copied, copy }) => (
                      <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    )}
                  </CopyButton>
                </div>
              </section>
              <p className="text-xs text-center text-gray-500">
                Top up your wallet with Paystack-Titan
              </p>
            </div>
            <MJButton fullWidth onClick={handleCreateWallet}>
              Generate Wallet
            </MJButton>
          </div>
          <Divider my="sm" />
          <div>
            {dasboardOptions.map((option, index) => (
              <MJUnstyledButton
                key={index}
                onClick={option.onclick}
                className="flex w-full items-center px-3 py-2 rounded-none hover:bg-gray-100"
              >
                {option.preicon && <option.preicon size={16} className="mr-2" />}
                {option.label}
                {option.posticon && <option.posticon size={16} className="ml-auto" />}
              </MJUnstyledButton>
            ))}
          </div>
          <Divider my="lg" />
          <div>
            <div className="px-3 pb-3 flex items-center gap-1 justify-center">
              <Link className="text-xs" to={'/'}>
                Privacy Policy
              </Link>
              <IconPointFilled size={10} />
              <Link className="text-xs" to={'/'}>
                Terms of Service
              </Link>
              <ActionIcon radius={50}>
                <IconBrandAppleFilled size={15} />
              </ActionIcon>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default ProfileWidget;
