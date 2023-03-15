import { ExpressionBuilder } from "__utils__/expression";
import { FormulaOperatorType, FormulaType } from "modules/formulas/enums";
import {
  checkFormulaType,
  checkIsFormulaValue,
} from "modules/formulas/utils/check";
import {
  getComputableValue,
  getExpressionResult,
  getFirstFormulaValue,
  getOperatorCalculated,
  getOperatorComputed,
} from "modules/formulas/utils/compute";
import {
  createFormulaValue,
  createInitialExpression,
  createInitialValue,
} from "modules/formulas/utils/create";

describe("getFirstFormulaValue", () => {
  it("returns first formula value from formulas", () => {
    const firstValue = createInitialValue();
    const formulas = [firstValue, createInitialExpression()];
    const value = getFirstFormulaValue(formulas);

    expect(value).toBe(firstValue);
  });

  it("returns formula value if formulas don't include one", () => {
    const formulas = [createInitialExpression()];
    const value = getFirstFormulaValue(formulas);

    expect(checkFormulaType(value, FormulaType.VALUE)).toBe(true);
  });
});

describe("getComputableValue", () => {
  it("returns formula value if is one", () => {
    const value = createFormulaValue({ value: 100 });
    expect(
      getComputableValue(value, {
        formulasMap: {},
      })
    ).toBe(value);
  });

  it("returns calculated value for expression", () => {
    const value = 200;
    const { expression, map } = new ExpressionBuilder().addValue(value);

    const computed = getComputableValue(expression, {
      formulasMap: map,
    });

    expect(computed.value).toBe(200);
  });
});

describe("getOperatorCalculated", () => {
  const { map, formulas } = new ExpressionBuilder()
    .addValue(100)
    .addOperator(FormulaOperatorType.DIVISION)
    .addValue(100);

  it("returns value for 'value-operator-value' expression", () => {
    const computed = getOperatorCalculated(formulas, 1, { formulasMap: map });

    expect(computed?.value).toBe(1);
  });

  it("returns undefined if operator index incorrect", () => {
    const computed = getOperatorCalculated(formulas, 0, { formulasMap: map });

    expect(computed?.value).toBe(undefined);
  });

  it("returns undefined if empty expression", () => {
    const computed = getOperatorCalculated([], 2, { formulasMap: map });

    expect(computed?.value).toBe(undefined);
  });

  it("calculates 'value-operator-expression' expression", () => {
    const { map, formulas } = new ExpressionBuilder()
      .addValue(100)
      .addOperator(FormulaOperatorType.SUBTRACTION)
      .addExpression(
        new ExpressionBuilder()
          .addValue(200)
          .addOperator(FormulaOperatorType.ADDITION)
          .addValue(1)
      );

    const computed = getOperatorCalculated(formulas, 1, { formulasMap: map });

    expect(computed?.value).toBe(-101);
  });
});

describe("getOperatorComputed", () => {
  const operator = FormulaOperatorType.DIVISION;
  const { map, formulas } = new ExpressionBuilder()
    .addValue(10)
    .addOperator(operator)
    .addValue(2);

  it("returns same array if no operator matches", () => {
    const computed = getOperatorComputed(formulas, () => false, {
      formulasMap: map,
    });

    expect(computed).toEqual(formulas);
  });

  it("returns same array if operator not followed by value", () => {
    const operatorNotFollowedByValue = FormulaOperatorType.MULTIPLICATION;
    const { map, formulas } = new ExpressionBuilder()
      .addValue(10)
      .addOperator(operator)
      .addValue(2)
      .addOperator(operatorNotFollowedByValue);

    const computed = getOperatorComputed(
      formulas,
      ({ value }) => value === operatorNotFollowedByValue,
      {
        formulasMap: map,
      }
    );

    expect(computed).toEqual(formulas);
  });

  it("returns same array if operator not preceded by value", () => {
    const { map, formulas } = new ExpressionBuilder()
      .addOperator(operator)
      .addValue(2);

    const computed = getOperatorComputed(
      formulas,
      ({ value }) => value === operator,
      {
        formulasMap: map,
      }
    );

    expect(computed).toEqual(formulas);
  });

  it("returns computed value if operator can be computed", () => {
    const computed = getOperatorComputed(
      formulas,
      ({ value }) => value === operator,
      { formulasMap: map }
    );

    const [value] = computed;

    expect(computed).toHaveLength(1);
    expect(checkIsFormulaValue(value)).toBe(true);
    expect(value.value).toBe(5);
  });
});

describe("getExpressionResult", () => {
  it("calculates simple expression", () => {
    const { expression, map } = new ExpressionBuilder()
      .addValue(100)
      .addOperator(FormulaOperatorType.ADDITION)
      .addValue(200);

    const computed = getExpressionResult(expression.value, {
      formulasMap: map,
    });

    expect(computed.value).toEqual(300);
  });

  it("return first value if operator is in wrong position", () => {
    const firstValue = 100;
    const { expression, map } = new ExpressionBuilder()
      .addValue(firstValue)
      .addValue(200)
      .addOperator(FormulaOperatorType.ADDITION);

    const computed = getExpressionResult(expression.value, {
      formulasMap: map,
    });

    expect(computed.value).toEqual(firstValue);
  });

  it("returns calculated value for nested expression", () => {
    const value = 300;
    const { expression, map } = new ExpressionBuilder().addExpression(
      new ExpressionBuilder().addExpression(
        new ExpressionBuilder().addValue(value)
      )
    );

    const computed = getExpressionResult(expression.value, {
      formulasMap: map,
    });

    expect(computed.value).toBe(value);
  });

  it("returns calculated value for two expressions", () => {
    const expected = 6002;
    const { expression, map } = new ExpressionBuilder()
      .addExpression(
        new ExpressionBuilder()
          .addValue(100)
          .addOperator(FormulaOperatorType.DIVISION)
          .addValue(50)
      )
      .addOperator(FormulaOperatorType.ADDITION)
      .addExpression(
        new ExpressionBuilder()
          .addValue(200)
          .addOperator(FormulaOperatorType.MULTIPLICATION)
          .addValue(30)
      );

    const computed = getExpressionResult(expression.value, {
      formulasMap: map,
    });

    expect(computed.value).toBe(expected);
  });

  it("returns calculated expression operators in mathematical order", () => {
    const expected = 40;
    const { expression, map } = new ExpressionBuilder()
      .addValue(10)
      .addOperator(FormulaOperatorType.ADDITION)
      .addValue(20)
      .addOperator(FormulaOperatorType.MULTIPLICATION)
      .addValue(30)
      .addOperator(FormulaOperatorType.DIVISION)
      .addValue(10)
      .addOperator(FormulaOperatorType.DIVISION)
      .addValue(2);

    const computed = getExpressionResult(expression.value, {
      formulasMap: map,
    });

    expect(computed.value).toBe(expected);
  });
});
