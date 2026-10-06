import {
  Button,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
  InboxIcon,
} from "woozui";

export const Example = () => (
  <Empty className="max-w-sm">
    <EmptyMedia>
      <InboxIcon />
    </EmptyMedia>
    <EmptyTitle>No messages yet</EmptyTitle>
    <EmptyDescription>
      When someone writes to you, their message will show up here.
    </EmptyDescription>
    <EmptyActions>
      <Button>New message</Button>
      <Button variant="ghost">Import</Button>
    </EmptyActions>
  </Empty>
);
