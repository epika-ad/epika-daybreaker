import {
  Avatar,
  AvatarFallback,
  Bubble,
  BubbleContent,
  Message,
  MessageContent,
  MessageHeader,
} from "woozui";

export const Example = () => (
  <div className="flex w-full max-w-md flex-col gap-4">
    <Message>
      <Avatar size="sm">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <MessageContent>
        <MessageHeader>
          <strong>Ada</strong> · 9:41
        </MessageHeader>
        <Bubble>
          <BubbleContent>The build is green. Ready to ship?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <Avatar size="sm">
        <AvatarFallback>WZ</AvatarFallback>
      </Avatar>
      <MessageContent>
        <MessageHeader>
          <strong>You</strong> · 9:42
        </MessageHeader>
        <Bubble variant="default" align="end">
          <BubbleContent>Shipping now.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
);
