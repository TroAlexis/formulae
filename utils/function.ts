import { Callback } from "modules/utils/types";

export const wrapFunctionCall =
  <T extends Callback>(fn: T) =>
  (): ReturnType<T> =>
    fn();
