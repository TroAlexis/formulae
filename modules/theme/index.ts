import { createUseHydratedStore } from "modules/utils/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory } from "../utils/actions";
import { toggleTheme } from "./actions";
import { ThemeActions, ThemeState, ThemeStore } from "./models";

const initialState: ThemeState = {
  theme: "light",
};

const useThemeStoreHook = create<ThemeStore>()(
  devtools(
    persist(
      immer((set) => {
        const createShellAction = createStoreActionFactory<
          ThemeActions,
          ThemeStore
        >()(set);

        return {
          ...initialState,
          toggleTheme: createShellAction(toggleTheme),
        };
      }),
      { name: "theme" }
    )
  )
);

export const useThemeStore = createUseHydratedStore(
  useThemeStoreHook,
  initialState
);
