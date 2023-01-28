import { createSelector } from "reselect";
import { getLast } from "utils/array";

import { FormulasStore } from "./models";
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

/* Actions */

export const selectAddFormula = (state: FormulasStore) => {
  return state.addFormula;
};

export const selectEditFormula = (state: FormulasStore) => {
  return state.editFormula;
};

export const selectOpenExpression = (state: FormulasStore) => {
  return state.openExpression;
};

export const selectCloseExpression = (state: FormulasStore) => {
  return state.closeExpression;
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
  (activeExpression) => {
    const { value: formulas } = activeExpression;
    return getLast(formulas);
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
  [selectLastFormula],
  (formula) => {
    return checkIsFormulaValue(formula) || checkIsFormulaOperator(formula);
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
