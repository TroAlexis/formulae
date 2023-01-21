import { PartialBy } from "../../types/types";
import { FormulaOperatorType, FormulaType } from "./enums";
import { FormulaOperator } from "./models";
import { getBasicFormulaValue } from "./utils";

export const OPERATORS: Record<
  FormulaOperatorType,
  PartialBy<FormulaOperator, "id">
> = {
  [FormulaOperatorType.ADDITION]: {
    type: FormulaType.OPERATOR,
    label: "+",
    value: (a, b) => ({ ...getBasicFormulaValue(), value: a.value + b.value }),
  },
  [FormulaOperatorType.SUBTRACTION]: {
    type: FormulaType.OPERATOR,
    label: "-",
    value: (a, b) => ({ ...getBasicFormulaValue(), value: a.value - b.value }),
  },
  [FormulaOperatorType.DIVISION]: {
    type: FormulaType.OPERATOR,
    label: "/",
    value: (a, b) => ({ ...getBasicFormulaValue(), value: a.value / b.value }),
  },
  [FormulaOperatorType.MULTIPLICATION]: {
    type: FormulaType.OPERATOR,
    label: "x",
    value: (a, b) => ({ ...getBasicFormulaValue(), value: a.value * b.value }),
  },
};
