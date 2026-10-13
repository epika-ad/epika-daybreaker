import { AspectRatio } from "daybreaker";

export const Example = () => (
  <div className="flex w-full max-w-md items-end gap-3">
    <AspectRatio ratio={16 / 9} className="bg-accent">
      <span className="absolute inset-0 flex items-center justify-center text-foreground-dimmed text-sm">
        16 / 9
      </span>
    </AspectRatio>
    <AspectRatio ratio={1} className="w-32 shrink-0 bg-accent">
      <span className="absolute inset-0 flex items-center justify-center text-foreground-dimmed text-sm">
        1 / 1
      </span>
    </AspectRatio>
  </div>
);
