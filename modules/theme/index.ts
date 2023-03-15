import { createUseHydratedStore } from "modules/utils/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory, StoreSet } from "../utils/actions";
import { toggleTheme } from "./actions";
import { ThemeActions, ThemeState, ThemeStore } from "./models";

const initialState: ThemeState = {
  theme: "light",
};

export const createThemeStore = (set: StoreSet<ThemeStore>) => {
  const createShellAction = createStoreActionFactory<
    ThemeActions,
    ThemeStore
  >()(set);

  return {
    ...initialState,
    toggleTheme: createShellAction(toggleTheme),
  };
};

export const useThemeStoreHook = create<ThemeStore>()(
  devtools(persist(immer(createThemeStore), { name: "theme" }))
);

export const useThemeStore = createUseHydratedStore(
  useThemeStoreHook,
  initialState
);
