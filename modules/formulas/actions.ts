import {
  findExpressionChild,
  getParentExpression,
} from "modules/formulas/utils";
import {
  checkIsFormulaExpression,
  checkIsFormulaValue,
} from "modules/formulas/utils/check";
import {
  createEmptyFormulaValue,
  createFormulaExpression,
} from "modules/formulas/utils/create";
import { cloneFormulaSlice } from "modules/formulas/utils/slice";
import { addToMap, deleteFromMap, editInMap } from "modules/map/actions";
import { selectMap } from "modules/map/selectors";
import { Maybe } from "types/types";
import { getLast, spliceItem } from "utils/array";
import { getMapItem, mergeMaps } from "utils/map";

import { createStoreMutationFactory } from "../utils/actions";
import {
  Formula,
  FormulaExpression,
  FormulaMap,
  FormulasActions,
  FormulasStore,
  FormulaValue,
} from "./models";
import {
  selectActiveExpression,
  selectCurrentExpression,
  selectFormulaById,
  selectRootExpression,
  selectSelectedExpressionId,
} from "./selectors";

const createMutation = createStoreMutationFactory<
  FormulasActions,
  FormulasStore
>();

export const addFormula = createMutation("addFormula")((state, formula) => {
  const activeExpression = selectActiveExpression(state);

  addToMap(state, formula.id, {
    ...formula,
    parentId: activeExpression.id,
  });

  activeExpression.value.push(formula.id);
});

export const editFormula = createMutation("editFormula")((state, id, formula) =>
  editInMap(state, id, (value) => Object.assign(value, formula))
);

const updateSelectedExpressionIdOnRemove = (
  selectedExpressionId: Maybe<string>,
  removedFormula: Formula,
  map: FormulaMap,
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

const removeFormulaFromExpression = (formula: Formula, map: FormulaMap) => {
  if (!formula.parentId) {
    return;
  }

  const parent = getMapItem(formula.parentId, map);

  if (checkIsFormulaExpression(parent)) {
    spliceItem(parent.value, formula.id);
  }
};

export const removeFormula = createMutation("removeFormula")((state, id) => {
  const map = selectMap(state);
  const formula = selectFormulaById(state, id);

  const selectedExpressionId = selectSelectedExpressionId(state);

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

  // Remove from map
  deleteFromMap(state, id);
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
  map: FormulaMap
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
  const map = selectMap(state);
  const activeExpression = selectActiveExpression(state);

  const newFormulas = openNewExpression(activeExpression, map);

  newFormulas?.forEach((formula) => {
    addToMap(state, formula.id, formula);
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

    const map = selectMap(state);
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

    deleteFromMap(state, replacedExpression.id);

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
      editFormula(state, replacerId, {
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
