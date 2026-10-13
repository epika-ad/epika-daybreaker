import {
  Bubble,
  BubbleContent,
  Button,
  Marker,
  MarkerContent,
  MessageScroller,
} from "daybreaker";
import { useState } from "react";

const replies = [
  "On it.",
  "Pushed a fix for the tab pill.",
  "The spring is one token now.",
  "Docs are updated too.",
  "Anything else before we ship?",
] as const;

export const Example = () => {
  const [count, setCount] = useState(6);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <MessageScroller className="h-64 rounded-surface bg-background-dimmed">
        <Marker variant="separator">
          <MarkerContent>Today</MarkerContent>
        </Marker>
        {Array.from({ length: count }, (_, index) => (
          <Bubble
            // biome-ignore lint/suspicious/noArrayIndexKey: messages are only ever appended
            key={index}
            variant={index % 2 ? "default" : "secondary"}
            align={index % 2 ? "end" : "start"}
          >
            <BubbleContent>{replies[index % replies.length]}</BubbleContent>
          </Bubble>
        ))}
      </MessageScroller>
      <Button variant="outline" onClick={() => setCount(count + 1)}>
        Receive a message
      </Button>
    </div>
  );
};
