import { uuid } from "../../utils/uuid";
import { OPERATORS_ORDER } from "./consts";
import { FormulaType } from "./enums";
import {
  Formula,
  FormulaComputable,
  FormulaExpression,
  FormulaOperator,
  FormulaValue,
} from "./models";
import { FormulaIndex, OperatorOrderChecker } from "./types";

/* Formula value factory */
export const getBasicFormulaValue = (): FormulaValue => ({
  value: 0,
  type: FormulaType.VALUE,
  id: uuid(),
});

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
  const operator = formulas[operatorIndex];
  const a = formulas[indexOfA];
  const b = formulas[indexOfB];

  if (
    checkIsFormulaOperator(operator) &&
    checkIsFormulaComputable(a) &&
    checkIsFormulaComputable(b)
  ) {
    return operator.computer(getComputableValue(a), getComputableValue(b));
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
  if (checkIsFormulaExpression(currentFormula)) {
    const nextIndex = index.slice(1);
    return getFormulaByIndex(currentFormula.value, nextIndex);
  } else {
    return currentFormula;
  }
};

export const getFormulaByIndex = (
  formulas: Formula[],
  index: FormulaIndex
): Formula => {
  const isIndexArray = Array.isArray(index);

  if (isIndexArray) {
    return getFormulaByIndexArray(formulas, index);
  } else {
    return formulas[index];
  }
};
