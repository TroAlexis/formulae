import { useHydrated } from "hooks/useHydrated";
import { TemporalState } from "zundo";
import { create, StoreApi, useStore } from "zustand";

/**
 * Persisted store creates client-server mismatch,
 * this hook allows to hydrate storage right after the render
 */
export const createUseHydratedStore = <
  UseStore extends ReturnType<typeof create>,
  InitialState
>(
  useStoreHook: UseStore,
  initialState: InitialState
) =>
  (<U>(selector: (state: unknown) => U, equals?: (a: U, b: U) => boolean) => {
    const store = useStoreHook(selector, equals);
    const [hydrated] = useHydrated();

    return hydrated ? store : selector(initialState);
  }) as UseStore;

/**
 * https://github.com/charkour/zundo#convert-to-react-store
 */
export const createUseTemporalStore =
  <S>(store: StoreApi<TemporalState<S>>) =>
  <T>(
    selector: (state: TemporalState<S>) => T,
    equality?: (a: T, b: T) => boolean
  ) =>
    useStore(store, selector, equality);
