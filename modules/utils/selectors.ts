import { StoreApi, UseBoundStore } from "zustand";

export const createStoreSelector =
  <Store>(_store?: Store) =>
  <Property extends keyof Part, Part = Store>(property: Property) =>
  (state: Part) => {
    return state[property];
  };

export type Selectors<S> = {
  [Key in keyof S]: (state: S) => S[Key];
};

export const createSelectors = <State extends object>(
  store: UseBoundStore<StoreApi<State>>
): Selectors<State> => {
  const state = store.getState();
  const createSelector = createStoreSelector<State>();

  return Object.keys(state).reduce<Selectors<State>>((selectors, k) => {
    const key = k as keyof State;
    selectors[key] = createSelector(key);

    return selectors;
  }, {} as any);
};
