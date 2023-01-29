import { getLast, spliceLast } from "utils/array";

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
  checkIsFormulaOperator,
  checkIsFormulaValue,
  createFormulaExpression,
  getBasicFormulaValue,
  getFormulaByIndex,
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
    const isIndexEmpty =
      index === undefined || (Array.isArray(index) && !index.length);
    if (isIndexEmpty) {
      editedFormula = selectRootExpression(state);
    } else {
      const formulas = selectFormulas(state);
      editedFormula = getFormulaByIndex(formulas, index);
    }

    Object.assign(editedFormula, formula);
  }
);

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
