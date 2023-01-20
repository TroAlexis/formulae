import { FormulaType } from "./enums";
import { FormulaValueType } from "./types";

export interface FormulasState {
  formulas: Formula[];
}

export interface FormulasStore extends FormulasState {
  addFormula: (formula: Formula) => void;
}

export interface FormulaBase {
  id: string;
}

export interface FormulaComputableBase extends FormulaBase {
  name?: string;
}

export interface FormulaValue extends FormulaComputableBase {
  type: FormulaType.VALUE;
  value: FormulaValueType;
}

export interface FormulaOperator extends FormulaBase {
  type: FormulaType.OPERATOR;
  value: (a: FormulaValue, b: FormulaValue) => FormulaValue;
  label: string;
}

export interface FormulaExpression extends FormulaComputableBase {
  type: FormulaType.EXPRESSION;
  value: Formula[];
}

export type Formula = FormulaValue | FormulaOperator | FormulaExpression;

export type FormulaComputable = Exclude<Formula, FormulaOperator>;
