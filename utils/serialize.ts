export const parse = <T>(data: string): T => {
  const decoded = atob(data);

  return JSON.parse(decoded) as T;
};

export const serialize = <T>(data: T) => {
  const stringified = JSON.stringify(data);

  return btoa(stringified);
};
