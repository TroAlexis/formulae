export const createStoreSelector =
  <Store>() =>
  <Property extends keyof Store>(property: Property) =>
  (state: Store) => {
    return state[property];
  };
