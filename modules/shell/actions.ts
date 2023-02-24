import { createStoreMutationFactory } from "../utils/actions";
import { ShellActions, ShellStore } from "./models";

const createMutation = createStoreMutationFactory<ShellActions, ShellStore>();

export const toggleNavbar = createMutation("toggleNavbar")((state, value) => {
  state.isNavBarOpen = value ?? !state.isNavBarOpen;
});

export const closeNavbar = createMutation("closeNavbar")((state) =>
  toggleNavbar(state, false)
);
