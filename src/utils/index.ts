import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export { cva, type VariantProps } from "class-variance-authority";

const merge = extendTailwindMerge({
  extend: { theme: { radius: ["control", "item", "surface"] } },
});

/** Joins class names and resolves conflicting Tailwind utilities. */
export const cn = (...inputs: ClassValue[]) => merge(clsx(inputs));

/** Type of a `classList` prop: targeted class names for sub-elements. */
export type ClassList<Key extends string> = Partial<Record<Key, string>>;

/** Narrows a primitive's `className` to a plain string so it can be merged. */
export type Styled<Props> = Omit<Props, "className"> & { className?: string };

export type Result<Data, Failure = Error> =
  | { success: true; data: Data }
  | { success: false; error: Failure };

export const resultify = <Data>(action: () => Data): Result<Data> => {
  try {
    return { success: true, data: action() };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
};
