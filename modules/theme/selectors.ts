import { createSelector } from "reselect";

import { createStoreSelector } from "../utils/selectors";
import { ThemeStore } from "./models";

const createThemeSelector = createStoreSelector<ThemeStore>();

export const selectTheme = createThemeSelector("theme");

export const selectIsConfigOpen = createThemeSelector("isConfigOpen");

export const selectToggleTheme = createThemeSelector("toggleTheme");

export const selectToggleConfig = createThemeSelector("toggleConfig");

export const selectCloseConfig = createThemeSelector("closeConfig");

export const selectConfig = createThemeSelector("config");

export const selectEditConfig = createThemeSelector("editConfig");

export const selectResultPrecision = createSelector(
  [selectConfig],
  createThemeSelector("resultPrecision")
);

export const selectValuePrecision = createSelector(
  [selectConfig],
  createThemeSelector("valuePrecision")
);
