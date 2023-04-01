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
} from "./models";
import {
  selectActiveExpression,
  selectCurrentExpression,
  selectFormulaById,
  selectRootExpression,
  selectRootExpressionId,
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

const removeFormulaFromExpression = (
  state: FormulasStore,
  formula: Formula
) => {
  if (!formula.parentId) {
    return;
  }

  const map = selectMap(state);

  const parent = getMapItem(formula.parentId, map);

  if (checkIsFormulaExpression(parent)) {
    spliceItem(parent.value, formula.id);
  }

  // Remove from map
  deleteFromMap(state, formula.id);
};

const clearRootExpression = (state: FormulasStore) => {
  const rootExpression = selectRootExpression(state);
  const formulas = [...rootExpression.value];

  formulas.forEach((id) => {
    const formula = selectFormulaById(state, id);
    removeFormulaFromExpression(state, formula);
  });
};

const isRootFormula = (state: FormulasStore, formula: Formula) => {
  const rootId = selectRootExpressionId(state);
  return rootId === formula.id && checkIsFormulaExpression(formula);
};

export const removeFormula = createMutation("removeFormula")((state, id) => {
  const map = selectMap(state);
  const formula = selectFormulaById(state, id);

  if (formula.parentId) {
    const selectedExpressionId = selectSelectedExpressionId(state);

    updateSelectedExpressionIdOnRemove(
      selectedExpressionId,
      formula,
      map,
      (formula) => {
        setSelectedExpressionId(state, formula.parentId);
      }
    );

    removeFormulaFromExpression(state, formula);
  } else if (isRootFormula(state, formula)) {
    clearRootExpression(state);
  }
});

export const toggleCollapseExpression = createMutation(
  "toggleCollapseExpression"
)((state, id, value) => {
  const expression = selectFormulaById(state, id);

  if (checkIsFormulaExpression(expression)) {
    expression.collapsed = value === undefined ? !expression.collapsed : value;
  }
});

const wrapFormulaWithExpression = (
  parentExpression: FormulaExpression,
  value: Formula
) => {
  const newExpression = createFormulaExpression({
    value: [value.id],
    parentId: parentExpression.id,
  });

  value.parentId = newExpression.id;

  spliceItem(parentExpression.value, value.id, newExpression.id);

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
    return wrapFormulaWithExpression(currentExpression, lastFormula);
  } else {
    return openEmptyExpression(currentExpression);
  }
};

const addFormulas = (state: FormulasStore, formulas?: Formula[]) => {
  formulas?.forEach((formula) => {
    addToMap(state, formula.id, formula);
  });
};

export const openExpression = createMutation("openExpression")((state) => {
  const map = selectMap(state);
  const activeExpression = selectActiveExpression(state);

  const newFormulas = openNewExpression(activeExpression, map);

  addFormulas(state, newFormulas);

  const [newExpression] = newFormulas;

  if (newExpression) {
    setSelectedExpressionId(state, newExpression.id);
  }
});

const wrapRootExpression = (state: FormulasStore, formula: Formula) => {
  const newExpression = createFormulaExpression({
    value: [formula.id],
  });

  addToMap(state, newExpression.id, newExpression);
  editFormula(state, formula.id, { parentId: newExpression.id });

  setRootId(state, newExpression.id);
};

const wrapFormula = (state: FormulasStore, formula: Formula) => {
  if (formula.parentId) {
    const parentExpression = selectFormulaById(
      state,
      formula.parentId
    ) as FormulaExpression;
    const newFormulas = wrapFormulaWithExpression(parentExpression, formula);

    addFormulas(state, newFormulas);
  }
};

export const wrapWithExpression = createMutation("wrapWithExpression")(
  (state, id) => {
    const formula = selectFormulaById(state, id);
    const isRootExpression = isRootFormula(state, formula);

    if (isRootExpression) {
      wrapRootExpression(state, formula);
    } else {
      wrapFormula(state, formula);
    }
  }
);

export const closeExpression = createMutation("closeExpression")((state) => {
  const currentExpression = selectCurrentExpression(state);

  if (currentExpression) {
    setSelectedExpressionId(state, currentExpression.parentId);
  }
});

export const replaceExpression = createMutation("replaceExpression")(
  (state, id, replacer) => {
    const replacerSlice = cloneFormulaSlice(replacer);
    if (!replacerSlice) {
      return;
    }

    const map = selectMap(state);
    const rootExpression = selectRootExpression(state);
    const replacedExpression = id
      ? selectFormulaById(state, id)
      : rootExpression;
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

export const setRootId = createMutation("setRootId")((state, id) => {
  state.rootExpressionId = id;
});

export const setSelectedExpressionId = createMutation(
  "setSelectedExpressionId"
)((state, id) => {
  state.selectedExpressionId = id;
});
