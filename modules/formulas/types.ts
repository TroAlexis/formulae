import { FormulaOperator, FormulasActions, FormulasStore } from "./models";

export type FormulaValueType = number;

export type FormulaIndex = number | number[];

export type OperatorOrderChecker = (operator: FormulaOperator) => boolean;

export type StoreAction<T extends keyof FormulasActions, R> = (
  state: FormulasStore,
  ...args: Parameters<FormulasActions[T]>
) => R;
