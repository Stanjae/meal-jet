/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconLayoutGrid,
  IconLayoutList,
  IconMotorbike,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge, Progress } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FadeUp } from '@/components/atoms/animation/MJFadeUp';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import MJSummaryDashboardCard from '@/components/molecules/cards/MJSummaryDashboardCard';
import MJSelectFilter from '@/components/molecules/filters/MJSelectFilter';
import ReviewCartItems from '@/components/organisms/drawer/ReviewCartItems';
import MJEmptyCard from '@/components/organisms/empty/MJEmptyCard';
import {
  useGetCustomerOrders,
  useGetCustomerOrdersSummary,
  useHandleRevalidateOrder,
} from '@/lib/api/services';
import {
  emptyStateConfig,
  getOrderProgress,
  statusConfig,
  statusHistoryStates,
  statusTimelineMessages,
} from '@/lib/constants';
import { useMealJetStore } from '@/lib/store/zustand.store';
import {
  UserType,
  type TEmptyStateConfig,
  type TRevalidateCheckoutSessionResponse,
  type TSelectFilterData,
} from '@/lib/types';
import { formatCurrency, newDayJs, requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/my-orders'
)({
  component: RouteComponent,
  beforeLoad: () => requireRole([UserType.CUSTOMER]),
});

function OrderCardSkeleton() {
  return (
    <article className="rounded-3xl border border-white/70 bg-white p-3 md:p-4 shadow-sm animate-pulse">
      <div className="flex gap-3">
        <div className="h-20 w-20 rounded-2xl bg-gray-200" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="space-y-2">
              <div className="h-3 w-28 rounded bg-gray-200" />
              <div className="h-2.5 w-24 rounded bg-gray-100" />
            </div>

            <div className="h-6 w-24 rounded-full bg-gray-100" />
          </div>

          <div className="mt-2 space-y-2">
            <div className="h-2.5 w-full rounded bg-gray-100" />
            <div className="h-2.5 w-4/5 rounded bg-gray-100" />
          </div>

          <div className="mt-2 flex gap-3">
            <div className="h-2.5 w-20 rounded bg-gray-100" />
            <div className="h-2.5 w-28 rounded bg-gray-100" />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 h-2.5 w-10 rounded bg-gray-100" />
        <div className="h-2 w-full rounded-full bg-gray-100" />
      </div>

      <div className="mt-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3">
        <div className="h-2.5 w-11/12 rounded bg-gray-100" />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>

        <div className="flex gap-2">
          <div className="h-9 w-24 rounded-xl bg-gray-100" />
          <div className="h-9 w-20 rounded-xl bg-gray-100" />
        </div>
      </div>
    </article>
  );
}

