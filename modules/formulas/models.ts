import { PartialBy } from "../../types/types";
import { FormulaType } from "./enums";
import { FormulaIndex, FormulaValueType } from "./types";

export interface FormulasState {
  formulas: FormulaExpression;
  currentExpressionIndex?: FormulaIndex;
}

export interface FormulasStore extends FormulasState {
  addFormula: (formula: PartialBy<Formula, "id">) => void;
  editFormula: (index: FormulaIndex, formula: Partial<Formula>) => void;
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
  computer: (a: FormulaValue, b: FormulaValue) => FormulaValue;
  label: string;
}

export interface FormulaExpression extends FormulaComputableBase {
  type: FormulaType.EXPRESSION;
  value: Formula[];
}

export type Formula = FormulaValue | FormulaOperator | FormulaExpression;

export type FormulaComputable = Exclude<Formula, FormulaOperator>;
