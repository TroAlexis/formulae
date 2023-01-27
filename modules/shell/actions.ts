import { createStoreMutationFactory } from "../utils/actions";
import { ShellActions, ShellStore } from "./models";

const createMutation = createStoreMutationFactory<ShellActions, ShellStore>();

export const toggleNavbar = createMutation("toggleNavbar")((state) => {
  state.isNavBarOpen = !state.isNavBarOpen;
});

export const toggleTheme = createMutation("toggleTheme")((state) => {
  const isLight = state.theme === "light";

  state.theme = isLight ? "dark" : "light";
});
