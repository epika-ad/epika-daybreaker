import { createContext as createReactContext, useContext } from "react";

/**
 * Creates a context whose hook throws a descriptive error when it is used
 * outside of its provider. Returns `[Context, useContextHook]`.
 */
export const createContext = <Value>({
  name,
  error = `use${name} must be used within a ${name}Provider`,
}: {
  name: string;
  error?: string;
}) => {
  const Context = createReactContext<Value | undefined>(undefined);
  Context.displayName = name;

  const useValue = () => {
    const value = useContext(Context);
    if (value === undefined) throw new Error(error);
    return value;
  };

  return [Context, useValue] as const;
};
