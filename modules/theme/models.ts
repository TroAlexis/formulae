import { ColorScheme } from "@mantine/core";

export interface ThemeState {
  theme: ColorScheme;
}

export interface ThemeActions {
  toggleTheme: () => void;
}

export interface ThemeStore extends ThemeState, ThemeActions {}
