import { PartialBy } from "types/types";
import { uuid } from "utils/uuid";

import { OPERATORS, OPERATORS_ORDER } from "./consts";
import { FormulaType } from "./enums";
import {
  Formula,
  FormulaComputable,
  FormulaExpression,
  FormulaOperator,
  FormulaValue,
} from "./models";
import { FormulaIndex, OperatorOrderChecker } from "./types";

/* Formula factory */

export const createFormulaFactory =
  <T extends Formula>() =>
  <K extends keyof T>(base: Pick<T, K>) =>
  (formula: PartialBy<T, K | "id">): T =>
    ({
      id: uuid(),
      ...base,
      ...formula,
    } as T);

export const createFormulaValue = createFormulaFactory<FormulaValue>()({
  type: FormulaType.VALUE,
});

export const createFormulaExpression =
  createFormulaFactory<FormulaExpression>()({ type: FormulaType.EXPRESSION });

export const createFormulaOperator = createFormulaFactory<FormulaOperator>()({
  type: FormulaType.OPERATOR,
});

export const getBasicFormulaValue = (): FormulaValue =>
  createFormulaValue({ value: 0 });

export const getFormulaInitialValue = (formulas: Formula[]): FormulaValue => {
  const [firstFormula] = formulas;

  const isValue = checkIsFormulaValue(firstFormula);

  return isValue ? firstFormula : getBasicFormulaValue();
};

export const getComputableValue = (
  computable: FormulaComputable
): FormulaValue => {
  return checkIsFormulaValue(computable)
    ? computable
    : getExpressionResult(computable);
};

export const getOperatorComputed = (
  formulas: Formula[],
  operatorIndex: number
) => {
  const indexOfA = operatorIndex - 1;
  const indexOfB = operatorIndex + 1;
  const formulaOperator = formulas[operatorIndex];
  const a = formulas[indexOfA];
  const b = formulas[indexOfB];

  if (
    checkIsFormulaOperator(formulaOperator) &&
    checkIsFormulaComputable(a) &&
    checkIsFormulaComputable(b)
  ) {
    const operator = OPERATORS.get(formulaOperator.value);

    return operator?.computer(getComputableValue(a), getComputableValue(b));
  }

  return undefined;
};

export const getAppliedOperator = (
  formulas: Formula[],
  operator: OperatorOrderChecker
): Formula[] => {
  return formulas.reduce<Formula[]>((result, formula) => {
    result.push(formula);

    const operatorIndex = result.length - 2;
    const previous = result[operatorIndex];

    const canBeComputed =
      checkIsFormulaOperator(previous) && operator(previous);

    if (canBeComputed) {
      const computed = getOperatorComputed(result, operatorIndex);

      if (computed) {
        const indexOfA = operatorIndex - 1;
        result.splice(indexOfA, 3, computed);
      }
    }

    return result;
  }, []);
};

export const getExpressionResult = (
  expression: FormulaExpression
): FormulaValue => {
  const result = OPERATORS_ORDER.reduce((result, operator) => {
    return getAppliedOperator(result, operator);
  }, expression.value);

  const [value] = result;
  if (value?.type === FormulaType.EXPRESSION) {
    return getExpressionResult(value);
  }

  return getFormulaInitialValue(result);
};

export const createFormulaChecker = <T extends Formula>(type: FormulaType) => {
  return (formula: Formula): formula is T => {
    return formula?.type === type;
  };
};

export const checkIsFormulaValue = createFormulaChecker<FormulaValue>(
  FormulaType.VALUE
);
export const checkIsFormulaOperator = createFormulaChecker<FormulaOperator>(
  FormulaType.OPERATOR
);
export const checkIsFormulaExpression = createFormulaChecker<FormulaExpression>(
  FormulaType.EXPRESSION
);

export const checkIsFormulaComputable = (
  formula: Formula
): formula is FormulaComputable =>
  checkIsFormulaValue(formula) || checkIsFormulaExpression(formula);

export const getFormulaByIndexArray = (
  formulas: Formula[],
  index: number[]
) => {
  const [currentIndex] = index;
  const currentFormula = formulas[currentIndex];
  const nextIndex = index.slice(1);
  const hasIndex = !!nextIndex.length;

  if (checkIsFormulaExpression(currentFormula) && hasIndex) {
    return getFormulaByIndex(currentFormula.value, nextIndex);
  }

  return currentFormula;
};

export const getFormulaByIndex = (
  formulas: Formula[],
  index: FormulaIndex
): Formula => {
  const isIndexArray = Array.isArray(index);

  if (isIndexArray) {
    return getFormulaByIndexArray(formulas, index);
  }

  return formulas[index];
};

export const removeFormulaByIndexArray = (
  formulas: Formula[],
  index: number[]
) => {
  if (!index.length) return undefined;

  const lastIndex = index.length - 1;
  const indexWithoutLast = index.slice(0, lastIndex);
  if (indexWithoutLast.length) {
    const parentFormula = getFormulaByIndex(formulas, indexWithoutLast);

    if (checkIsFormulaExpression(parentFormula)) {
      return removeFormulaByIndex(parentFormula.value, lastIndex);
    }

    return undefined;
  }

  return removeFormulaByIndex(formulas, index[lastIndex]);
};

export const removeFormulaByIndex = (
  formulas: Formula[],
  index: FormulaIndex
): Formula[] | undefined => {
  const isIndexArray = Array.isArray(index);

  if (isIndexArray) {
    return removeFormulaByIndexArray(formulas, index);
  } else {
    return formulas.splice(index, 1);
  }
};

export const getComputableShortId = (computable: FormulaComputable) => {
  const [shortId] = computable.id.split("-");

  return shortId;
};

export const checkIsIndexEmpty = (index: FormulaIndex) => {
  return Array.isArray(index) && !index.length;
};

export const checkIndexesEqual = (a?: FormulaIndex, b?: FormulaIndex) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
