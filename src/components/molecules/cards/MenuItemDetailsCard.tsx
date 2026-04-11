import { useCallback, useMemo, useState } from 'react';
import { Badge, Divider, Image } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import MJActionGroupButton from '@/components/atoms/buttons/MJActionGroupButton';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { IMenuItem, IVendor } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type Props = {
  menuItem: IMenuItem | null;
  vendor: IVendor;
  closeAction: () => void;
};

const MenuItemDetailsCard = ({ menuItem, vendor, closeAction }: Props) => {
  const { addToCart } = useMealJetStore((state) => state);
  const [addons, setAddons] = useState(menuItem?.addons);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [orderQuantity, setOrderQuantity] = useState(1);

  const handleOrderQuantityChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment') {
      setOrderQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setOrderQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    }
  };

  const handleAddonOptionChange = (
    addonId: string,
    optionId: string,
    action: 'increment' | 'decrement'
  ) => {
    setAddons((prevAddons) => {
      return prevAddons?.map((addon) => {
        if (addon.name === addonId) {
          // Get the total currently selected across all options in this addon
          const totalSelected = addon.options.reduce(
            (total, option) => total + (option.quantity || 0),
            0
          );

          const updatedOptions = addon.options.map((option) => {
            if (option.label === optionId) {
              const currentQuantity = option.quantity || 0;

              if (action === 'increment') {
                // Block increment if the addon's total maxSelect is already reached
                if (totalSelected >= addon.maxSelect) return option;
                return { ...option, quantity: currentQuantity + 1 };
              } else {
                return { ...option, quantity: Math.max(currentQuantity - 1, 0) };
              }
            }
            return option;
          });

          return { ...addon, options: updatedOptions };
        }
        return addon;
      });
    });
  };

  const checkIfAddonMaxisReached = useCallback(
    (addonId: number) => {
      const totalSelected = addons?.[addonId].options.reduce(
        (total, option) => total + (option.quantity || 0),
        0
      ) as number;
      return totalSelected >= (addons?.[addonId].maxSelect as number);
    },
    [addons]
  );

  const totalPrice = useMemo(() => {
    if (menuItem?.price) {
      const addonsTotal =
        addons?.reduce((addonAcc, addon) => {
          const optionsTotal = addon.options.reduce((optionAcc, option) => {
            return optionAcc + option.extraPrice * (option.quantity || 0);
          }, 0);
          return addonAcc + optionsTotal;
        }, 0) || 0;

      return (menuItem.price + addonsTotal) as number;
    }
  }, [menuItem?.price, addons]);

  const handleAddtoCart = () => {
    const errors: Record<string, string> = {};
    addons?.forEach((addon) => {
      const totalSelected = addon.options.reduce(
        (total, option) => total + (option.quantity || 0),
        0
      );
      if (addon.required && totalSelected === addon.minSelect) {
        errors[addon.name] = `This ${addon.name} addon is required`;
      }
    });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});
    Array.from({ length: orderQuantity }).forEach(() => {
      addToCart(`${menuItem?.id}-${randomId()}` as string, {
        title: menuItem?.name as string,
        id: menuItem?.id as string,
        quantity: 1,
        price: totalPrice as number,
        imageUrl: menuItem?.image as string,
        totalQuantity: orderQuantity,
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorImage: vendor.logo,
        vendorSlug: vendor.slug,
        vendorLocation: vendor.location,
        vendorDeliveryFee: vendor.deliveryFee,
        addons,
      });
    });
    notifications.show({
      title: 'Added to Cart',
      message: `${menuItem?.name} has been added to your cart.`,
      color: 'green',
    });
    closeAction();
  };

  return (
    <div className="flex flex-col">
      <Image src={menuItem?.image} alt={menuItem?.name} className="w-full h-64 object-cover" />
      <div className="mt-3 px-5 py-2">
        <h2 className="font-medium text-lg">{menuItem?.name}</h2>
        <p className="text-sm text-gray-400">{menuItem?.description}</p>
        <span>{formatCurrency(menuItem?.price as number, 'NGN')}</span>
      </div>
      <Divider mt="md" />
      {/* customizations */}
      <div className="overflow-y-scroll h-60">
        {menuItem?.addons?.map((addon, index) => (
          <div key={index} className="px-5 py-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{addon.name}</h3>
              <Badge variant="light" color={addon.required ? 'red' : 'green'}>
                {addon.required ? 'Required' : 'Optional'}
              </Badge>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              {addon.maxSelect - addon.minSelect} choice(s) available
            </p>
            <div className=" space-y-2">
              {addon.options.map((option, idx) => {
                const value = addons?.[index].options[idx].quantity || 0;

                const disabled = checkIfAddonMaxisReached(index) && value == 0;
                return (
                  <div
                    key={idx}
                    className={` ${disabled ? 'opacity-50' : ''} flex items-center gap-2`}
                  >
                    <MJActionGroupButton
                      disabled={disabled}
                      size="xs"
                      increment={() =>
                        handleAddonOptionChange(addon.name, option.label, 'increment')
                      }
                      decrement={() =>
                        handleAddonOptionChange(addon.name, option.label, 'decrement')
                      }
                      value={value}
                    />
                    <p>{option?.label}</p>
                    <p className="ml-auto text-sm">
                      {formatCurrency(option?.extraPrice as number, 'NGN')}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-red-500 text-sm mt-2">{errors[addon.name]}</p>
          </div>
        ))}
      </div>

      {/* add to cart selection */}
      <div className="flex gap-3 px-4 py-3 mt-auto">
        <MJActionGroupButton
          increment={() => handleOrderQuantityChange('increment')}
          decrement={() => handleOrderQuantityChange('decrement')}
          value={orderQuantity}
          size="xl"
        />
        <button
          onClick={handleAddtoCart}
          className="flex hover:bg-primary/80 transition-all duration-150 px-3 text-white font-semibold items-center justify-between flex-1 bg-primary rounded-md"
        >
          Add to Cart
          <p>{formatCurrency(((totalPrice as number) * orderQuantity) as number, 'NGN')}</p>
        </button>
      </div>
    </div>
  );
};

export default MenuItemDetailsCard;
