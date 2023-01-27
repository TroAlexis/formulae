import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory } from "../utils/actions";
import { toggleNavbar, toggleTheme } from "./actions";
import { ShellActions, ShellState, ShellStore } from "./models";

const initialState: ShellState = {
  isNavBarOpen: false,
  theme: "light",
};

export const useShellStore = create<ShellStore>()(
  devtools(
    immer((set) => {
      const createShellAction = createStoreActionFactory<
        ShellActions,
        ShellStore
      >()(set);

      return {
        ...initialState,
        toggleNavbar: createShellAction(toggleNavbar),
        toggleTheme: createShellAction(toggleTheme),
      };
    })
  )
);
