import { FormulaType } from "modules/formulas/enums";
import {
  Formula,
  FormulaByType,
  FormulaComputable,
  FormulaExpression,
  FormulaOperator,
  FormulaValue,
} from "modules/formulas/models";
import { Maybe } from "types/types";

export const checkFormulaType = <T extends FormulaType>(
  formula: Maybe<Formula>,
  type: T
): formula is FormulaByType[T] => {
  return formula?.type === type;
};

export const createFormulaChecker = <T extends Formula>(type: FormulaType) => {
  return (formula?: Formula): formula is T => {
    return checkFormulaType(formula, type);
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
  formula?: Formula
): formula is FormulaComputable =>
  checkIsFormulaValue(formula) || checkIsFormulaExpression(formula);
