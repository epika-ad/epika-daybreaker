import { useState } from "react";
import {
  BellIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  UserIcon,
} from "daybreaker";

const workspace = [
  { name: "Home", icon: HomeIcon },
  { name: "Inbox", icon: InboxIcon },
  { name: "Search", icon: SearchIcon },
] as const;

const account = [
  { name: "Profile", icon: UserIcon },
  { name: "Notifications", icon: BellIcon },
] as const;

export const Example = () => {
  const [current, setCurrent] = useState<string>("Home");

  const items = (list: typeof workspace | typeof account) =>
    list.map(({ name, icon: Icon }) => (
      <SidebarItem
        key={name}
        current={name === current}
        onClick={() => setCurrent(name)}
      >
        <Icon />
        {name}
      </SidebarItem>
    ));

  return (
    <Sidebar>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        {items(workspace)}
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        {items(account)}
      </SidebarGroup>
    </Sidebar>
  );
};
