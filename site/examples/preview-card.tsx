import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "daybreaker";

export const Example = () => (
  <p className="text-sm">
    Built by{" "}
    <PreviewCard>
      <PreviewCardTrigger href="https://github.com/wooz-05">
        @wooz-05
      </PreviewCardTrigger>
      <PreviewCardPopup>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/wooz-05.png" alt="" />
            <AvatarFallback>WZ</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">wooz-05</p>
            <p className="text-foreground-dimmed">github.com/wooz-05</p>
          </div>
        </div>
        <p className="text-foreground-dimmed">
          Maintains daybreaker, a set of accessible React components.
        </p>
      </PreviewCardPopup>
    </PreviewCard>
    .
  </p>
);
