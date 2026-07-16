import { Skeleton } from '@mantine/core';

type Props = {
  item: {
    label: string;
    value?: string | number;
  };
  loading?: boolean;
};
const MJSummaryDashboardCard = ({ item, loading }: Props) => {
  return (
    <div className="rounded-2xl border border-white/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="text-xs text-gray-500">{item.label}</p>
      {loading ? (
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      ) : (
        <p className="text-xl font-black text-gray-900">{item.value}</p>
      )}
    </div>
  );
};

export default MJSummaryDashboardCard;
