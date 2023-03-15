import { selectConfig } from "modules/theme/selectors";

import { createStoreMutationFactory } from "../utils/actions";
import { CustomisationConfig, ThemeActions, ThemeStore } from "./models";

const createMutation = createStoreMutationFactory<ThemeActions, ThemeStore>();

export const toggleTheme = createMutation("toggleTheme")((state) => {
  const isLight = state.theme === "light";

  state.theme = isLight ? "dark" : "light";
});

export const toggleConfig = createMutation("toggleConfig")((state, value) => {
  state.isConfigOpen = value ?? !state.isConfigOpen;
});

export const closeConfig = createMutation("closeConfig")((state) =>
  toggleConfig(state, false)
);

export const editConfig = createMutation("editConfig")(
  <T extends keyof CustomisationConfig>(
    state: ThemeStore,
    key: T,
    value: CustomisationConfig[T]
  ) => {
    const config = selectConfig(state);

    config[key] = value;
  }
);
