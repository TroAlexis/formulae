import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory } from "../utils/actions";
import { toggleNavbar } from "./actions";
import { ShellActions, ShellState, ShellStore } from "./models";

const initialState: ShellState = {
  isNavBarOpen: false,
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
      };
    })
  )
);
