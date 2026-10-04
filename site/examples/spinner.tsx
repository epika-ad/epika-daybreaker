import { Spinner } from "woozui";

export const Example = () => (
  <div className="flex items-center gap-4">
    <Spinner className="size-4" />
    <Spinner />
    <Spinner className="size-8" />
  </div>
);
