import { createStoreMutationFactory } from "../utils/actions";
import { ShellActions, ShellStore } from "./models";

const createMutation = createStoreMutationFactory<ShellActions, ShellStore>();

export const toggleNavbar = createMutation("toggleNavbar")((state) => {
  state.isNavBarOpen = !state.isNavBarOpen;
});
