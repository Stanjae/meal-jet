import { IconMapPin } from '@tabler/icons-react';
import { Badge, Group, Radio, Text } from '@mantine/core';
import { VENDOR_STATUS_CONFIG } from '@/lib/constants';
import type { IVendorStatus } from '@/lib/types';
import { optimizeText } from '@/lib/utils/helpers/helpers';
import classes from './../../../styles/css/RadioCard.module.css';

type MJRadioCardProps = {
  value: string;
  title: string;
  description?: string;
  address?: string;
  status?: IVendorStatus;
};

export const MJRadioCard = ({ value, title, description, address, status }: MJRadioCardProps) => {
  const colorMap = VENDOR_STATUS_CONFIG[status as IVendorStatus];
  return (
    <Radio.Card
      className={classes.root}
      radius="md"
      value={value}
      key={value}
      disabled={['pending_approval', 'suspended'].includes(status as IVendorStatus)}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>{title}</Text>
          <Text className={classes.description}>{description}</Text>
          {address && (
            <div className=" flex items-center gap-2">
              <IconMapPin size={14} />
              <Text className=" text-gray-500 text-xs font-semibold">{address}</Text>
            </div>
          )}
          {status && (
            <div className="flex justify-end">
              <Badge color={colorMap?.color} variant="dot">
                {optimizeText(status, 'reversed')}
              </Badge>
            </div>
          )}
        </div>
      </Group>
    </Radio.Card>
  );
};
