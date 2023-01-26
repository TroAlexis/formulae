import { ShellStore } from "./models";

export const selectIsNavbarOpen = (state: ShellStore) => {
  return state.isNavBarOpen;
};

export const selectToggleNavbar = (state: ShellStore) => {
  return state.toggleNavbar;
};
