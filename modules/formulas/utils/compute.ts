import { OPERATORS, OPERATORS_ORDER } from "modules/formulas/consts";
import {
  Formula,
  FormulaComputable,
  FormulaExpression,
  FormulaMap,
  FormulaValue,
} from "modules/formulas/models";
import { OperatorOrderChecker } from "modules/formulas/types";
import {
  checkIsFormulaComputable,
  checkIsFormulaExpression,
  checkIsFormulaOperator,
  checkIsFormulaValue,
} from "modules/formulas/utils/check";
import { createEmptyFormulaValue } from "modules/formulas/utils/create";
import { mapKeysToValues } from "utils/map";

export interface ComputeOptions {
  formulasMap: FormulaMap;
}

export const getFirstFormulaValue = (formulas: Formula[]): FormulaValue => {
  const [firstFormula] = formulas;

  const isValue = checkIsFormulaValue(firstFormula);

  return isValue ? firstFormula : createEmptyFormulaValue();
};

export const getComputableValue = (
  computable: FormulaComputable,
  { formulasMap }: ComputeOptions
): FormulaValue => {
  return checkIsFormulaValue(computable)
    ? computable
    : getExpressionResult(computable.value, { formulasMap });
};

export const getOperatorCalculated = (
  formulas: Formula[],
  operatorIndex: number,
  { formulasMap }: ComputeOptions
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
    const computableA = getComputableValue(a, { formulasMap });
    const computableB = getComputableValue(b, { formulasMap });

    return operator?.computer(computableA, computableB);
  }

  return undefined;
};
export const getOperatorComputed = (
  formulas: Formula[],
  operator: OperatorOrderChecker,
  { formulasMap }: ComputeOptions
): Formula[] => {
  return formulas.reduce<Formula[]>((result, formula) => {
    result.push(formula);

    const operatorIndex = result.length - 2;
    const previous = result[operatorIndex];

    const canBeCalculated =
      checkIsFormulaOperator(previous) && operator(previous);

    if (canBeCalculated) {
      const calculated = getOperatorCalculated(result, operatorIndex, {
        formulasMap,
      });

      if (calculated) {
        const indexOfA = operatorIndex - 1;
        result.splice(indexOfA, 3, calculated);
      }
    }

    return result;
  }, []);
};
export const getExpressionResult = (
  ids: FormulaExpression["value"],
  { formulasMap }: ComputeOptions
): FormulaValue => {
  const formulas = mapKeysToValues(ids, formulasMap);

  const result = OPERATORS_ORDER.reduce((result, operator) => {
    return getOperatorComputed(result, operator, { formulasMap });
  }, formulas);

  const [formula] = result;
  if (checkIsFormulaExpression(formula)) {
    return getExpressionResult(formula.value, { formulasMap });
  }

  return getFirstFormulaValue(result);
};
