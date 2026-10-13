import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "daybreaker";

const variants = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const;

export const Example = () => (
  <div className="grid w-full max-w-md gap-6">
    <div className="flex flex-col gap-3">
      <Bubble>
        <BubbleContent>Are we still on for the design review?</BubbleContent>
        <BubbleReactions>
          <span>👍</span>
          <span>2</span>
        </BubbleReactions>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="default" align="end">
          <BubbleContent>Yes, 3pm works.</BubbleContent>
        </Bubble>
        <Bubble variant="default" align="end">
          <BubbleContent>I'll bring the new menu animations.</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Bubble key={variant} variant={variant} className="max-w-none">
          <BubbleContent className="capitalize">{variant}</BubbleContent>
        </Bubble>
      ))}
    </div>
  </div>
);
