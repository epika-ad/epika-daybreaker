import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "../icons";
import { type ClassList, cn } from "../utils";
import { focusRing, glass } from "../utils/styles";

/**
 * Returns the toast manager. Call `add({ title, description, type })` to show
 * a toast; `type` may be "success", "error", "warning" or "info".
 */
export const useToast = ToastPrimitive.useToastManager;

const ToastIcon = ({ type }: { type?: string }) => {
  switch (type) {
    case "success":
      return <CircleCheckIcon className="mt-0.5 text-success" />;
    case "error":
      return <CircleXIcon className="mt-0.5 text-error" />;
    case "warning":
      return <TriangleAlertIcon className="mt-0.5 text-warning" />;
    case "info":
      return <InfoIcon className="mt-0.5 text-primary" />;
    default:
      return null;
  }
};

const ToastList = ({ classList }: Pick<ToastProvider.Props, "classList">) => {
  const { toasts } = useToast();

  return toasts.map((toast) => (
    <ToastPrimitive.Root
      key={toast.id}
      toast={toast}
      className={cn(
        glass,
        "relative flex w-full translate-x-(--toast-swipe-movement-x) translate-y-(--toast-swipe-movement-y) items-start gap-3 rounded-surface p-4 transition-[opacity,translate] duration-200 data-ending-style:translate-x-full data-starting-style:translate-y-2 data-ending-style:opacity-0 data-starting-style:opacity-0",
        classList?.toast,
      )}
    >
      <ToastIcon type={toast.type} />
      <div className="grid flex-1 gap-1">
        <ToastPrimitive.Title
          className={cn("font-medium text-sm", classList?.title)}
        />
        <ToastPrimitive.Description
          className={cn(
            "text-foreground-dimmed text-sm",
            classList?.description,
          )}
        />
      </div>
      <ToastPrimitive.Close
        aria-label="Close"
        className={cn(
          "cursor-pointer rounded-full p-1 text-foreground-dimmed transition-colors hover:bg-accent hover:text-foreground",
          focusRing,
        )}
      >
        <XIcon />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  ));
};

/** Wrap the app once; toasts render in the bottom-right corner. */
export const ToastProvider = ({
  children,
  classList,
  ...props
}: ToastProvider.Props) => (
  <ToastPrimitive.Provider {...props}>
    {children}
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        className={cn(
          "fixed right-4 bottom-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 outline-none",
          classList?.viewport,
        )}
      >
        <ToastList classList={classList} />
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  </ToastPrimitive.Provider>
);
export namespace ToastProvider {
  export type Props = ToastPrimitive.Provider.Props & {
    classList?: ClassList<"viewport" | "toast" | "title" | "description">;
  };
}
