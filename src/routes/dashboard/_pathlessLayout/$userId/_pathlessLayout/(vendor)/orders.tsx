import { useEffect, useState, type ReactNode } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Badge, Progress, Tabs, Textarea, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { FadeUp } from '@/components/atoms/animation/MJFadeUp';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJDrawer from '@/components/atoms/drawer/MJDrawer';
import MJSelect from '@/components/atoms/inputs/MJSelect';
import MJModal from '@/components/atoms/modals/MJModal';
import {
  useGetVendorOrders,
  useUpdateOrderStatus,
  useVendorRetryDispatch,
} from '@/lib/api/services';
import { statusConfig, statusHistoryStates, VENDOR_ORDER_REJECT_REASONS } from '@/lib/constants';
import socket from '@/lib/socket.io/socketConfig';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { TAllVendorOrders, UserType } from '@/lib/types';
import { capitalizeFirstLetter, formatCurrency, newDayJs } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(vendor)/orders'
)({
  component: VendorOrders,
});

type Rider = {
  id: string;
  name: string;
  bike: string;
  phone: string;
  rating: number;
  etaMins: number;
};

type DeliveryStatus = 'picked_up' | 'en_route' | 'arriving' | 'delivered';

type DeliveryTracking = {
  id: string;
  orderId: string;
  customerName: string;
  deliveryAddress: string;
  rider: Rider;
  total: number;
  status: DeliveryStatus;
  startedAt: Date;
  updatedAt: Date;
  timeline: Array<{ label: string; at: Date }>;
};

type DispatchProgress = NonNullable<TAllVendorOrders['dispatchProgress']>;

const HISTORY_ORDERS = [
  {
    id: 'MJ-2038',
    customer: 'Emeka Okafor',
    total: 6400,
    status: 'completed',
    time: '8 min ago',
    items: 2,
  },
  {
    id: 'MJ-2037',
    customer: 'Sade Adeleke',
    total: 3200,
    status: 'completed',
    time: '35 min ago',
    items: 1,
  },
  {
    id: 'MJ-2036',
    customer: 'Bello Kadiri',
    total: 7800,
    status: 'rejected',
    time: '51 min ago',
    items: 3,
  },
  {
    id: 'MJ-2035',
    customer: 'Ngozi Eze',
    total: 12000,
    status: 'completed',
    time: '1 hr ago',
    items: 5,
  },
  {
    id: 'MJ-2034',
    customer: 'Tunde Williams',
    total: 4500,
    status: 'completed',
    time: '2 hrs ago',
    items: 2,
  },
];

const PREP_TIMES = [
  { label: '10 mins', value: '10' },
  { label: '15 mins', value: '15' },
  { label: '20 mins', value: '20' },
  { label: '25 mins', value: '25' },
  { label: '30 mins', value: '30' },
  { label: '35 mins', value: '35' },
  { label: '45 mins', value: '45' },
  { label: '60 mins', value: '60' },
];

const DELIVERY_STATUS_META: Record<
  DeliveryStatus,
  { label: string; color: string; progress: number }
> = {
  picked_up: { label: 'Picked up', color: '#5a8a30', progress: 30 },
  en_route: { label: 'En route', color: '#2563eb', progress: 65 },
  arriving: { label: 'Arriving soon', color: '#f59e0b', progress: 90 },
  delivered: { label: 'Delivered', color: '#16a34a', progress: 100 },
};

// ─── Prep timer ───────────────────────────────────────────────────────────────
function PrepTimer({ startedAt, estimatedMins }: { startedAt: Date; estimatedMins: number }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const update = () => {
      const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
      const total = estimatedMins * 60;
      setRemaining(Math.max(0, total - elapsed));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [startedAt, estimatedMins]);

  const total = estimatedMins * 60;
  const elapsed = total - remaining;
  const pct = Math.min(100, (elapsed / total) * 100);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isLate = remaining === 0;
  const isAlmost = pct > 80 && !isLate;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500">Prep timer</span>
        <span
          className="text-xs font-extrabold"
          style={{ color: isLate ? '#ef4444' : isAlmost ? '#f59e0b' : '#6366f1' }}
        >
          {isLate ? "⏰ Time's up" : `${mins}:${secs.toString().padStart(2, '0')} left`}
        </span>
      </div>
      <Progress
        value={pct}
        size="sm"
        radius="xl"
        color={isLate ? 'red' : isAlmost ? 'yellow' : 'violet'}
        animated={!isLate}
      />
    </div>
  );
}

