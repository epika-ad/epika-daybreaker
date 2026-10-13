import {
  BellIcon,
  ChevronRightIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Switch,
  UserIcon,
} from "daybreaker";

export const Example = () => (
  <ItemGroup className="max-w-sm">
    <Item>
      <ItemMedia>
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Account</ItemTitle>
        <ItemDescription>Name, email and password</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon className="text-foreground-dimmed" />
      </ItemActions>
    </Item>
    <Item>
      <ItemMedia className="bg-error">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Banners, sounds and badges</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Switch defaultChecked aria-label="Notifications" />
      </ItemActions>
    </Item>
  </ItemGroup>
);
