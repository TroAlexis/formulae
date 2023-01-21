import { createSelector } from "reselect";

import { FormulasStore } from "./models";
import {
  checkIsFormulaComputable,
  checkIsFormulaOperator,
  getFormulasValue,
} from "./utils";

export const selectFormulas = (state: FormulasStore) => {
  return state.formulas;
};

export const selectAddFormula = (state: FormulasStore) => {
  return state.addFormula;
};

export const selectEditFormula = (state: FormulasStore) => {
  return state.editFormula;
};

export const selectFormulasResult = createSelector(
  [selectFormulas],
  (formulas) => {
    return getFormulasValue(formulas);
  }
);

export const selectLastFormula = createSelector(
  [selectFormulas],
  (formulas) => {
    const lastIndex = formulas.length - 1;
    return formulas[lastIndex];
  }
);

export const selectIsOperatorAddable = createSelector(
  [selectLastFormula],
  (formula) => {
    return formula && !checkIsFormulaOperator(formula);
  }
);

export const selectIsComputableAddable = createSelector(
  [selectLastFormula],
  (formula) => {
    return !checkIsFormulaComputable(formula);
  }
);
