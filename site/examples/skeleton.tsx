import { Skeleton } from "daybreaker";

export const Example = () => (
  <div className="flex w-56 items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="grid flex-1 gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);
