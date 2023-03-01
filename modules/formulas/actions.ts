import {
  addFormulaToMap,
  deleteFormulaFromMap,
  editFormulaInMap,
} from "modules/formula/actions";
import {
  Formula,
  FormulaExpression,
  FormulasMap,
  FormulaValue,
} from "modules/formula/models";
import {
  selectFormulaById,
  selectFormulasMap,
} from "modules/formula/selectors";
import {
  cloneFormulaSlice,
  findExpressionChild,
  getParentExpression,
} from "modules/formula/utils";
import {
  checkIsFormulaExpression,
  checkIsFormulaValue,
} from "modules/formulas/utils/check";
import {
  createEmptyFormulaValue,
  createFormulaExpression,
} from "modules/formulas/utils/create";
import { Maybe } from "types/types";
import { getLast, spliceItem } from "utils/array";
import { getMapItem, mergeMaps } from "utils/map";

import { createStoreMutationFactory } from "../utils/actions";
import { FormulasActions, FormulasStore } from "./models";
import {
  selectActiveExpression,
  selectCurrentExpression,
  selectRootExpression,
  selectSelectedExpressionId,
} from "./selectors";

const createMutation = createStoreMutationFactory<
  FormulasActions,
  FormulasStore
>();

export const addFormula = createMutation("addFormula")((state, formula) => {
  const activeExpression = selectActiveExpression(state);

  addFormulaToMap(state, {
    ...formula,
    parentId: activeExpression.id,
  });

  activeExpression.value.push(formula.id);
});

const updateSelectedExpressionIdOnRemove = (
  selectedExpressionId: Maybe<string>,
  removedFormula: Formula,
  map: FormulasMap,
  onUpdateId: (formula: FormulaExpression) => void
) => {
  if (checkIsFormulaExpression(removedFormula)) {
    if (!selectedExpressionId) {
      return;
    }

    const isSelectedRemoved = selectedExpressionId === removedFormula.id;
    const isSelectedAChild = findExpressionChild(
      removedFormula,
      selectedExpressionId,
      map
    );

    if (isSelectedRemoved || isSelectedAChild) {
      onUpdateId(removedFormula);
    }
  }
};

const removeFormulaFromExpression = (formula: Formula, map: FormulasMap) => {
  if (!formula.parentId) {
    return;
  }

  const parent = getMapItem(formula.parentId, map);

  if (checkIsFormulaExpression(parent)) {
    spliceItem(parent.value, formula.id);
  }
};

export const removeFormula = createMutation("removeFormula")((state, id) => {
  const map = selectFormulasMap(state);
  const formula = selectFormulaById(state, id);

  const selectedExpressionId = selectSelectedExpressionId(state);

  if (formula) {
    updateSelectedExpressionIdOnRemove(
      selectedExpressionId,
      formula,
      map,
      (formula) => {
        setSelectedExpressionId(state, formula.parentId);
      }
    );

    if (formula.parentId) {
      removeFormulaFromExpression(formula, map);
    }
  }

  // Remove from map
  deleteFormulaFromMap(state, id);
});

export const toggleCollapseExpression = createMutation(
  "toggleCollapseExpression"
)((state, id, value) => {
  const expression = selectFormulaById(state, id);

  if (checkIsFormulaExpression(expression)) {
    expression.collapsed = value === undefined ? !expression.collapsed : value;
  }
});

const openExpressionForValue = (
  currentExpression: FormulaExpression,
  value: FormulaValue
) => {
  const newExpression = createFormulaExpression({
    value: [value.id],
    parentId: currentExpression.id,
  });

  value.parentId = newExpression.id;

  spliceItem(currentExpression.value, value.id, newExpression.id);

  return [newExpression];
};

const openEmptyExpression = (currentExpression: FormulaExpression) => {
  const value = createEmptyFormulaValue();

  const expression = createFormulaExpression({
    value: [value.id],
    parentId: currentExpression.id,
  });

  value.parentId = expression.id;

  currentExpression.value.push(expression.id);

  return [expression, value];
};

const openNewExpression = (
  currentExpression: FormulaExpression,
  map: FormulasMap
) => {
  const { value } = currentExpression;
  const lastFormulaId = getLast(value);

  if (!lastFormulaId) {
    return [];
  }

  const lastFormula = getMapItem(lastFormulaId, map);

  if (checkIsFormulaValue(lastFormula)) {
    return openExpressionForValue(currentExpression, lastFormula);
  } else {
    return openEmptyExpression(currentExpression);
  }
};

export const openExpression = createMutation("openExpression")((state) => {
  const map = selectFormulasMap(state);
  const activeExpression = selectActiveExpression(state);

  const newFormulas = openNewExpression(activeExpression, map);

  newFormulas?.forEach((formula) => {
    addFormulaToMap(state, formula);
  });

  const [newExpression] = newFormulas;

  if (newExpression) {
    setSelectedExpressionId(state, newExpression.id);
  }
});

export const closeExpression = createMutation("closeExpression")((state) => {
  const currentExpression = selectCurrentExpression(state);

  if (currentExpression) {
    setSelectedExpressionId(state, currentExpression.parentId);
  }
});

export const replaceExpression = createMutation("replaceExpression")(
  (state, expression, replacer) => {
    const replacerSlice = cloneFormulaSlice(replacer);
    if (!replacerSlice) {
      return;
    }

    const map = selectFormulasMap(state);
    const rootExpression = selectRootExpression(state);
    const replacedExpression = expression ?? rootExpression;
    const replacedExpressionParent = getParentExpression(
      replacedExpression.id,
      map
    );

    const { id: replacerId, map: replacerMap } = replacerSlice;

    const setNewExpressionSelected = () => {
      setSelectedExpressionId(state, replacerId);
    };

    const isRootReplaced = replacedExpression.id === rootExpression.id;

    if (isRootReplaced) {
      state.rootExpressionId = replacerId;
      setNewExpressionSelected();
    } else {
      const selectedExpressionId = selectSelectedExpressionId(state);

      updateSelectedExpressionIdOnRemove(
        selectedExpressionId,
        replacedExpression,
        map,
        setNewExpressionSelected
      );
    }

    deleteFormulaFromMap(state, replacedExpression.id);

    /* Add new expression to map */
    mergeMaps(map, replacerMap);

    if (replacedExpressionParent) {
      /* Replace in parent array */
      spliceItem(
        replacedExpressionParent.value,
        replacedExpression.id,
        replacerId
      );

      /* Update parent id of replacer expression  */
      editFormulaInMap(state, replacerId, {
        parentId: replacedExpressionParent.id,
      });
    }
  }
);

export const setSelectedExpressionId = createMutation(
  "setSelectedExpressionId"
)((state, id) => {
  state.selectedExpressionId = id;
});
