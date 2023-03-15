import BigNumber from "bignumber.js";
import {
  FormulaOperator,
  FormulaValue,
  Operator,
} from "modules/formulas/models";
import { createFormulaValue } from "modules/formulas/utils/create";

import { FormulaOperatorType } from "./enums";
import { FormulaValueType, OperatorOrderChecker } from "./types";

export const STATIC_FORMULA_ID = "new-formula";
export const STATIC_VALUE_ID = "new-value";

export const FORMULAS_TEMPORAL_LIMIT = 100;

const createOperatorComputer =
  (computer: (a: FormulaValueType, b: FormulaValueType) => FormulaValueType) =>
  (a: FormulaValue, b: FormulaValue) =>
    createFormulaValue({
      value: computer(a.value, b.value),
    });

export const OPERATORS: Map<FormulaOperatorType, Operator> = new Map([
  [
    FormulaOperatorType.MULTIPLICATION,
    {
      label: FormulaOperatorType.MULTIPLICATION,
      computer: createOperatorComputer((a, b) =>
        BigNumber(a).times(b).toNumber()
      ),
    },
  ],
  [
    FormulaOperatorType.DIVISION,
    {
      label: FormulaOperatorType.DIVISION,
      computer: createOperatorComputer((a, b) =>
        BigNumber(a).div(b).toNumber()
      ),
    },
  ],
  [
    FormulaOperatorType.ADDITION,
    {
      label: FormulaOperatorType.ADDITION,
      computer: createOperatorComputer((a, b) =>
        BigNumber.sum(a, b).toNumber()
      ),
    },
  ],
  [
    FormulaOperatorType.SUBTRACTION,
    {
      label: FormulaOperatorType.SUBTRACTION,
      computer: createOperatorComputer((a, b) =>
        BigNumber(a).minus(b).toNumber()
      ),
    },
  ],
]);

const FIRST_PRIORITY_OPERATORS: string[] = [
  FormulaOperatorType.DIVISION,
  FormulaOperatorType.MULTIPLICATION,
];

export const OPERATORS_ORDER: OperatorOrderChecker[] = [
  (operator: FormulaOperator) =>
    FIRST_PRIORITY_OPERATORS.includes(operator.value),
  () => true,
];
