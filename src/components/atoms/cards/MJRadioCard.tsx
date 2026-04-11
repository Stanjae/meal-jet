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
  icon?: React.ElementType | string;
};

export const MJRadioCard = ({
  value,
  title,
  description,
  address,
  status,
  icon: Icon,
}: MJRadioCardProps) => {
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
          <div className="flex items-center gap-3">
            <Text className={classes.label}>{title}</Text>
            {typeof Icon === 'string' ? (
              <img className="w-10 h-5" src={Icon} alt={title} />
            ) : (
              Icon && <Icon />
            )}
          </div>

          {description && <Text className={classes.description}>{description}</Text>}
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
