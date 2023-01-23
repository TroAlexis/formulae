import { PartialBy } from "../../types/types";
import { FormulaOperatorType } from "./enums";
import { FormulaOperator, FormulaValue } from "./models";
import { FormulaValueType, OperatorOrderChecker } from "./types";
import { getBasicFormulaValue } from "./utils";

const createOperatorComputer =
  (computer: (a: FormulaValueType, b: FormulaValueType) => FormulaValueType) =>
  (a: FormulaValue, b: FormulaValue) => ({
    ...getBasicFormulaValue(),
    value: computer(a.value, b.value),
  });

export const OPERATORS: Record<
  FormulaOperatorType,
  PartialBy<FormulaOperator, "id" | "type">
> = {
  [FormulaOperatorType.MULTIPLICATION]: {
    label: FormulaOperatorType.MULTIPLICATION,
    computer: createOperatorComputer((a, b) => a * b),
  },
  [FormulaOperatorType.DIVISION]: {
    label: FormulaOperatorType.DIVISION,
    computer: createOperatorComputer((a, b) => a / b),
  },
  [FormulaOperatorType.ADDITION]: {
    label: FormulaOperatorType.ADDITION,
    computer: createOperatorComputer((a, b) => a + b),
  },
  [FormulaOperatorType.SUBTRACTION]: {
    label: FormulaOperatorType.SUBTRACTION,
    computer: createOperatorComputer((a, b) => a - b),
  },
};

const FIRST_PRIORITY_OPERATORS: string[] = [
  FormulaOperatorType.DIVISION,
  FormulaOperatorType.MULTIPLICATION,
];

export const OPERATORS_ORDER: OperatorOrderChecker[] = [
  (operator: FormulaOperator) =>
    FIRST_PRIORITY_OPERATORS.includes(operator.label),
  () => true,
];
