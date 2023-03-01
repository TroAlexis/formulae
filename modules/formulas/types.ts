import { FormulaOperator } from "modules/formula/models";

export type FormulaValueType = number;

export type OperatorOrderChecker = (operator: FormulaOperator) => boolean;
