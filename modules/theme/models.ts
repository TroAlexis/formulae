import { ColorScheme } from "@mantine/core";

export interface CustomisationConfig {
  resultPrecision: number;
  valuePrecision: number;
}

export interface ThemeState {
  theme: ColorScheme;
  isConfigOpen: boolean;
  config: CustomisationConfig;
}

export interface ThemeActions {
  toggleTheme: () => void;
  toggleConfig: (value?: boolean) => void;
  closeConfig: () => void;
  editConfig: <T extends keyof CustomisationConfig>(
    property: T,
    value: CustomisationConfig[T]
  ) => void;
}

export interface ThemeStore extends ThemeState, ThemeActions {}
