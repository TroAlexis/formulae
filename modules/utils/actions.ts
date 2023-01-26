import { OmitFirst } from "../../types/types";
import { StoreAction } from "./types";

// Use _name for better auto-completion
export const createStoreMutationFactory =
  <Actions, Store>() =>
  <Name extends keyof Actions>(_name: Name) =>
  <R>(action: StoreAction<Actions, Store, Name, R>) =>
    action;

// Use _name for better auto-completion
export const createStoreActionFactory =
  <Actions, Store>() =>
  <Set extends (fn: (state: Store) => void) => void>(set: Set) =>
  <Name extends keyof Actions, R>(
    action: StoreAction<Actions, Store, Name, R>
  ) =>
  (...args: OmitFirst<Parameters<typeof action>>) =>
    set((state) => action(state, ...args));
