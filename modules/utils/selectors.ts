export const createStoreSelector =
  <Store>() =>
  <Property extends keyof Part, Part = Store>(property: Property) =>
  (state: Part) => {
    return state[property];
  };
