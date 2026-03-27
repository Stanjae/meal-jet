import { Menu, type FloatingPosition } from '@mantine/core';
import type { MJDropdownOption } from '@/lib/types';

type MJAvatarDropdownProps = {
  items: MJDropdownOption[];
  target?: React.ReactNode;
  position?: FloatingPosition;
  width?: number;
};

const MJDropdown = ({
  items,
  target,
  position = 'bottom-end',
  width = 200,
}: MJAvatarDropdownProps) => {
  return (
    <Menu position={position} shadow="md" width={width}>
      <Menu.Target>{target}</Menu.Target>

      <Menu.Dropdown>
        {items.map((item, index) => {
          const IconComponent = item.icon ?? undefined;
          if (item.type === 'divider') {
            return <Menu.Divider key={index} />;
          } else if (item.type === 'label') {
            return <Menu.Label key={index}>{item.label}</Menu.Label>;
          } else {
            return (
              <Menu.Item
                key={index}
                leftSection={IconComponent ? <IconComponent size={14} /> : null}
                color={item?.color}
                disabled={item?.disabled}
                onClick={item?.action}
              >
                {item.label}
              </Menu.Item>
            );
          }
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default MJDropdown;
