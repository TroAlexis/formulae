import { Maybe, PartialBy } from "types/types";
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

export const createFormula = createFormulaFactory<Formula>()({});

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

export const getFormulaById = (
  formulas: Formula[],
  id: string
): Maybe<Formula> => {
  let result: Maybe<Formula> = undefined;

  formulas.forEach((formula) => {
    const isFound = formula.id === id;

    if (isFound) {
      result = formula;
    }

    if (!isFound && checkIsFormulaExpression(formula)) {
      result = getFormulaById(formula.value, id);
    }
  });

  return result;
};

export const removeFormulaByIndexArray = (
  formulas: Formula[],
  index: number[],
  ...items: Formula[]
) => {
  if (!index.length) return undefined;

  const lastIndex = index.length - 1;
  const lastIndexValue = index[lastIndex];
  const indexWithoutLast = index.slice(0, lastIndex);

  if (indexWithoutLast.length) {
    const parentFormula = getFormulaByIndex(formulas, indexWithoutLast);

    if (checkIsFormulaExpression(parentFormula)) {
      return removeFormulaByIndex(
        parentFormula.value,
        lastIndexValue,
        ...items
      );
    }

    return undefined;
  }

  return removeFormulaByIndex(formulas, lastIndexValue, ...items);
};

export const removeFormulaByIndex = (
  formulas: Formula[],
  index: FormulaIndex,
  ...items: Formula[]
): Formula | undefined => {
  const isIndexArray = Array.isArray(index);

  if (isIndexArray) {
    return removeFormulaByIndexArray(formulas, index, ...items);
  } else {
    const [removedElement] = formulas.splice(index, 1, ...items);

    return removedElement;
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

export const checkIsIndexDeep = (index: FormulaIndex): index is any[] => {
  return Array.isArray(index) && index.length >= 1;
};

export const checkIndexStartsWith = (a: FormulaIndex, b: FormulaIndex) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return b.every((item, index) => a[index] === item);
  }

  return false;
};

type CloneFormulaMeta = Pick<FormulaExpression, "parentId">;

export const cloneFormula = <T extends Formula>(
  formula: T,
  meta: CloneFormulaMeta = {}
): T => {
  const clonedFormula = { ...formula, id: uuid(), ...meta };

  if (checkIsFormulaExpression(formula)) {
    return {
      ...clonedFormula,
      value: formula.value.map((childFormula) =>
        cloneFormula(childFormula, { parentId: clonedFormula.id })
      ),
    };
  } else {
    return clonedFormula;
  }
};
