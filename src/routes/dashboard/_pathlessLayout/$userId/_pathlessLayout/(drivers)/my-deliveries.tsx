import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import MJButton from '@/components/atoms/buttons/MJButton';
import { useRiderAcceptDispatch, useRiderUpdateDeliveryStatus } from '@/lib/api/services';
import { statusHistoryStates } from '@/lib/constants';
import socket from '@/lib/socket.io/socketConfig';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(drivers)/my-deliveries'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <RiderDispatchConsole />;
}

type DispatchOffer = {
  orderId: string;
  orderNumber: string;
  total: number;
  deliveryAddress: string;
  expiresInMs: number;
};

function RiderDispatchConsole() {
  const [offers, setOffers] = useState<DispatchOffer[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [activeOrderNumber, setActiveOrderNumber] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<
    | statusHistoryStates.assigned
    | statusHistoryStates.picked_up
    | statusHistoryStates.on_the_way
    | statusHistoryStates.delivered
  >(statusHistoryStates.assigned);

  const { mutateAsync: acceptDispatch, isPending: isAccepting } = useRiderAcceptDispatch();
  const { mutateAsync: updateDeliveryStatus, isPending: isUpdatingStatus } =
    useRiderUpdateDeliveryStatus();

  useEffect(() => {
    const onDispatchOffer = (payload: DispatchOffer) => {
      setOffers((prev) => {
        const exists = prev.some((offer) => offer.orderId === payload.orderId);
        if (exists) return prev;
        return [payload, ...prev];
      });
    };

    const onOrderAssigned = (payload: { orderId: string; orderNumber: string }) => {
      setActiveOrderId(payload.orderId);
      setActiveOrderNumber(payload.orderNumber);
      setDeliveryStatus(statusHistoryStates.assigned);
      setOffers((prev) => prev.filter((offer) => offer.orderId !== payload.orderId));
    };

    const onOrderDeliveryUpdate = (payload: { orderId: string; status: statusHistoryStates }) => {
      if (payload.orderId !== activeOrderId) return;
      if (payload.status === statusHistoryStates.picked_up)
        setDeliveryStatus(statusHistoryStates.picked_up);
      if (payload.status === statusHistoryStates.on_the_way)
        setDeliveryStatus(statusHistoryStates.on_the_way);
      if (payload.status === statusHistoryStates.delivered) {
        setDeliveryStatus(statusHistoryStates.delivered);
      }
    };

    socket.on('dispatch_offer', onDispatchOffer);
    socket.on('order_assigned', onOrderAssigned);
    socket.on('order_delivery_update', onOrderDeliveryUpdate);

    return () => {
      socket.off('dispatch_offer', onDispatchOffer);
      socket.off('order_assigned', onOrderAssigned);
      socket.off('order_delivery_update', onOrderDeliveryUpdate);
    };
  }, [activeOrderId]);

  const handleAcceptOffer = async (offer: DispatchOffer) => {
    await acceptDispatch({ orderId: offer.orderId });
    setActiveOrderId(offer.orderId);
    setActiveOrderNumber(offer.orderNumber);
    setDeliveryStatus(statusHistoryStates.assigned);
    setOffers((prev) => prev.filter((item) => item.orderId !== offer.orderId));
  };

  const handleProgressStatus = async () => {
    if (!activeOrderId) return;

    const nextStatusMap: Partial<
      Record<
        statusHistoryStates,
        | statusHistoryStates.picked_up
        | statusHistoryStates.on_the_way
        | statusHistoryStates.delivered
      >
    > = {
      [statusHistoryStates.assigned]: statusHistoryStates.picked_up,
      [statusHistoryStates.picked_up]: statusHistoryStates.on_the_way,
      [statusHistoryStates.on_the_way]: statusHistoryStates.delivered,
    };

    const nextStatus = nextStatusMap[deliveryStatus];
    if (!nextStatus) return;

    await updateDeliveryStatus({
      orderId: activeOrderId,
      payload: { status: nextStatus },
    });

    setDeliveryStatus(nextStatus);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h2 className="text-lg font-extrabold text-gray-900">Rider Dispatch Console</h2>
        <p className="text-sm text-gray-500 mt-1">
          Receive dispatch offers, accept one, then progress delivery statuses.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-3">
        <p className="text-sm font-bold text-gray-800">Incoming Offers</p>
        {offers.length === 0 ? (
          <p className="text-sm text-gray-500">No live offers right now.</p>
        ) : (
          offers.map((offer) => (
            <div
              key={offer.orderId}
              className="rounded-xl border border-gray-100 bg-gray-50 p-3 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{offer.orderNumber}</p>
                <p className="text-xs text-gray-500">{offer.deliveryAddress}</p>
              </div>
              <MJButton
                size="xs"
                radius="xl"
                loading={isAccepting}
                onClick={() => handleAcceptOffer(offer)}
              >
                Accept offer
              </MJButton>
            </div>
          ))
        )}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-3">
        <p className="text-sm font-bold text-gray-800">Active Delivery</p>
        {!activeOrderId ? (
          <p className="text-sm text-gray-500">No active delivery assigned yet.</p>
        ) : (
          <>
            <p className="text-sm text-gray-700">
              {activeOrderNumber} · Current status:{' '}
              <span className="font-semibold">{deliveryStatus}</span>
            </p>
            <MJButton
              size="sm"
              radius="xl"
              loading={isUpdatingStatus}
              disabled={deliveryStatus === statusHistoryStates.delivered}
              onClick={handleProgressStatus}
            >
              {deliveryStatus === statusHistoryStates.assigned && 'Mark picked up'}
              {deliveryStatus === statusHistoryStates.picked_up && 'Mark on the way'}
              {deliveryStatus === statusHistoryStates.on_the_way && 'Mark delivered'}
              {deliveryStatus === statusHistoryStates.delivered && 'Completed'}
            </MJButton>
          </>
        )}
      </div>
    </div>
  );
}
