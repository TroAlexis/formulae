import { FormulaOperator } from "modules/formulas/models";

export type FormulaValueType = number;

export type OperatorOrderChecker = (operator: FormulaOperator) => boolean;
