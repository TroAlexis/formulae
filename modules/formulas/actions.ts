import { getLast, spliceLast } from "../../utils/array";
import { FormulasActions } from "./models";
import {
  selectActiveExpression,
  selectCurrentExpressionIndex,
  selectFormulas,
} from "./selectors";
import { StoreAction } from "./types";
import {
  checkIsFormulaOperator,
  checkIsFormulaValue,
  createFormulaExpression,
  getBasicFormulaValue,
  getFormulaByIndex,
} from "./utils";

const createAction =
  <T extends keyof FormulasActions>() =>
  <R>(fn: StoreAction<T, R>) =>
    fn;

export const addFormula = createAction<"addFormula">()((state, formula) => {
  const activeExpression = selectActiveExpression(state);
  activeExpression.value.push(formula);
});

export const editFormula = createAction<"editFormula">()(
  (state, index, formula) => {
    const formulas = selectFormulas(state);
    const editedFormula = getFormulaByIndex(formulas, index);
    Object.assign(editedFormula, formula);
  }
);

export const pushCurrentExpressionIndex =
  createAction<"pushCurrentExpressionIndex">()((state, index) => {
    const currentExpressionIndex = selectCurrentExpressionIndex(state);

    if (Array.isArray(currentExpressionIndex)) {
      currentExpressionIndex.push(index);
    } else {
      state.currentExpressionIndex = [index];
    }
  });

export const openExpression = createAction<"openExpression">()((state) => {
  const { value } = selectActiveExpression(state);
  const lastFormula = getLast(value);
  if (checkIsFormulaValue(lastFormula)) {
    spliceLast(
      value,
      createFormulaExpression({
        value: [lastFormula],
      })
    );
  }
  if (checkIsFormulaOperator(lastFormula)) {
    value.push(createFormulaExpression({ value: [getBasicFormulaValue()] }));
  }

  pushCurrentExpressionIndex(state, value.length - 1);
});

export const closeExpression = createAction<"closeExpression">()((state) => {
  const currentExpressionIndex = selectCurrentExpressionIndex(state);

  if (currentExpressionIndex && Array.isArray(currentExpressionIndex)) {
    currentExpressionIndex.pop();
  }
});
