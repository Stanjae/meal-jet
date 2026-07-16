import {
  IconBike,
  IconCircleAsterisk,
  IconClock24,
  IconHeart,
  IconLockPassword,
  IconStarFilled,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { ActionIcon, Divider, Image } from '@mantine/core';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { IVendor } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type Props = {
  vendor: IVendor;
};

const VendorProfileCard = ({ vendor }: Props) => {
  const { user } = useMealJetStore((state) => state);

  return (
    <Link
      to={'/dashboard/$userId/store/$storeSlug'}
      params={{ storeSlug: vendor.slug, userId: user?.id as string }}
      className="block"
    >
      <div className=" h-39.5 relative">
        <Image
          className={`${vendor.isOpen ? '' : 'grayscale'} h-full rounded-md`}
          src={vendor.coverImage}
          alt={vendor.name}
        />
        {/* overlay */}
        {!vendor.isOpen && (
          <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/60 rounded-md">
            <div className="flex items-center gap-1">
              <IconLockPassword size={20} color="white" />
              <p className="text-white text-lg font-semibold">Closed</p>
            </div>
          </div>
        )}
        <ActionIcon
          variant="white"
          className="rounded-full absolute top-3 right-3 z-20"
          size={'lg'}
        >
          <IconHeart className="text-secondary" />
        </ActionIcon>
      </div>

      <div className="mt-2">
        <h3 className="font-medium">{vendor.name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {vendor?.deliveryFee > 0 ? (
              <IconBike size={14} />
            ) : (
              <IconCircleAsterisk className=" text-primary" size={14} />
            )}

            <span className={` ${vendor?.deliveryFee > 0 ? '' : 'text-primary'} text-sm`}>
              {vendor?.deliveryFee > 0
                ? `${formatCurrency(vendor.deliveryFee, 'NGN')}`
                : 'Free delivery'}
            </span>
          </div>
          <Divider orientation="vertical" />
          <div className="flex items-center gap-1">
            <IconStarFilled color="gold" size={14} />
            <p className="font-semibold text-sm">
              {vendor?.avgRating.toFixed(1)}
              <span className="text-sm text-gray-400 ml-1">({vendor?.totalRatings})</span>
            </p>
          </div>
          <Divider orientation="vertical" />
          <div className="flex items-center gap-1">
            <IconClock24 size={14} />
            <span className="text-sm">
              {Number(vendor.avgPrepTime) - 10} - {vendor?.avgPrepTime} mins
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VendorProfileCard;
