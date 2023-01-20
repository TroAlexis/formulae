import { uuid } from "../../utils/uuid";
import { FormulaType } from "./enums";
import {
  Formula,
  FormulaComputable,
  FormulaExpression,
  FormulaOperator,
  FormulaValue,
} from "./models";

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

export const getFormulasValue = (formulas: Formula[]): FormulaValue => {
  const initialValue = getFormulaInitialValue(formulas);

  return formulas.reduce<FormulaValue>((result, current, index, array) => {
    const isValue = checkIsFormulaComputable(current);
    const previous = array[index - 1];
    const isPreviousOperator = previous && checkIsFormulaOperator(previous);

    if (isValue && isPreviousOperator) {
      const operator = previous;
      const [firstValue, secondValue] = [current, result].map(getFormulaValue);

      return operator.value(firstValue, secondValue);
    }

    return result;
  }, initialValue);
};

export const getFormulaValue = (formula: FormulaComputable): FormulaValue => {
  if (checkIsFormulaExpression(formula)) {
    return getFormulasValue(formula.value);
  }

  return formula;
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
