export type Callback = (...args: any[]) => any;

export type StoreAction<Actions, Store, Name extends keyof Actions, Result> = (
  state: Store,
  ...args: Actions[Name] extends Callback ? Parameters<Actions[Name]> : never[]
) => Result;
