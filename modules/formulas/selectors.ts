import { FormulaIndex } from "modules/formulas/types";
import { createStoreSelector } from "modules/utils/selectors";
import { createSelector } from "reselect";
import { getLast } from "utils/array";
import { TemporalState } from "zundo";

import { FormulasStore } from "./models";
import {
  checkIndexesEqual,
  checkIsFormulaComputable,
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
  getExpressionResult,
  getFormulaByIndex,
} from "./utils";

const createFormulasSelector = createStoreSelector<FormulasStore>();
const createFormulasTemporalSelector =
  createStoreSelector<TemporalState<FormulasStore>>();

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

export const selectRemoveFormula = createFormulasSelector("removeFormula");

export const selectToggleCollapseExpression = createFormulasSelector(
  "toggleCollapseExpression"
);

export const selectOpenExpression = createFormulasSelector("openExpression");

export const selectCloseExpression = createFormulasSelector("closeExpression");

export const selectReplaceExpression =
  createFormulasSelector("replaceExpression");

export const selectSetCurrentExpressionIndex = createFormulasSelector(
  "setCurrentExpressionIndex"
);

export const selectFormulasUndo = createFormulasTemporalSelector("undo");

export const selectFormulasRedo = createFormulasTemporalSelector("redo");

export const selectFormulasPastStates =
  createFormulasTemporalSelector("pastStates");

export const selectFormulasFutureStates =
  createFormulasTemporalSelector("futureStates");

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
    return checkIsFormulaComputable(lastValue);
  }
);

export const selectIsExpressionSelected = createSelector(
  [selectCurrentExpressionIndex, (_, index: FormulaIndex) => index],
  (currentIndex, index) => {
    return checkIndexesEqual(currentIndex, index);
  }
);

export const selectIsFormulaUndoable = createSelector(
  [selectFormulasPastStates],
  (pastStates) => !!pastStates.length
);

export const selectIsFormulaRedoable = createSelector(
  [selectFormulasFutureStates],
  (futureStates) => !!futureStates.length
);
