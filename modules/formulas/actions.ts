import { FormulaIndex } from "modules/formulas/types";
import { Maybe } from "types/types";
import { getLast, spliceLast } from "utils/array";

import { createStoreMutationFactory } from "../utils/actions";
import {
  Formula,
  FormulaExpression,
  FormulasActions,
  FormulasStore,
  FormulaValue,
} from "./models";
import {
  selectActiveExpression,
  selectCurrentExpression,
  selectFormulas,
  selectRootExpression,
} from "./selectors";
import {
  checkIsFormulaExpression,
  checkIsFormulaValue,
  checkIsIndexEmpty,
  cloneFormula,
  createFormulaExpression,
  getBasicFormulaValue,
  getFormulaById,
  getFormulaByIndex,
  removeFormulaByIndex,
} from "./utils";

const createMutation = createStoreMutationFactory<
  FormulasActions,
  FormulasStore
>();

export const addFormula = createMutation("addFormula")((state, formula) => {
  const activeExpression = selectActiveExpression(state);
  activeExpression.value.push(formula);
});

export const editFormula = createMutation("editFormula")(
  (state, index, formula) => {
    let editedFormula: Formula;
    const isIndexEmpty = checkIsIndexEmpty(index);

    if (isIndexEmpty) {
      editedFormula = selectRootExpression(state);
    } else {
      const formulas = selectFormulas(state);
      editedFormula = getFormulaByIndex(formulas, index);
    }

    Object.assign(editedFormula, formula);
  }
);

const updateSelectedExpressionIdOnRemove = (
  selectedExpression: Maybe<FormulaExpression>,
  removedFormula: Maybe<Formula>,
  updateId: (formula: FormulaExpression) => void
) => {
  if (!removedFormula) {
    return;
  }

  if (checkIsFormulaExpression(removedFormula)) {
    if (!selectedExpression) {
      return;
    }

    const isSelectedRemoved = selectedExpression === removedFormula;
    const selectedChild = getFormulaById(
      removedFormula.value,
      selectedExpression.id
    );

    if (isSelectedRemoved || selectedChild) {
      updateId(removedFormula);
    }
  }
};

export const removeFormula = createMutation("removeFormula")((state, index) => {
  const formulas = selectFormulas(state);
  const selectedExpression = selectCurrentExpression(state);

  const removedFormula = removeFormulaByIndex(formulas, index);

  updateSelectedExpressionIdOnRemove(
    selectedExpression,
    removedFormula,
    (formula) => {
      setSelectedExpressionId(state, formula.parentId);
    }
  );
});

export const toggleCollapseExpression = createMutation(
  "toggleCollapseExpression"
)((state, index, value) => {
  const formulas = selectFormulas(state);

  const expression = getFormulaByIndex(formulas, index);

  if (checkIsFormulaExpression(expression)) {
    expression.collapsed = value === undefined ? !expression.collapsed : value;
  }
});

const openExpressionForValue = (
  currentExpression: FormulaExpression,
  value: FormulaValue
) => {
  const newExpression = createFormulaExpression({
    value: [value],
    parentId: currentExpression.id,
  });

  spliceLast(currentExpression.value, newExpression);

  return newExpression;
};

const openEmptyExpression = (currentExpression: FormulaExpression) => {
  const expression = createFormulaExpression({
    value: [getBasicFormulaValue()],
    parentId: currentExpression.id,
  });

  currentExpression.value.push(expression);

  return expression;
};

const openNewExpression = (currentExpression: FormulaExpression) => {
  const { value: formulas } = currentExpression;
  const lastFormula = getLast(formulas);

  if (checkIsFormulaValue(lastFormula)) {
    return openExpressionForValue(currentExpression, lastFormula);
  } else {
    return openEmptyExpression(currentExpression);
  }
};

export const openExpression = createMutation("openExpression")((state) => {
  const activeExpression = selectActiveExpression(state);

  const newExpression = openNewExpression(activeExpression);

  setSelectedExpressionId(state, newExpression.id);
});

export const closeExpression = createMutation("closeExpression")((state) => {
  const currentExpression = selectCurrentExpression(state);

  if (currentExpression) {
    setSelectedExpressionId(state, currentExpression.parentId);
  }
});

export const replaceExpression = createMutation("replaceExpression")(
  (state, expression, index) => {
    const replaceIndex = index ?? [];
    const replacerExpression = cloneFormula({
      ...expression,
      collapsed: false,
    });

    const updateSelectedId = () =>
      setSelectedExpressionId(state, replacerExpression.id);

    if (checkIsIndexEmpty(replaceIndex)) {
      state.formulas = replacerExpression;
      updateSelectedId();
    } else {
      const formulas = selectFormulas(state);
      const selectedExpression = selectCurrentExpression(state);
      const formulaToRemove = getFormulaByIndex(formulas, replaceIndex);

      replacerExpression.parentId = formulaToRemove.parentId;

      const removedFormula = removeFormulaByIndex(
        formulas,
        replaceIndex,
        replacerExpression
      );

      updateSelectedExpressionIdOnRemove(
        selectedExpression,
        removedFormula,
        updateSelectedId
      );
    }
  }
);

export const setSelectedExpressionId = createMutation(
  "setSelectedExpressionId"
)((state, id) => {
  state.selectedExpressionId = id;
});

const selectExpressionByIndex = (state: FormulasStore, index: FormulaIndex) => {
  const formulas = selectFormulas(state);
  const expression = getFormulaByIndex(formulas, index);

  setSelectedExpressionId(state, expression.id);
};

export const setSelectedExpression = createMutation("setSelectedExpression")(
  (state, path) => {
    if (typeof path === "string") {
      setSelectedExpressionId(state, path);
    } else {
      selectExpressionByIndex(state, path);
    }
  }
);
