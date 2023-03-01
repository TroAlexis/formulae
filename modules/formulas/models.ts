import {
  Formula,
  FormulaExpression,
  FormulaSlice,
  FormulasMapActions,
  FormulasMapState,
} from "modules/formula/models";
import { Maybe } from "types/types";

export interface FormulasState {
  rootExpressionId: string;
  selectedExpressionId: Maybe<string>;
}

export interface FormulasActions extends FormulasMapActions {
  addFormula: (formula: Formula) => void;
  removeFormula: (id: string) => void;
  toggleCollapseExpression: (id: string, value?: boolean) => void;
  openExpression: () => void;
  closeExpression: () => void;
  replaceExpression: (
    replaceExpression: Maybe<FormulaExpression>,
    replacerSlice: FormulaSlice
  ) => void;
  setSelectedExpressionId: (id: Maybe<string>) => void;
}

export interface FormulasStore
  extends FormulasState,
    FormulasMapState,
    FormulasActions {}
