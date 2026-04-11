import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, Image, Paper } from '@mantine/core';
import type { IMenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type VendorItemCardProps = {
  menuItem: IMenuItem;
  handleClick?: (menuItem: IMenuItem) => void;
};

const VendorMenuItemCard = ({ menuItem, handleClick }: VendorItemCardProps) => {
  return (
    <Paper withBorder pb={0} className="flex">
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-xl mb-1">{menuItem?.name}</h3>
        <p className="text-gray-400 text-sm">{menuItem?.description}</p>
        <p className="font-semibold mt-auto">{formatCurrency(menuItem?.price, 'NGN')}</p>
      </div>
      <div className=" w-32 h-38 relative">
        <Image src={menuItem?.image} className="w-full h-full" alt={menuItem?.name} />
        <ActionIcon
          size={'lg'}
          radius={50}
          variant="white"
          className="absolute bottom-2 right-2"
          onClick={() => handleClick?.(menuItem)}
        >
          <IconPlus size={16} />
        </ActionIcon>
      </div>
    </Paper>
  );
};

export default VendorMenuItemCard;
