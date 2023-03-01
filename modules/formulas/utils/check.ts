import { FormulaType } from "modules/formulas/enums";
import { Maybe } from "types/types";
import {
  Formula,
  FormulaComputable,
  FormulaExpression,
  FormulaOperator,
  FormulaValue
} from "modules/formula/models";

export const checkFormulaType = <T extends Formula>(
  formula: Maybe<Formula>,
  type: FormulaType
): formula is T => {
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
