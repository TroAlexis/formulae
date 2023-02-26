export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type OmitFirst<T> = T extends [x: any, ...rest: infer P] ? P : never;

export type Maybe<T> = T | undefined;