// ─── Order card ───────────────────────────────────────────────────────────────
function OrderCard({
  order,
  onAccept,
  onReject,
  onMarkReady,
  onRetryDispatch,
  onClick,
  isLoading,
  isRetrying,
  dispatchProgress,
}: {
  order: TAllVendorOrders;
  onAccept: (order: TAllVendorOrders) => void;
  onReject: (order: TAllVendorOrders) => void;
  onMarkReady: (order: TAllVendorOrders) => void;
  onRetryDispatch: (order: TAllVendorOrders) => void;
  onClick: (order: TAllVendorOrders) => void;
  isLoading?: boolean;
  isRetrying?: boolean;
  dispatchProgress?: DispatchProgress | null;
}) {
  const isNew = order.status === statusHistoryStates.pending && order.createdAt === order.updatedAt;
  const isPreparing = order.status === statusHistoryStates.preparing;
  const isReady = order.status === statusHistoryStates.ready;
  const isAssigned = order.status === statusHistoryStates.assigned;

  const color = statusConfig[order.status as statusHistoryStates]?.color || '#d1d5db';
  const headerBg = isNew
    ? 'rgba(252,146,58,.06)'
    : isPreparing
      ? 'rgba(99,102,241,.06)'
      : 'rgba(141,193,88,.06)';

  const fullName = `${order.customer.firstName} ${order.customer.lastName}`;
  const [dispatchNow, setDispatchNow] = useState(0);

  useEffect(() => {
    if (!dispatchProgress?.expiresAt) return;

    const timer = setInterval(() => {
      setDispatchNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatchProgress?.expiresAt]);

  const remainingDispatchSeconds = dispatchProgress?.expiresAt
    ? dispatchNow > 0
      ? Math.max(0, Math.ceil((dispatchProgress.expiresAt - dispatchNow) / 1000))
      : Math.ceil((dispatchProgress.waitMs || 0) / 1000)
    : 0;

  const dispatchPct = dispatchProgress
    ? Math.min(
        100,
        ((dispatchProgress.waitMs - remainingDispatchSeconds * 1000) / dispatchProgress.waitMs) *
          100
      )
    : 0;

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      style={{
        borderColor: `${color}`,
        borderLeft: `4px solid ${color}`,
        animation: isNew ? 'order-arrive .5s ease, shake .6s ease .5s' : 'order-arrive .4s ease',
      }}
      onClick={() => onClick(order)}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: headerBg }}>
        <div className="flex items-center gap-2">
          {isNew && (
            <span
              className="w-2 h-2 rounded-full relative shrink-0"
              style={{ background: '#fc923a' }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: '#fc923a', animation: 'pulse-ring 1.8s ease-out infinite' }}
              />
            </span>
          )}
          <span className="font-extrabold text-sm text-gray-900">{order.orderNumber}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-500">
            {newDayJs(order.createdAt as string).fromNow()}
          </span>
        </div>
        {order.paymentStatus === 'paid' && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(141,193,88,.12)', color: '#5a8a30' }}
          >
            ✓ Paid
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm font-bold text-gray-900">{capitalizeFirstLetter(fullName)}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              📍 {order.deliveryAddress?.formattedAddress}
            </p>
          </div>
          <div className="text-right">
            <p className="font-extrabold text-base text-gray-900">
              {formatCurrency(order.total, 'NGN')}
            </p>
            <p className="text-xs text-gray-400">{order.items.length} items</p>
          </div>
        </div>

        {/* Items preview */}
        <div className="space-y-0.5 mb-2">
          {order.items.slice(0, 2).map((item, i) => (
            <div key={i}>
              <p className="text-sm text-gray-500">
                {item.quantity}× {item.title} ·{' '}
                <span className="font-semibold">{formatCurrency(item.price, 'NGN')}</span>
              </p>
              <ul className="ml-4 mt-0.5 space-y-0.5">
                {item.addons
                  ?.flatMap((j) => j.options)
                  .filter((op) => op.quantity)
                  .map((addon, index) => (
                    <li key={index} className="text-xs text-gray-400">
                      {addon.label}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          {order.items.length > 2 && (
            <p className="text-xs text-gray-400">+ {order.items.length - 2} more item(s)</p>
          )}
        </div>

        {order.customerNotes && (
          <div className="bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 mb-2">
            <p className="text-xs text-amber-700">📝 {order.customerNotes}</p>
          </div>
        )}

        {/* Prep timer */}
        {isPreparing && order.updatedAt && order !== null && (
          <PrepTimer
            startedAt={order.updatedAt as Date}
            estimatedMins={order.prepTimeEstimate as number}
          />
        )}

        {isReady && (
          <div className="space-y-1 mt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: '#8dc158' }} />
              <span className="text-xs font-semibold" style={{ color: '#5a8a30' }}>
                Ready — awaiting driver
              </span>
            </div>
            {order.dispatchExhausted && (
              <div className="rounded-md bg-amber-50 border border-amber-100 px-2 py-1">
                <p className="text-[11px] font-medium text-amber-700">
                  Dispatch exhausted. Expanding search or support intervention needed.
                </p>
              </div>
            )}
            {!order.dispatchExhausted && dispatchProgress && (
              <div className="rounded-md bg-green-50 border border-green-100 px-2 py-1.5 mt-1">
                <div className="flex items-center justify-between text-[11px] font-medium text-green-700">
                  <span>
                    Searching riders • Round {dispatchProgress.currentRound}/
                    {dispatchProgress.totalRounds}
                  </span>
                  <span>{remainingDispatchSeconds}s</span>
                </div>
                <p className="text-[10px] text-green-600 mt-0.5">
                  Radius {(dispatchProgress.radiusMetres / 1000).toFixed(1)}km • Up to{' '}
                  {dispatchProgress.batchSize} riders this round
                </p>
                <Progress value={dispatchPct} size="xs" color="green" radius="xl" mt={6} />
              </div>
            )}
          </div>
        )}

        {isAssigned && (
          <div className="mt-1.5 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: '#5a8a30' }} />
              <span className="text-xs font-semibold" style={{ color: '#4d7a28' }}>
                Assigned to {order.driver?.firstName} {order.driver?.lastName}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Rider ETA:{' '}
              {order.estimatedDeliveryTime
                ? newDayJs(order.estimatedDeliveryTime).fromNow()
                : '10 mins'}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
          {order.status === statusHistoryStates.pending && (
            <>
              <MJButton
                fullWidth
                size="xs"
                radius="xl"
                className="font-bold hover:scale-[1.02] transition-transform duration-150"
                style={{ background: '#fc923a', border: 'none' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept(order);
                }}
              >
                ✓ Accept
              </MJButton>
              <MJButton
                fullWidth
                size="xs"
                radius="xl"
                variant="outline"
                className="font-bold hover:scale-[1.02] transition-transform duration-150"
                style={{ borderColor: '#ef4444', color: '#dc2626' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onReject(order);
                }}
              >
                ✕ Reject
              </MJButton>
            </>
          )}
          {isPreparing && (
            <MJButton
              fullWidth
              loading={isLoading}
              size="xs"
              radius="xl"
              className="font-bold"
              style={{ background: '#6366f1', border: 'none' }}
              onClick={(e) => {
                e.stopPropagation();
                onMarkReady(order as TAllVendorOrders);
              }}
            >
              ✓ Mark ready
            </MJButton>
          )}
          {isReady &&
            (order.dispatchExhausted ? (
              <MJButton
                fullWidth
                size="xs"
                radius="xl"
                className="font-bold"
                style={{ background: '#f59e0b', border: 'none', color: '#fff' }}
                loading={isRetrying}
                onClick={(e) => {
                  e.stopPropagation();
                  onRetryDispatch(order);
                }}
              >
                Retry dispatch
              </MJButton>
            ) : (
              <MJButton
                fullWidth
                size="xs"
                radius="xl"
                className="font-bold"
                style={{ background: '#8dc158', border: 'none', color: '#5a8a30' }}
                disabled
              >
                {dispatchProgress
                  ? `Searching riders • R${dispatchProgress.currentRound}/${dispatchProgress.totalRounds}`
                  : 'Dispatching riders...'}
              </MJButton>
            ))}
          {isAssigned && (
            <MJButton
              fullWidth
              size="xs"
              radius="xl"
              variant="outline"
              className="font-bold"
              style={{ borderColor: '#8dc158', color: '#5a8a30' }}
              disabled
            >
              Rider assigned (dispatch controlled)
            </MJButton>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Kanban column ────────────────────────────────────────────────────────────
function KanbanColumn({
  title,
  count,
  color,
  emptyMsg,
  children,
}: {
  title: string;
  count: number;
  color: string;
  emptyMsg: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-70 lg:min-w-0 flex-1">
      {/* Column header */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-2xl mb-3"
        style={{ background: `${color}10`, border: `1.5px solid ${color}25` }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          <span className="font-extrabold text-sm text-gray-900">{title}</span>
        </div>
        <span
          className="text-xs font-extrabold px-2 py-0.5 rounded-full text-white"
          style={{ background: count > 0 ? color : '#d1d5db' }}
        >
          {count}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-3 flex-1">
        {children}
        {count === 0 && (
          <div className="text-center py-10 px-4">
            <p className="text-3xl mb-2">✅</p>
            <p className="text-sm text-gray-400 font-medium">{emptyMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Accept modal ─────────────────────────────────────────────────────────────
function AcceptModal({
  opened,
  onClose,
  order,
  onConfirm,
  isLoading,
}: {
  opened: boolean;
  onClose: () => void;
  order: TAllVendorOrders | null;
  onConfirm: (id: string, prepMins: number) => void;
  isLoading: boolean;
}) {
  const [prepTime, setPrepTime] = useState('20');
  if (!order) return null;
  return (
    <MJModal
      opened={opened}
      onClose={onClose}
      title={`Accept order ${order.orderNumber}`}
      radius="lg"
      centered
      size="md"
    >
      <div className="space-y-5">
        <div className="bg-gray-50 rounded-xl p-4 space-y-1.5">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                {item.quantity}× {item.title}
              </span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(item.price, 'NGN')}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-1.5 flex justify-between font-extrabold text-sm text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(order.total, 'NGN')}</span>
          </div>
        </div>

        <MJSelect
          label="Estimated prep time"
          description="This starts the prep timer visible to the customer"
          value={prepTime}
          onChange={(_, option) => setPrepTime(option.value)}
          data={PREP_TIMES}
          radius="md"
          styles={{
            input: {
              borderRadius: '10px',
              border: '2px solid #f3f4f6',
              '&:focus': { borderColor: '#fc923a' },
            },
          }}
        />

        <div className="flex gap-3">
          <MJButton variant="default" radius="xl" fullWidth onClick={onClose}>
            Cancel
          </MJButton>
          <MJButton
            fullWidth
            radius="xl"
            className="font-bold shadow-md"
            style={{ background: '#fc923a', border: 'none' }}
            onClick={() => onConfirm(order.id as string, parseInt(prepTime))}
            loading={isLoading}
          >
            ✓ Accept order
          </MJButton>
        </div>
      </div>
    </MJModal>
  );
}

// ─── Reject modal ─────────────────────────────────────────────────────────────
function RejectModal({
  opened,
  onClose,
  order,
  onConfirm,
}: {
  opened: boolean;
  onClose: () => void;
  order: TAllVendorOrders | null;
  onConfirm: (order: TAllVendorOrders, reason: string, note: string) => void;
}) {
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  if (!order) return null;
  return (
    <MJModal
      opened={opened}
      onClose={onClose}
      title={`Reject order ${order?.orderNumber}`}
      radius="lg"
      centered
      size="sm"
    >
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-3">
          <p className="text-xs text-red-600">
            ⚠️ The customer will be notified and refunded automatically.
          </p>
        </div>

        <MJSelect
          label="Reason for rejection"
          placeholder="Select a reason"
          value={reason}
          onChange={(value) => setReason(value || '')}
          data={VENDOR_ORDER_REJECT_REASONS}
          required
          radius="md"
          styles={{ input: { borderRadius: '10px', border: '2px solid #f3f4f6' } }}
        />

        <Textarea
          label="Additional note (optional)"
          placeholder="Any extra context for the customer..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          radius="md"
          minRows={2}
          styles={{ input: { borderRadius: '10px', border: '2px solid #f3f4f6' } }}
        />

        <div className="flex gap-3">
          <MJButton variant="default" radius="xl" fullWidth onClick={onClose}>
            Cancel
          </MJButton>
          <MJButton
            fullWidth
            radius="xl"
            color="red"
            className="font-bold"
            disabled={!reason}
            onClick={() => onConfirm(order, reason, note)}
          >
            ✕ Reject order
          </MJButton>
        </div>
      </div>
    </MJModal>
  );
}

// ─── Order detail drawer ──────────────────────────────────────────────────────
function OrderDetailDrawer({
  opened,
  onClose,
  order,
}: {
  opened: boolean;
  onClose: () => void;
  order: TAllVendorOrders | null;
}) {
  if (!order) return null;
  const cfg = statusConfig[order.status];

  const fullName = `${order.customer.firstName} ${order.customer.lastName}`;

  return (
    <MJDrawer
      opened={opened}
      onClose={onClose}
      position="right"
      title={
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-lg text-gray-900">{order.orderNumber}</span>
          <Badge color={cfg.color} variant={cfg.variant}>
            {order.status}
          </Badge>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Customer info */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Customer</p>
          <p className="font-bold text-gray-900">{capitalizeFirstLetter(fullName)}</p>
          <p className="text-sm text-gray-500">📞 {order.customer.phone}</p>
          <p className="text-sm text-gray-500">📍 {order.deliveryAddress.formattedAddress}</p>
        </div>

        {/* Order items */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
            Order items
          </p>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">{formatCurrency(item.price, 'NGN')}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal, 'NGN')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery fee</span>
              <span>{formatCurrency(order.deliveryFee, 'NGN')}</span>
            </div>
            <div className="flex justify-between font-extrabold text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(order.total, 'NGN')}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.customerNotes && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-600 mb-1">Customer note</p>
            <p className="text-sm text-amber-700">{order.customerNotes}</p>
          </div>
        )}

        {/* Payment */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
          <span className="text-sm text-gray-500">Payment</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800 capitalize">
              {order.paymentMethod}
            </span>
            {order.paymentStatus === 'paid' && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(141,193,88,.12)', color: '#5a8a30' }}
              >
                ✓ Confirmed
              </span>
            )}
          </div>
        </div>

        {/* Prep timer */}
        {order.status === statusHistoryStates.preparing &&
          order.updatedAt &&
          order.prepTimeEstimate !== null && (
            <PrepTimer startedAt={order.updatedAt as Date} estimatedMins={order.prepTimeEstimate} />
          )}

        {order.status === statusHistoryStates.assigned && order.driver && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-3">
            <p className="text-xs font-bold text-green-700 mb-1">Assigned rider</p>
            <p className="text-sm font-semibold text-green-800">
              {order.driver.firstName} {order.driver.lastName}
            </p>
            <p className="text-xs text-green-700">{order.driver.vehicle_type}</p>
            <p className="text-xs text-green-700">ETA: {order.estimatedDeliveryTime ?? 10} mins</p>
          </div>
        )}
      </div>
    </MJDrawer>
  );
}

// ─── Order history ────────────────────────────────────────────────────────────
function OrderHistory() {
  const [search, setSearch] = useState('');
  const filtered = HISTORY_ORDERS.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID or customer name…"
          radius="xl"
          size="sm"
          leftSection={<span>🔍</span>}
          className="flex-1 max-w-sm"
          styles={{ input: { border: '2px solid #f3f4f6', '&:focus': { borderColor: '#fc923a' } } }}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wide">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-5 gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors duration-150 items-center"
            >
              <span className="text-sm font-bold text-gray-900">{o.id}</span>
              <span className="text-sm text-gray-600">{o.customer}</span>
              <span className="text-sm text-gray-500">{o.items}</span>
              <span className="text-sm font-semibold text-gray-900">
                ₦{o.total.toLocaleString()}
              </span>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full w-fit"
                style={
                  o.status === 'completed'
                    ? { background: 'rgba(141,193,88,.12)', color: '#5a8a30' }
                    : { background: 'rgba(239,68,68,.1)', color: '#dc2626' }
                }
              >
                {o.status === 'completed' ? '✓ Completed' : '✕ Rejected'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Delivery tracking (read-only for vendor) ────────────────────────────────
function DeliveryTrackingBoard({ deliveries }: { deliveries: DeliveryTracking[] }) {
  if (!deliveries.length) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <p className="text-3xl mb-2">🛰️</p>
        <p className="text-sm font-semibold text-gray-800">No tracked deliveries yet</p>
        <p className="text-xs text-gray-500 mt-1">
          Orders moved with "Mark picked up" will appear here for monitoring.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {deliveries.map((delivery) => {
        const meta = DELIVERY_STATUS_META[delivery.status];
        return (
          <div
            key={delivery.id}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold text-gray-900">
                  {delivery.orderId} · {delivery.customerName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">📍 {delivery.deliveryAddress}</p>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: meta.color }}
              >
                {meta.label}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-gray-50 px-3 py-2">
                <p className="text-gray-400">Rider</p>
                <p className="font-semibold text-gray-800">{delivery.rider.name}</p>
                <p className="text-gray-500">{delivery.rider.phone}</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-3 py-2">
                <p className="text-gray-400">Order total</p>
                <p className="font-semibold text-gray-800">₦{delivery.total.toLocaleString()}</p>
                <p className="text-gray-500">Read-only tracking</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-3 py-2">
                <p className="text-gray-400">Last event</p>
                <p className="font-semibold text-gray-800">
                  {delivery.timeline[delivery.timeline.length - 1]?.label}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Delivery progress</span>
                <span className="text-xs font-bold" style={{ color: meta.color }}>
                  {meta.progress}%
                </span>
              </div>
              <Progress
                value={meta.progress}
                color={delivery.status === 'delivered' ? 'green' : 'blue'}
                radius="xl"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function VendorOrders() {
  const { vendor, user } = useMealJetStore((state) => state);
  const [orders, setOrders] = useState<TAllVendorOrders[]>([]);
  const [retryingOrderId, setRetryingOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<TAllVendorOrders | null>(null);
  const [rejectTarget, setRejectTarget] = useState<TAllVendorOrders | null>(null);
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);
  const [acceptOpened, { open: openAccept, close: closeAccept }] = useDisclosure(false);
  const [rejectOpened, { open: openReject, close: closeReject }] = useDisclosure(false);

  const { data: vendorOrders } = useGetVendorOrders({ vendorId: vendor?.id as string });

  const { mutateAsync: updateOrderStatus, isPending: isUpdatingOrderStatus } =
    useUpdateOrderStatus();
  const { mutateAsync: vendorRetryDispatch } = useVendorRetryDispatch();

  useEffect(() => {
    if (vendorOrders?.data) {
      setOrders(vendorOrders.data?.orders ?? []);
    }
  }, [vendorOrders]);

  useEffect(() => {
    const onDispatchProgress = (payload: DispatchProgress) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === payload.orderId
            ? {
                ...order,
                dispatchExhausted: false,
                dispatchProgress: payload,
              }
            : order
        )
      );
    };

    const onDispatchExhausted = (payload: { orderId: string; orderNumber: string }) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === payload.orderId
            ? {
                ...order,
                dispatchExhausted: true,
                dispatchProgress: null,
              }
            : order
        )
      );

      notifications.show({
        title: 'Dispatch retry exhausted',
        message: `Order ${payload.orderNumber} needs manual intervention.`,
        color: 'yellow',
      });
    };

    socket.on('dispatch_progress', onDispatchProgress);
    socket.on('dispatch_exhausted', onDispatchExhausted);

    return () => {
      socket.off('dispatch_progress', onDispatchProgress);
      socket.off('dispatch_exhausted', onDispatchExhausted);
    };
  }, []);

  const handleClickOrder = (order: TAllVendorOrders) => {
    setSelectedOrder(order);
    openDetail();
  };

  const handleAcceptOpen = (order: TAllVendorOrders) => {
    setSelectedOrder(order);
    openAccept();
  };

  const handleRejectOpen = (order: TAllVendorOrders) => {
    setRejectTarget(order);
    openReject();
  };

  const handleAcceptConfirm = async (id: string, prepMins: number) => {
    try {
      await updateOrderStatus({
        orderId: id,
        payload: {
          status: statusHistoryStates.preparing,
          prepTimeEstimate: prepMins,
          statusTimeline: [
            {
              status: statusHistoryStates.confirmed,
              timestamp: newDayJs().toISOString(),
              updatedBy: vendor?.id as string,
              updatedByUserRole: user?.role as UserType,
            },
            {
              status: statusHistoryStates.preparing,
              timestamp: newDayJs().add(5, 'minute').toISOString(),
              updatedBy: vendor?.id as string,
              updatedByUserRole: user?.role as UserType,
            },
          ],
        },
      });
      closeAccept();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectConfirm = async (order: TAllVendorOrders, reason: string, note: string) => {
    try {
      await updateOrderStatus({
        orderId: order.id as string,
        payload: {
          status: statusHistoryStates.cancelled,
          cancelledBy: user?.role as UserType,
          cancelledByUserId: vendor?.id as string,
          cancellationReason: reason === 'Others' ? note : reason,
          statusTimeline: [
            {
              status: statusHistoryStates.cancelled,
              timestamp: newDayJs().toISOString(),
              updatedBy: vendor?.id as string,
              updatedByUserRole: user?.role as UserType,
            },
          ],
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkReady = async (order: TAllVendorOrders) => {
    const actualPrepTime = newDayJs().diff(newDayJs(order.updatedAt as string), 'minute');
    try {
      await updateOrderStatus({
        orderId: order.id as string,
        payload: {
          status: statusHistoryStates.ready,
          actualPrepTime,
          statusTimeline: [
            {
              status: statusHistoryStates.ready,
              timestamp: newDayJs().toISOString(),
              updatedBy: vendor?.id as string,
              updatedByUserRole: user?.role as UserType,
            },
          ],
        },
      });
      closeAccept();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetryDispatch = async (order: TAllVendorOrders) => {
    if (!order.id) return;

    try {
      setRetryingOrderId(order.id);
      await vendorRetryDispatch({ orderId: order.id });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? {
                ...o,
                dispatchExhausted: false,
              }
            : o
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setRetryingOrderId(null);
    }
  };

  const newOrders = orders.filter((o) => o.status === statusHistoryStates.pending);
  const preparingOrders = orders.filter((o) => o.status === statusHistoryStates.preparing);
  const readyOrders = orders.filter((o) => o.status === statusHistoryStates.ready);

  const trackedDeliveries: DeliveryTracking[] = orders
    .filter((o) =>
      [
        statusHistoryStates.assigned,
        statusHistoryStates.picked_up,
        statusHistoryStates.on_the_way,
        statusHistoryStates.delivered,
      ].includes(o.status)
    )
    .map((o) => {
      const statusMap: Partial<Record<statusHistoryStates, DeliveryStatus>> = {
        [statusHistoryStates.assigned]: 'picked_up',
        [statusHistoryStates.picked_up]: 'picked_up',
        [statusHistoryStates.on_the_way]: 'en_route',
        [statusHistoryStates.delivered]: 'delivered',
      };

      return {
        id: (o.id as string) || o.orderNumber,
        orderId: o.orderNumber,
        customerName: `${o.customer.firstName} ${o.customer.lastName}`,
        deliveryAddress: o.deliveryAddress?.formattedAddress || '',
        rider: {
          id: o.driver?._id || '',
          name: `${o.driver?.firstName || ''} ${o.driver?.lastName || ''}`.trim(),
          bike: o.driver?.vehicle_type || 'N/A',
          phone: o.driver?.phone || 'N/A',
          rating: 0,
          etaMins: 0,
        },
        total: o.total,
        status: statusMap[o.status] || 'picked_up',
        startedAt: new Date(o.createdAt as string),
        updatedAt: new Date(o.updatedAt as string),
        timeline: (o.statusHistory || []).map((h) => ({
          label: h.status.replaceAll('_', ' '),
          at: new Date(h.timestamp),
        })),
      };
    });

  const deliveredCount = trackedDeliveries.filter((d) => d.status === 'delivered').length;

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Modals */}
      <AcceptModal
        opened={acceptOpened}
        onClose={closeAccept}
        order={selectedOrder}
        onConfirm={handleAcceptConfirm}
        isLoading={isUpdatingOrderStatus}
      />
      <RejectModal
        opened={rejectOpened}
        onClose={closeReject}
        order={rejectTarget}
        onConfirm={handleRejectConfirm}
      />
      <OrderDetailDrawer opened={detailOpened} onClose={closeDetail} order={selectedOrder} />

      {/* Header */}
      <FadeUp>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Orders</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {orders.length} active · {HISTORY_ORDERS.length} completed today
            </p>
          </div>
          <div className="text-xs text-gray-500">
            Dispatch is automatic once order is marked ready.
          </div>
        </div>
      </FadeUp>

      <Tabs defaultValue="live" color="orange">
        <Tabs.List>
          <Tabs.Tab value="live">
            Live orders
            {orders.length > 0 && (
              <span
                className="ml-2 text-xs font-extrabold px-1.5 py-0.5 rounded-full text-white"
                style={{ background: '#fc923a' }}
              >
                {orders.length}
              </span>
            )}
          </Tabs.Tab>
          <Tabs.Tab value="history">Order history</Tabs.Tab>
          <Tabs.Tab value="tracking">
            Delivery tracking
            {trackedDeliveries.length > 0 && (
              <span
                className="ml-2 text-xs font-extrabold px-1.5 py-0.5 rounded-full text-white"
                style={{ background: '#5a8a30' }}
              >
                {trackedDeliveries.length}
              </span>
            )}
          </Tabs.Tab>
        </Tabs.List>

        {/* Live orders — Kanban */}
        <Tabs.Panel value="live" pt="lg">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {/* New */}
            <KanbanColumn
              title="New"
              count={newOrders.length}
              color="#fc923a"
              emptyMsg="No new orders right now"
            >
              {newOrders.map((o) => (
                <OrderCard
                  key={o.id}
                  order={o}
                  onAccept={handleAcceptOpen}
                  onReject={handleRejectOpen}
                  onMarkReady={handleMarkReady}
                  onRetryDispatch={handleRetryDispatch}
                  dispatchProgress={o.dispatchProgress}
                  onClick={handleClickOrder}
                />
              ))}
            </KanbanColumn>

            {/* Preparing */}
            <KanbanColumn
              title="Preparing"
              count={preparingOrders.length}
              color="#6366f1"
              emptyMsg="Nothing preparing yet"
            >
              {preparingOrders.map((o) => (
                <OrderCard
                  key={o.id}
                  order={o}
                  onAccept={handleAcceptOpen}
                  onReject={handleRejectOpen}
                  onMarkReady={handleMarkReady}
                  onRetryDispatch={handleRetryDispatch}
                  dispatchProgress={o.dispatchProgress}
                  isLoading={isUpdatingOrderStatus}
                  onClick={handleClickOrder}
                />
              ))}
            </KanbanColumn>

            {/* Ready */}
            <KanbanColumn
              title="Ready for Pickup"
              count={readyOrders.length}
              color="#8dc158"
              emptyMsg="No orders ready yet"
            >
              {readyOrders.map((o) => (
                <OrderCard
                  key={o.id}
                  order={o}
                  onAccept={handleAcceptOpen}
                  onReject={handleRejectOpen}
                  onMarkReady={handleMarkReady}
                  onRetryDispatch={handleRetryDispatch}
                  dispatchProgress={o.dispatchProgress}
                  isRetrying={retryingOrderId === o.id}
                  onClick={handleClickOrder}
                />
              ))}
            </KanbanColumn>
          </div>
        </Tabs.Panel>

        {/* History */}
        <Tabs.Panel value="history" pt="lg">
          <OrderHistory />
        </Tabs.Panel>

        <Tabs.Panel value="tracking" pt="lg">
          <div className="mb-4 rounded-2xl border border-gray-100 bg-white px-4 py-3">
            <p className="text-sm font-semibold text-gray-800">Post-handoff visibility</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Vendor can monitor delivery updates here, but rider statuses remain
              dispatch-controlled.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {trackedDeliveries.length} tracked · {deliveredCount} delivered
            </p>
          </div>
          <DeliveryTrackingBoard deliveries={trackedDeliveries} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
