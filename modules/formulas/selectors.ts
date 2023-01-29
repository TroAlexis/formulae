import { createStoreSelector } from "modules/utils/selectors";
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

const createFormulasSelector = createStoreSelector<FormulasStore>();

/* Basic */

export const selectRootExpression = createFormulasSelector("formulas");

export const selectCurrentExpressionIndex = createFormulasSelector(
  "currentExpressionIndex"
);

export const selectFormulas = createSelector(
  [selectRootExpression],
  createFormulasSelector("value")
);

/* Actions */

export const selectAddFormula = createFormulasSelector("addFormula");

export const selectEditFormula = createFormulasSelector("editFormula");

export const selectOpenExpression = createFormulasSelector("openExpression");

export const selectCloseExpression = createFormulasSelector("closeExpression");

export const selectReplaceExpression =
  createFormulasSelector("replaceExpression");

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
