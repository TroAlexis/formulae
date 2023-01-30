import { createStoreSelector } from "../utils/selectors";
import { ThemeStore } from "./models";

const createThemeSelector = createStoreSelector<ThemeStore>();

export const selectTheme = createThemeSelector("theme");

export const selectToggleTheme = createThemeSelector("toggleTheme");
