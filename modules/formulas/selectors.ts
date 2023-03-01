import { FormulaExpression } from "modules/formula/models";
import { selectFormulasMap } from "modules/formula/selectors";
import {
  checkIsFormulaComputable,
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
} from "modules/formulas/utils/check";
import { getExpressionResult } from "modules/formulas/utils/compute";
import { createStoreSelector } from "modules/utils/selectors";
import { createSelector } from "reselect";
import { getLast } from "utils/array";
import { getMapItem } from "utils/map";
import { TemporalState } from "zundo";

import { FormulasStore } from "./models";

const createFormulasSelector = createStoreSelector<FormulasStore>();
const createFormulasTemporalSelector =
  createStoreSelector<TemporalState<FormulasStore>>();

export const selectRootExpressionId =
  createFormulasSelector("rootExpressionId");

export const selectRootExpression = createSelector(
  [selectFormulasMap, selectRootExpressionId],
  (formulasMap, rootExpressionId) =>
    getMapItem(rootExpressionId, formulasMap) as FormulaExpression
);

export const selectRootExpressionFormulas = createSelector(
  [selectRootExpression],
  createFormulasSelector("value")
);

export const selectSelectedExpressionId = createFormulasSelector(
  "selectedExpressionId"
);

/* Actions */

export const selectAddFormula = createFormulasSelector("addFormula");

export const selectEditFormula = createFormulasSelector("editFormulaInMap");

export const selectRemoveFormula = createFormulasSelector("removeFormula");

export const selectToggleCollapseExpression = createFormulasSelector(
  "toggleCollapseExpression"
);

export const selectOpenExpression = createFormulasSelector("openExpression");

export const selectCloseExpression = createFormulasSelector("closeExpression");

export const selectReplaceExpression =
  createFormulasSelector("replaceExpression");

export const selectSetSelectedExpressionId = createFormulasSelector(
  "setSelectedExpressionId"
);

export const selectFormulasUndo = createFormulasTemporalSelector("undo");

export const selectFormulasRedo = createFormulasTemporalSelector("redo");

export const selectFormulasPastStates =
  createFormulasTemporalSelector("pastStates");

export const selectFormulasFutureStates =
  createFormulasTemporalSelector("futureStates");

/* Computed */

export const selectCurrentExpression = createSelector(
  [selectFormulasMap, selectSelectedExpressionId],
  (map, selectedExpressionId) => {
    const isDefinedId = selectedExpressionId !== undefined;
    if (isDefinedId) {
      const formula = getMapItem(selectedExpressionId, map);

      if (formula && checkIsFormulaExpression(formula)) {
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
  [selectRootExpressionFormulas, selectFormulasMap],
  (ids, formulasMap) => {
    return getExpressionResult(ids, { formulasMap });
  }
);

export const selectLastFormula = createSelector(
  [selectFormulasMap, selectActiveExpression],
  (map, activeExpression) => {
    const { value } = activeExpression;
    const lastFormulaId = getLast(value);

    if (lastFormulaId) {
      return getMapItem(lastFormulaId, map);
    }

    return undefined;
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
  [selectFormulasMap, selectCurrentExpression],
  (map, expression) => {
    if (!expression) {
      return false;
    }

    const lastId = getLast(expression.value);

    if (!lastId) {
      return false;
    }

    const lastFormula = getMapItem(lastId, map);

    return checkIsFormulaComputable(lastFormula);
  }
);

export const selectIsExpressionSelected = createSelector(
  [selectActiveExpression, (_, id: string) => id],
  (activeExpression, id) => {
    return activeExpression.id === id;
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
