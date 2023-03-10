import { FormulaType } from "modules/formulas/enums";
import { checkFormulaType } from "modules/formulas/utils/check";
import {
  createFormulaOperator,
  createInitialExpression,
  createInitialValue,
} from "modules/formulas/utils/create";

const variants = [
  {
    type: FormulaType.EXPRESSION,
    formula: createInitialExpression(),
    expected: true,
  },
  { type: FormulaType.VALUE, formula: createInitialValue(), expected: true },
  {
    type: FormulaType.OPERATOR,
    formula: createFormulaOperator(),
    expected: true,
  },
] as const;

const falseVariants = [
  {
    type: FormulaType.VALUE,
    formula: createInitialExpression(),
    expected: false,
  },
  {
    type: FormulaType.EXPRESSION,
    formula: createInitialValue(),
    expected: false,
  },
  {
    type: FormulaType.VALUE,
    formula: createFormulaOperator(),
    expected: false,
  },
];

describe("checkFormulaType", () => {
  it.each(variants)(
    "returns $expected for type checked",
    ({ type, formula, expected }) => {
      expect(checkFormulaType(formula, type)).toBe(expected);
    }
  );

  it.each(falseVariants)(
    "returns $expected for different type",
    ({ type, formula, expected }) => {
      expect(checkFormulaType(formula, type)).toBe(expected);
    }
  );
});
