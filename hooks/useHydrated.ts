import { useEffect, useState } from "react";

export const useHydrated = () => {
  const state = useState(false);
  const [, setHydrated] = state;

  useEffect(() => setHydrated(true), [setHydrated]);

  return state;
};
