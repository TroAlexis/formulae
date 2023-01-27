import { ColorScheme } from "@mantine/core";

export interface ShellState {
  isNavBarOpen: boolean;
  theme: ColorScheme;
}

export interface ShellActions {
  toggleNavbar: () => void;
  toggleTheme: () => void;
}

export interface ShellStore extends ShellState, ShellActions {}
