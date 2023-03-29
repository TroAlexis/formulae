import { createUseHydratedStore } from "modules/utils/store";
import { DEFAULT_PRECISION } from "types/consts";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory, StoreSet } from "../utils/actions";
import { closeConfig, editConfig, toggleConfig, toggleTheme } from "./actions";
import { ThemeActions, ThemeState, ThemeStore } from "./models";

const initialState: ThemeState = {
  theme: "light",
  isConfigOpen: false,
  config: {
    valuePrecision: DEFAULT_PRECISION,
    resultPrecision: DEFAULT_PRECISION,
  },
};

export const createThemeStore = (set: StoreSet<ThemeStore>) => {
  const createShellAction = createStoreActionFactory<
    ThemeActions,
    ThemeStore
  >()(set);

  return {
    ...initialState,
    toggleTheme: createShellAction(toggleTheme),
    toggleConfig: createShellAction(toggleConfig),
    closeConfig: createShellAction(closeConfig),
    editConfig: createShellAction(editConfig),
  };
};

export const useThemeStoreHook = create<ThemeStore>()(
  devtools(persist(immer(createThemeStore), { name: "theme" }))
);

export const useThemeStore = createUseHydratedStore(
  useThemeStoreHook,
  initialState
);
