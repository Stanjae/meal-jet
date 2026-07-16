import { IconCurrentLocation } from '@tabler/icons-react';
import { Text, Timeline } from '@mantine/core';
import { statusHistoryStates, statusTimelineMessages } from '@/lib/constants';
import type { IStatusHistory } from '@/lib/types';
import { newDayJs } from '@/lib/utils/helpers/helpers';

const MJOrderStatusTimeline = ({ statusHistory }: { statusHistory: IStatusHistory[] }) => {
  const timeline = [...(statusHistory || [])].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  return (
    <Timeline color="m-green" active={timeline.length - 1} bulletSize={24} lineWidth={2}>
      {timeline.map((item, index) => (
        <Timeline.Item
          key={`${item.status}-${item.timestamp}-${index}`}
          bullet={<IconCurrentLocation size={12} />}
          title={statusTimelineMessages[item.status as statusHistoryStates]?.title}
          styles={{ itemTitle: { fontSize: 14, fontWeight: 600 } }}
        >
          <Text c="dimmed" size="xs">
            {statusTimelineMessages[item.status as statusHistoryStates]?.description ||
              'Status updated'}
          </Text>
          <Text size="xs" mt={4}>
            {newDayJs(item.timestamp as string).fromNow()}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default MJOrderStatusTimeline;
