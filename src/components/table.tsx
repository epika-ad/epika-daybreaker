import type { ComponentProps } from "react";
import { type ClassList, cn } from "../utils";

export const Table = ({ className, classList, ...props }: Table.Props) => (
  <div
    className={cn(
      "w-full overflow-x-auto rounded-control border border-border",
      classList?.container,
    )}
  >
    <table
      className={cn(
        "w-full caption-bottom text-left text-sm",
        className,
        classList?.table,
      )}
      {...props}
    />
  </div>
);
export namespace Table {
  export type Props = ComponentProps<"table"> & {
    classList?: ClassList<"container" | "table">;
  };
}

export const TableHeader = ({ className, ...props }: TableHeader.Props) => (
  <thead className={cn("bg-background-dimmed", className)} {...props} />
);
export namespace TableHeader {
  export type Props = ComponentProps<"thead">;
}

export const TableBody = ({ className, ...props }: TableBody.Props) => (
  <tbody className={cn("[&>tr:last-child]:border-0", className)} {...props} />
);
export namespace TableBody {
  export type Props = ComponentProps<"tbody">;
}

export const TableRow = ({ className, ...props }: TableRow.Props) => (
  <tr
    className={cn(
      "border-border border-b transition-colors hover:bg-background-dimmed",
      className,
    )}
    {...props}
  />
);
export namespace TableRow {
  export type Props = ComponentProps<"tr">;
}

export const TableHead = ({ className, ...props }: TableHead.Props) => (
  <th
    className={cn(
      "h-10 px-4 font-medium text-foreground-dimmed text-xs",
      className,
    )}
    {...props}
  />
);
export namespace TableHead {
  export type Props = ComponentProps<"th">;
}

export const TableCell = ({ className, ...props }: TableCell.Props) => (
  <td className={cn("px-4 py-3", className)} {...props} />
);
export namespace TableCell {
  export type Props = ComponentProps<"td">;
}

export const TableCaption = ({ className, ...props }: TableCaption.Props) => (
  <caption
    className={cn("py-3 text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
export namespace TableCaption {
  export type Props = ComponentProps<"caption">;
}