function RouteComponent() {
  const user = useMealJetStore((state) => state.user);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [orderId, setOrderId] = useState<string | undefined>(undefined);

  const [emptyState, setEmptyState] = useState<TEmptyStateConfig>();

  const [layoutType, setLayoutType] = useState<'grid' | 'list'>('grid');

  const [openedReviewCart, { open: openReviewCart, close: closeReviewCart }] = useDisclosure(false);

  const { data: customerOrders, isLoading: loading } = useGetCustomerOrders({
    search: searchTerm,
    category: activeFilter === 'all' || !activeFilter ? undefined : activeFilter,
  });

  const { data: customerOrdersSummary, isLoading: summaryLoading } = useGetCustomerOrdersSummary();

  const handleRevalidateOrder = useHandleRevalidateOrder();

  const [revalidateOrderResponse, setRevalidateOrderResponse] =
    useState<TRevalidateCheckoutSessionResponse>();

  const selectFilterOptions = useMemo(
    () =>
      [
        {
          label: 'All',
          value: 'all',
          type: 'button',
          secondaryLabel: customerOrdersSummary?.summary?.allCount,
        },
        {
          label: 'Ongoing',
          value: 'ongoing',
          type: 'button',
          secondaryLabel: customerOrdersSummary?.summary?.ongoing,
        },
        {
          label: 'Completed',
          value: 'completed',
          type: 'button',
          secondaryLabel: customerOrdersSummary?.summary?.completed,
        },
      ] as TSelectFilterData[],
    [customerOrdersSummary?.summary]
  );

  const summaryStats = useMemo(() => {
    return [
      {
        label: 'Total orders',
        value: customerOrdersSummary?.summary?.allCount,
      },
      {
        label: 'Delivered',
        value: customerOrdersSummary?.summary?.delivered,
      },
      {
        label: 'In progress',
        value: customerOrdersSummary?.summary?.ongoing,
      },
      {
        label: 'Avg. ticket',
        value: formatCurrency(Math.round(customerOrdersSummary?.averageAmountPerOrder || 0), 'NGN'),
      },
    ];
  }, [customerOrdersSummary?.summary, customerOrdersSummary?.averageAmountPerOrder]);

  useEffect(() => {
    if (!loading && customerOrders?.orders.length === 0) {
      if (searchTerm && searchTerm?.length > 0) {
        setEmptyState(emptyStateConfig.orderHistory[1]);
      } else if (activeFilter !== 'all') {
        setEmptyState(emptyStateConfig.orderHistory[0]);
      } else {
        setEmptyState(emptyStateConfig.orderHistory[0]);
      }
    }
  }, [loading, customerOrders?.orders.length, searchTerm, activeFilter, setEmptyState]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  const handleReviewCart = async (orderId: string) => {
    setOrderId(orderId);
    try {
      const response = await handleRevalidateOrder.mutateAsync(orderId);
      setRevalidateOrderResponse(response.data);
      console.log('Revalidate checkout session response:', response);
      openReviewCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative min-h-full overflow-visible p-4 md:p-6 lg:p-8">
      <FadeUp className="relative">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] uppercase text-secondary">
              Customer Dashboard
            </p>
            <h1 className="mt-1 text-2xl md:text-4xl font-black text-gray-900 leading-tight">
              Orders History
            </h1>
            <p className="mt-1 text-sm text-gray-600 max-w-xl">
              A clean timeline of every meal, with quick access to tracking and live delivery state.
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/75 backdrop-blur-sm px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Total spend</p>
            <p className="text-lg font-extrabold text-gray-900">
              {formatCurrency(customerOrdersSummary?.totalAmountSpent || 0, 'NGN')}
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={100} className="relative mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryStats.map((item, idx) => (
          <MJSummaryDashboardCard item={item} loading={summaryLoading} key={idx} />
        ))}
      </FadeUp>

      <FadeUp
        delay={160}
        className="relative z-20 mt-5 rounded-2xl border border-white/70 bg-white/80 backdrop-blur-sm p-3 md:p-4 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="relative flex-1">
            <IconSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <MJTextinput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              placeholder="Search by order ID, vendor, or item"
            />
          </label>

          <div className="flex items-center gap-2">
            <MJButton
              size="sm"
              variant="light"
              onClick={() => setLayoutType((prev) => (prev === 'grid' ? 'list' : 'grid'))}
            >
              {layoutType === 'grid' ? <IconLayoutGrid /> : <IconLayoutList />}
            </MJButton>
            <MJSelectFilter
              value={activeFilter}
              data={selectFilterOptions}
              setValue={setActiveFilter}
            />
          </div>
        </div>
      </FadeUp>

      <div
        className={`relative mt-5 grid grid-cols-1 ${layoutType === 'grid' ? 'xl:grid-cols-2' : 'xl:grid-cols-1'} gap-4`}
      >
        {loading
          ? Array.from({ length: layoutType === 'grid' ? 4 : 3 }).map((_, idx) => (
              <FadeUp key={`order-skeleton-${idx}`} delay={140 + idx * 40}>
                <OrderCardSkeleton />
              </FadeUp>
            ))
          : customerOrders?.orders?.map((order, idx) => {
              const statusMeta = statusTimelineMessages[order.status as statusHistoryStates];

              return (
                <FadeUp key={order.id} delay={200 + idx * 70}>
                  <article className="rounded-3xl border border-white/70 bg-white p-3 md:p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex gap-3">
                      <Link
                        to="/dashboard/$userId/store/$storeSlug"
                        params={{
                          userId: user?.id as string,
                          storeSlug: order.vendor?.slug as string,
                        }}
                      >
                        <img
                          src={order.vendor?.logo}
                          alt={order.vendor?.name}
                          className="h-18 w-18 rounded-full object-cover ring-2 ring-white shadow-sm transition-transform duration-400 group-hover:scale-105"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <Link
                            to="/dashboard/$userId/store/$storeSlug"
                            params={{
                              userId: user?.id as string,
                              storeSlug: order.vendor?.slug as string,
                            }}
                          >
                            <p className="text-sm font-black text-gray-900">{order.vendor?.name}</p>
                            <p className="text-xs text-gray-500">Order: {order.orderNumber}</p>
                          </Link>

                          <Badge
                            variant="light"
                            color={statusConfig[order.status as statusHistoryStates].color}
                          >
                            {order.status.replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                        </div>

                        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                          {order.items.map((item) => item.title).join(', ')}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <IconClock size={13} />
                            {newDayJs(order.createdAt as string).fromNow()}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <IconMotorbike size={13} />
                            {order.status === statusHistoryStates.delivered
                              ? 'Completed'
                              : `${newDayJs().calendar(
                                  order?.estimatedDeliveryTime as unknown as string,
                                  {
                                    sameElse: 'DD/MM/YYYY [at] h:mm A',
                                  }
                                )} ETA`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-[11px]">
                        <span
                          className="font-bold"
                          style={{ color: statusConfig[order.status as statusHistoryStates].color }}
                        >
                          {getOrderProgress(order.status as statusHistoryStates)}%
                        </span>
                      </div>
                      <Progress
                        value={getOrderProgress(order.status as statusHistoryStates)}
                        color={statusConfig[order.status as statusHistoryStates].color}
                        radius="xl"
                        size="sm"
                        animated={
                          order.status === statusHistoryStates.preparing ||
                          order.status === statusHistoryStates.on_the_way
                        }
                      />
                    </div>

                    <div className="mt-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 text-xs text-gray-600">
                      {statusMeta.description}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(order.total, 'NGN')}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {user?.id ? (
                          <Link
                            to="/dashboard/$userId/track-orders/$orderId"
                            params={{ userId: user.id, orderId: order.id as string }}
                          >
                            <MJButton
                              size="xs"
                              className="h-9! rounded-xl!"
                              rightSection={<IconArrowUpRight size={14} />}
                            >
                              Track order
                            </MJButton>
                          </Link>
                        ) : (
                          <MJButton size="xs" className="h-9! rounded-xl!" disabled>
                            Track order
                          </MJButton>
                        )}
                        {order.status === statusHistoryStates.delivered && (
                          <MJButton
                            size="xs"
                            loading={order.id === orderId && handleRevalidateOrder.isPending}
                            variant="outline"
                            onClick={() => handleReviewCart(order.id as string)}
                            className="h-9! rounded-xl! border-gray-200!"
                          >
                            Reorder
                          </MJButton>
                        )}
                      </div>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
      </div>

      {customerOrders?.orders?.length === 0 && !loading && (
        <MJEmptyCard
          btnClickHandler={handleClearFilters}
          btnText="Clear filters"
          emptyState={emptyState}
        />
      )}

      <FadeUp
        delay={300}
        className="relative mt-5 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm"
      >
        <p className="text-xs text-primary font-bold tracking-[0.16em] uppercase">Delivery Mood</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex text-secondary bg-secondary/15 items-center gap-1 rounded-full px-3 py-1">
            <IconCheck size={13} /> Fast drops
          </span>
          <span className="inline-flex text-primary bg-primary/15 items-center gap-1 rounded-full px-3 py-1">
            <IconClock size={13} /> Real-time updates
          </span>
          <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-red-50 text-red-500">
            <IconX size={13} /> Clear cancellation signal
          </span>
        </div>
      </FadeUp>

      <ReviewCartItems
        data={revalidateOrderResponse}
        setData={setRevalidateOrderResponse}
        opened={openedReviewCart}
        onClose={closeReviewCart}
      />
    </section>
  );
}
