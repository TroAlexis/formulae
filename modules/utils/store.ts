import { useEffect, useState } from "react";
import { create } from "zustand";

export const createUseHydratedStore = <
  UseStore extends ReturnType<typeof create>,
  InitialState
>(
  useStoreHook: UseStore,
  initialState: InitialState
) =>
  (<U>(selector: (state: unknown) => U, equals?: (a: U, b: U) => boolean) => {
    const store = useStoreHook(selector, equals);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => setHydrated(true), []);

    return hydrated ? store : selector(initialState);
  }) as UseStore;
