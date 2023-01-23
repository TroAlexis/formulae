import { FormulaOperator } from "./models";

export type FormulaValueType = number;

export type FormulaIndex = number | number[];

export type OperatorOrderChecker = (operator: FormulaOperator) => boolean;
