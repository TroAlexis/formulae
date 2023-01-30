import { createStoreMutationFactory } from "../utils/actions";
import { ThemeActions, ThemeStore } from "./models";

const createMutation = createStoreMutationFactory<ThemeActions, ThemeStore>();

export const toggleTheme = createMutation("toggleTheme")((state) => {
  const isLight = state.theme === "light";

  state.theme = isLight ? "dark" : "light";
});
