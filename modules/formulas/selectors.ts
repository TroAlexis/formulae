import { createSelector } from "reselect";

import { FormulasStore } from "./models";
import { FormulaIndex } from "./types";
import {
  checkIsFormulaComputable,
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
  getExpressionResult,
  getFormulaByIndex,
} from "./utils";

/* Basic */

export const selectRootExpression = (state: FormulasStore) => {
  return state.formulas;
};

export const selectCurrentExpressionIndex = (state: FormulasStore) =>
  state.currentExpressionIndex;

export const selectFormulas = createSelector(
  [selectRootExpression],
  (expression) => expression.value
);

export const selectFormulaByIndex = createSelector(
  [selectFormulas, (_, index: FormulaIndex) => index],
  (formulas, index) => getFormulaByIndex(formulas, index)
);

/* Actions */

export const selectAddFormula = (state: FormulasStore) => {
  return state.addFormula;
};

export const selectEditFormula = (state: FormulasStore) => {
  return state.editFormula;
};

/* Computed */

export const selectCurrentExpression = createSelector(
  [selectFormulas, selectCurrentExpressionIndex],
  (formulas, currentExpressionIndex) => {
    const isDefinedIndex = currentExpressionIndex !== undefined;
    if (isDefinedIndex) {
      const formula = getFormulaByIndex(formulas, currentExpressionIndex);

      if (checkIsFormulaExpression(formula)) {
        return formula;
      }
    }

    return undefined;
  }
);

export const selectActiveExpression = (state: FormulasStore) => {
  return selectCurrentExpression(state) || selectRootExpression(state);
};

export const selectFormulasResult = createSelector(
  [selectRootExpression],
  (expression) => {
    return getExpressionResult(expression);
  }
);

export const selectLastFormula = createSelector(
  [selectActiveExpression],
  (currentExpression) => {
    const { value: formulas } = currentExpression;
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

export const selectIsExpressionOpenable = createSelector(
  [selectCurrentExpression, selectLastFormula],
  (expression, formula) => {
    return (
      !expression &&
      (checkIsFormulaValue(formula) || checkIsFormulaOperator(formula))
    );
  }
);

export const selectIsExpressionCloseable = createSelector(
  [selectCurrentExpression],
  (expression) => {
    if (!expression) {
      return false;
    }

    const lastValue = expression.value[expression.value.length - 1];
    return checkIsFormulaValue(lastValue);
  }
);
