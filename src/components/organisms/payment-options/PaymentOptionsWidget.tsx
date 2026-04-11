import { useState } from 'react';
import {
  IconCreditCardFilled,
  IconDeviceMobile,
  IconTransfer,
  IconUser,
  IconWallet,
  IconWorld,
} from '@tabler/icons-react';
import { Divider, Radio, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import OpayLogo from '@/assets/opay.svg';
import MJButton from '@/components/atoms/buttons/MJButton';
import { MJRadioCard } from '@/components/atoms/cards/MJRadioCard';
import MJModal2 from '@/components/atoms/modals/MJModal2';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type PaymentOption = {
  type: string;
  label: string;
  icon: React.FC;
  disabled?: boolean;
  balance?: number;
};

type Props = {
  setPaymentMethod: (method: { type: string; option: string }) => void;
  paymentMethod: { type: string; option: string };
};
const PaymentOptionsWidget = ({ setPaymentMethod, paymentMethod }: Props) => {
  const { user } = useMealJetStore((state) => state);
  const [openedPayOnlineOptions, { open: openPayOnlineOptions, close: closePayOnlineOptions }] =
    useDisclosure(false);

  const [paymentOnlineOption, setPaymentOnlineOption] = useState<string>();
  const paymentOptions = [
    {
      type: 'wallet',
      balance: user?.walletBalance,
      label: 'Wallet',
      icon: IconWallet,
    },
    {
      type: 'pay-online',
      label: 'Pay Online',
      icon: IconWorld,
    },
    {
      type: 'pay-for-me',
      label: 'Pay for me',
      icon: IconUser,
      disabled: true,
    },
  ] as PaymentOption[];

  const payOnlineOptions = [
    {
      type: 'card',
      label: 'Card Payment',
      icon: IconCreditCardFilled,
    },
    {
      type: 'bank-transfer',
      label: 'Bank Transfer',
      icon: IconTransfer,
    },
    {
      type: 'ussd',
      label: 'USSD',
      icon: IconDeviceMobile,
    },
    {
      type: 'opay',
      label: 'OPay',
      icon: OpayLogo,
    },
  ];

  const handleSelectOption = (option: string) => {
    switch (option) {
      case 'wallet':
        setPaymentMethod({ type: 'wallet', option: '' });
        setPaymentOnlineOption(undefined);
        break;
      case 'pay-online':
        openPayOnlineOptions();
        break;
      case 'pay-for-me':
        // This option is currently disabled, so we won't set it as a payment method
        break;
      default:
        setPaymentMethod({ type: '', option: '' });
    }
  };

  const handleSelectPayOnlineOption = () => {
    setPaymentMethod({ type: 'pay-online', option: paymentOnlineOption as string });
    closePayOnlineOptions();
  };

  const IconOrImg = payOnlineOptions.find((o) => o.type === paymentOnlineOption)?.icon;
  const paymentOnlineIcon =
    typeof IconOrImg === 'string' ? (
      <img src={IconOrImg} alt={paymentOnlineOption} style={{ width: 24, height: 24 }} />
    ) : (
      IconOrImg && <IconOrImg />
    );
  return (
    <>
      <SimpleGrid cols={2}>
        {paymentOptions.map((option) => (
          <div
            onClick={() => handleSelectOption(option.type)}
            key={option.type}
            className={`flex gap-3 items-center border rounded-md px-4 py-2 ${
              option.disabled
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : paymentMethod.type === option.type
                  ? 'border-primary'
                  : 'border-gray-200 hover:border-primary cursor-pointer'
            }`}
          >
            <option.icon />
            <p>
              {option.label}{' '}
              {option.balance !== undefined ? `(${formatCurrency(option.balance, 'NGN')})` : ''}
            </p>
          </div>
        ))}
        {paymentMethod.type === 'pay-online' && paymentOnlineOption && (
          <div
            className={`flex gap-3 items-center border rounded-md px-4 py-2 border-secondary text-gray-400`}
          >
            {paymentOnlineIcon}
            <p>{payOnlineOptions.find((o) => o.type === paymentMethod.option)?.label as string}</p>
          </div>
        )}
      </SimpleGrid>
      <MJModal2
        opened={openedPayOnlineOptions}
        size={550}
        onClose={closePayOnlineOptions}
        title="Payment Gateway"
      >
        <section className="px-4 flex flex-col h-full pb-4">
          <p className="text-gray-500">How would you like to pay?</p>
          <Divider my="md" />
          <div className=" h-64 overflow-y-auto pb-3">
            <Radio.Group value={paymentOnlineOption} onChange={setPaymentOnlineOption}>
              <div className="space-y-3">
                {payOnlineOptions.map((option) => (
                  <MJRadioCard
                    key={option.type}
                    title={option.label}
                    value={option.type}
                    icon={option.icon}
                  />
                ))}
              </div>
            </Radio.Group>
          </div>
          <MJButton onClick={handleSelectPayOnlineOption} className="mt-auto" fullWidth>
            Continue
          </MJButton>
        </section>
      </MJModal2>
    </>
  );
};

export default PaymentOptionsWidget;
