import { useState } from "react";

export interface UseHandlerProcessProps<T, Args extends any[]> {
  handler: (...args: Args) => Promise<T> | T;
  timeout?: number;
}

export const useHandlerProcess = <T, Args extends any[]>({
  handler,
  timeout = 2000,
}: UseHandlerProcessProps<T, Args>) => {
  const [error, setError] = useState<unknown>();
  const [compeleted, setCompleted] = useState<boolean>(false);
  const [handlerTimeout, setHandlerTimeout] = useState<NodeJS.Timeout>();

  const handleResult = (value: boolean) => {
    clearTimeout(handlerTimeout);
    setHandlerTimeout(setTimeout(() => setCompleted(false), timeout));
    setCompleted(value);
  };

  const handle = async (...args: Parameters<typeof handler>) => {
    try {
      if (compeleted) {
        return;
      }

      const result = await handler(...args);

      handleResult(true);

      return result;
    } catch (e) {
      return setError(e);
    }
  };

  const reset = () => {
    setCompleted(false);
    setError(undefined);
    clearTimeout(handlerTimeout);
  };

  return { handle, reset, error, compeleted };
};
