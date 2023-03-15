import { useCallback } from "react";

export const useSelectorWithArguments = <T, U, Args extends any[]>(
  selector: (state: T, ...args: Args) => U,
  ...args: Args
) => {
  return useCallback((state: T) => selector(state, ...args), [selector, args]);
};
