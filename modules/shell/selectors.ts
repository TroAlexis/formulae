import { createStoreSelector } from "../utils/selectors";
import { ShellStore } from "./models";

const createShellSelector = createStoreSelector<ShellStore>();

export const selectIsNavbarOpen = createShellSelector("isNavBarOpen");

export const selectToggleNavbar = createShellSelector("toggleNavbar");
