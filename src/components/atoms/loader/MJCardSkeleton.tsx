import { Paper, SimpleGrid, Skeleton } from '@mantine/core';

type MJCardSkeletonProps = {
  cols: number;
  type: 'vendor' | 'menuItem' | 'order';
  totalCount?: number;
};

const MJCardSkeleton = ({ cols, type, totalCount = 20 }: MJCardSkeletonProps) => {
  const renderCard = (type: 'vendor' | 'menuItem' | 'order', index: number) => {
    switch (type) {
      case 'vendor':
        return (
          <div key={index} className="space-y-2">
            <Skeleton height={200} radius="md" />
            <Skeleton height={20} width={100} radius="md" />
            <Skeleton height={14} width={200} radius="md" />
          </div>
        );
      case 'menuItem':
        return (
          <Paper key={index} withBorder pb={0} className="flex">
            <div className="p-4 flex-1 flex flex-col">
              <Skeleton height={20} width={150} radius="md" />
              <Skeleton height={14} width={250} mt={'sm'} radius="md" />
              <Skeleton height={16} width={80} radius="md" mt="auto" />
            </div>
            <Skeleton height={152} width={128} radius="md" />
          </Paper>
        );
    }
  };
  return (
    <SimpleGrid cols={cols}>
      {Array.from({ length: totalCount }).map((_, index) => renderCard(type, index))}
    </SimpleGrid>
  );
};

export default MJCardSkeleton;
