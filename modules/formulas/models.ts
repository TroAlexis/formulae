import { FormulaOperatorType, FormulaType } from "./enums";
import { FormulaIndex, FormulaValueType } from "./types";

export interface FormulasState {
  formulas: FormulaExpression;
  currentExpressionIndex: number[];
}

export interface FormulasActions {
  addFormula: (formula: Formula) => void;
  editFormula: (index: FormulaIndex, formula: Partial<Formula>) => void;
  removeFormula: (index: FormulaIndex) => void;
  toggleCollapseExpression: (index: FormulaIndex, value?: boolean) => void;
  openExpression: () => void;
  closeExpression: () => void;
  replaceExpression: (
    expression: FormulaExpression,
    index?: FormulaIndex
  ) => void;
  pushCurrentExpressionIndex: (index: number) => void;
  setCurrentExpressionIndex: (index: FormulaIndex) => void;
}

export interface FormulasStore extends FormulasState, FormulasActions {}

export interface FormulaBase {
  id: string;
}

export interface FormulaComputableBase extends FormulaBase {
  name?: string;
  description?: string;
}

export interface FormulaValue extends FormulaComputableBase {
  type: FormulaType.VALUE;
  value: FormulaValueType;
}

export interface FormulaOperator extends FormulaBase {
  type: FormulaType.OPERATOR;
  value: FormulaOperatorType;
}

export interface FormulaExpressionOptions {
  collapsed?: boolean;
}

export interface FormulaExpression
  extends FormulaComputableBase,
    FormulaExpressionOptions {
  type: FormulaType.EXPRESSION;
  value: Formula[];
}

export type Formula = FormulaValue | FormulaOperator | FormulaExpression;

export type FormulaComputable = Exclude<Formula, FormulaOperator>;

export interface Operator {
  label: string;
  computer: (a: FormulaValue, b: FormulaValue) => FormulaValue;
}
