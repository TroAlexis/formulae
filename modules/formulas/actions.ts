import { getLast, sliceExceptLast, spliceLast } from "utils/array";

import { createStoreMutationFactory } from "../utils/actions";
import {
  Formula,
  FormulasActions,
  FormulasStore,
  FormulaValue,
} from "./models";
import {
  selectActiveExpression,
  selectCurrentExpressionIndex,
  selectFormulas,
  selectRootExpression,
} from "./selectors";
import {
  checkIndexStartsWith,
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
  checkIsIndexDeep,
  checkIsIndexEmpty,
  cloneFormula,
  createFormulaExpression,
  getBasicFormulaValue,
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

export const removeFormula = createMutation("removeFormula")((state, index) => {
  const formulas = selectFormulas(state);
  const currentExpressionIndex = selectCurrentExpressionIndex(state);

  const removedFormula = removeFormulaByIndex(formulas, index);

  if (!removedFormula) return;

  if (checkIsIndexDeep(index) && checkIsFormulaExpression(removedFormula)) {
    if (checkIndexStartsWith(currentExpressionIndex, index)) {
      const nextIndex = sliceExceptLast(index);

      setCurrentExpressionIndex(state, nextIndex);
    }
  }
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

export const pushCurrentExpressionIndex = createMutation(
  "pushCurrentExpressionIndex"
)((state, index) => {
  const currentExpressionIndex = selectCurrentExpressionIndex(state);

  if (Array.isArray(currentExpressionIndex)) {
    currentExpressionIndex.push(index);
  } else {
    state.currentExpressionIndex = [index];
  }
});

const openExpressionForValue = (formulas: Formula[], value: FormulaValue) => {
  return spliceLast(
    formulas,
    createFormulaExpression({
      value: [value],
    })
  );
};

const openEmptyExpression = (formulas: Formula[]) => {
  const expression = createFormulaExpression({
    value: [getBasicFormulaValue()],
  });
  return formulas.push(expression);
};

export const openExpression = createMutation("openExpression")((state) => {
  const { value } = selectActiveExpression(state);
  const lastFormula = getLast(value);

  if (checkIsFormulaValue(lastFormula)) {
    openExpressionForValue(value, lastFormula);
  }

  if (checkIsFormulaOperator(lastFormula)) {
    openEmptyExpression(value);
  }

  pushCurrentExpressionIndex(state, value.length - 1);
});

export const closeExpression = createMutation("closeExpression")((state) => {
  const currentExpressionIndex = selectCurrentExpressionIndex(state);

  if (currentExpressionIndex && Array.isArray(currentExpressionIndex)) {
    currentExpressionIndex.pop();
  }
});

export const replaceExpression = createMutation("replaceExpression")(
  (state, expression, index) => {
    const currentExpressionIndex = selectCurrentExpressionIndex(state);
    const replaceIndex = index ?? currentExpressionIndex;
    const replacerExpression = cloneFormula({
      ...expression,
      collapsed: false,
    });

    if (checkIsIndexEmpty(replaceIndex)) {
      state.formulas = replacerExpression;
    } else {
      const formulas = selectFormulas(state);
      removeFormulaByIndex(formulas, replaceIndex, replacerExpression);
    }
  }
);

export const setCurrentExpressionIndex = createMutation(
  "setCurrentExpressionIndex"
)((state, index) => {
  state.currentExpressionIndex = Array.isArray(index) ? index : [index];
});
