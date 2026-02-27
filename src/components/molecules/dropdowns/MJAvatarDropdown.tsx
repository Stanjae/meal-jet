import { Avatar, Menu } from '@mantine/core';
import type { MJDropdownOption } from '@/lib/types';

type MJAvatarDropdownProps = {
  name: string;
  items: MJDropdownOption[];
};

const MJAvatarDropdown = ({ name, items }: MJAvatarDropdownProps) => {
  return (
    <Menu position="bottom-end" shadow="md" width={200}>
      <Menu.Target>
        <Avatar name={name} color="initials" />
      </Menu.Target>

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

export default MJAvatarDropdown;
