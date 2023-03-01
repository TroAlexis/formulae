import { FormulaOperatorType, FormulaType } from "modules/formulas/enums";
import { FormulaValueType } from "modules/formulas/types";

export type FormulasMap = Record<string, Formula>;

export interface FormulasMapState {
  map: FormulasMap;
}

export interface FormulasMapActions {
  addFormulaToMap: (formula: Formula) => void;
  editFormulaInMap: (id: string, formula: Partial<Formula>) => void;
  deleteFormulaFromMap: (id: string) => void;
  clearFormulaMap: () => void;
}

export type FormulasMapStore = FormulasMapState & FormulasMapActions;

export interface FormulaBase {
  id: string;
  parentId?: string;
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
  value: string[];
}

export type FormulaSlice = {
  id: string;
  map: FormulasMap;
};

export type Formula = FormulaValue | FormulaOperator | FormulaExpression;
export type FormulaComputable = Exclude<Formula, FormulaOperator>;
export type FormulaByType = {
  [FormulaType.EXPRESSION]: FormulaExpression;
  [FormulaType.VALUE]: FormulaValue;
  [FormulaType.OPERATOR]: FormulaOperator;
};

export interface Operator {
  label: string;
  computer: (a: FormulaValue, b: FormulaValue) => FormulaValue;
}
