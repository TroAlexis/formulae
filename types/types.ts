export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type OmitFirst<T extends unknown[]> = T extends [unknown, ...infer U]
  ? U
  : never;

export type Maybe<T> = T | undefined;
