import { FormulaOperatorType, FormulaType } from "modules/formulas/enums";
import { FormulaValueType } from "modules/formulas/types";
import { MapState } from "modules/map/models";
import { Maybe } from "types/types";

export type FormulaMapState = MapState<string, Formula>;

export type FormulaMap = FormulaMapState["map"];

export interface FormulasState extends FormulaMapState {
  rootExpressionId: string;
  selectedExpressionId: Maybe<string>;
}

export interface FormulasActions {
  addFormula: (formula: Formula) => void;
  editFormula: (id: string, formula: Partial<Formula>) => void;
  removeFormula: (id: string) => void;
  toggleCollapseExpression: (id: string, value?: boolean) => void;
  openExpression: () => void;
  closeExpression: () => void;
  replaceExpression: (
    replaceExpression: Maybe<string>,
    replacerSlice: FormulaSlice
  ) => void;
  setSelectedExpressionId: (id: Maybe<string>) => void;
}

export interface FormulasStore extends FormulasState, FormulasActions {}

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

export type FormulaSlice<T extends Formula = Formula> = {
  id: string;
  map: Record<string, T>;
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
