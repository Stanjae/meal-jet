import { useState } from 'react';
import { IconLocationFilled, IconMapPin, IconMapPinCheck, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Divider, Transition } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJModal2 from '@/components/atoms/modals/MJModal2';
import {
  useDeleteUserAddress,
  useUpdateUserCurrentAddress,
  useUpdateUserProfile,
} from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { IAddress } from '@/lib/types';
import MJSearchLocationField from '../inputs/MJSearchLocationField';

type Props = {
  opened: boolean;
  onClose: () => void;
};

const AddUpdateLocationModal = ({ opened, onClose }: Props) => {
  const { user, updateUser } = useMealJetStore((state) => state);

  const [selectedAddress, setSelectedAddress] = useState<{
    item: IAddress | null;
    type: 'delete' | 'update';
  }>({ item: null, type: 'update' });

  const { mutateAsync } = useUpdateUserProfile();

  const { mutateAsync: deleteAddressAsync, isPending: isDeletePending } = useDeleteUserAddress();

  const { mutateAsync: updateUserCurrentAddressAsync, isPending: isUpdatePending } =
    useUpdateUserCurrentAddress();

  const handleLocationSelect = async (location: IAddress) => {
    try {
      const response = await mutateAsync({
        currentAddress: location,
        type: 'address',
      });
      updateUser({
        currentAddress: response.data.user.currentAddress,
        savedAddresses: response.data.user.savedAddresses,
        location: response.data.user.location,
      });
    } catch (err) {
      console.error('Failed to update user profile with new location:', err);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      const response = await deleteAddressAsync(selectedAddress.item?._id as string);
      updateUser({
        savedAddresses: response.data.user.savedAddresses,
      });
      setSelectedAddress({ item: null, type: 'update' });
    } catch (err) {
      console.error('Failed to delete user address:', err);
    }
  };

  const handleUpdateCurrentAddress = async () => {
    try {
      const response = await updateUserCurrentAddressAsync(selectedAddress.item as IAddress);
      updateUser({
        currentAddress: response.data.user.currentAddress,
      });
      setSelectedAddress({ item: null, type: 'update' });
    } catch (err) {
      console.error('Failed to update user current address:', err);
    }
  };

  return (
    <MJModal2 opened={opened} size={550} title={'Delivery Address'} onClose={onClose}>
      {!selectedAddress.item ? (
        <section className="px-5 py-4">
          <MJSearchLocationField
            size="md"
            setValues={() => {}}
            name="location"
            secondaryAction={handleLocationSelect}
          />

          {user?.currentAddress && (
            <div className="flex items-center my-2 gap-1.5">
              <IconLocationFilled />
              <div>
                <h4 className="text-primary font-medium">Use your current location</h4>
                <p className="text-sm text-gray-400">{user.currentAddress.formattedAddress}</p>
              </div>
            </div>
          )}
          <Divider my="sm" />
          <div className="font-semibold flex gap-1.5 text-sm">
            <IconMapPinCheck color="orange" /> Saved Addresses
          </div>
          <Divider my="sm" />
          <div className="overflow-y-auto h-64">
            {user?.savedAddresses?.map((address, index) => (
              <div key={index}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAddress({ item: address, type: 'update' });
                  }}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <IconMapPin color="orange" />
                  <div>
                    <h4 className=" text-sm font-medium">{address.formattedAddress}</h4>
                  </div>
                  <ActionIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAddress({ item: address, type: 'delete' });
                    }}
                    size="sm"
                    className="ml-auto"
                    color="red"
                    variant="subtle"
                  >
                    <IconTrash />
                  </ActionIcon>
                </div>
                <Divider my="sm" />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Transition
          mounted={!!selectedAddress.item}
          transition="slide-left"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <section style={styles} className="px-5 py-4">
              <h2 className="text-lg font-semibold text-center">
                {selectedAddress.type === 'delete'
                  ? ' Do you want to delete this address'
                  : ' Do you want to set this address as your current location?'}
              </h2>
              {selectedAddress.type === 'delete' && (
                <p className="text-gray-400 text-center">This action cannot be undone</p>
              )}

              <div className="flex flex-col gap-2 my-2">
                <MJButton
                  loading={isDeletePending || isUpdatePending}
                  onClick={() =>
                    selectedAddress.type === 'update'
                      ? handleUpdateCurrentAddress()
                      : handleDeleteAddress()
                  }
                  color={selectedAddress.type === 'delete' ? 'red.5' : 'm-green'}
                >
                  {selectedAddress.type === 'delete' ? 'Delete' : 'Set as Current Location'}
                </MJButton>
                <MJButton
                  variant="outline"
                  onClick={() => setSelectedAddress({ item: null, type: 'update' })}
                >
                  Cancel
                </MJButton>
              </div>
            </section>
          )}
        </Transition>
      )}
    </MJModal2>
  );
};

export default AddUpdateLocationModal;
