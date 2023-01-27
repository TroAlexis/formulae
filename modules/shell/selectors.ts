import { createStoreSelector } from "../utils/selectors";
import { ShellStore } from "./models";

const createShellSelector = createStoreSelector<ShellStore>();

export const selectIsNavbarOpen = createShellSelector("isNavBarOpen");

export const selectTheme = createShellSelector("theme");

export const selectToggleNavbar = createShellSelector("toggleNavbar");

export const selectToggleTheme = createShellSelector("toggleTheme");
