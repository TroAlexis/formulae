import { ExpressionBuilder } from "__utils__/expression";
import { FormulaOperatorType } from "modules/formulas/enums";
import { createFormulaValue } from "modules/formulas/utils/create";
import {
  findExpressionChild,
  getParentExpression,
  removeExpressionChildren,
} from "modules/formulas/utils/index";
import { getMapItem } from "utils/map";

describe("getParentExpression", () => {
  it("returns undefined if no parent", () => {
    const { expression, map } = new ExpressionBuilder();

    expect(getParentExpression(expression.id, map)).toBe(undefined);
  });

  it("returns undefined if element found is not expression", () => {
    const expressionValue = createFormulaValue({ value: 100 });
    const { map } = new ExpressionBuilder().addToExpression(expressionValue);
    const randomValue = createFormulaValue({
      value: 200,
      parentId: expressionValue.id,
    });
    map[randomValue.id] = randomValue;

    expect(getParentExpression(randomValue.id, map)).toBe(undefined);
  });

  it("returns parent expression", () => {
    const { expression, map } = new ExpressionBuilder().addValue(100);

    const [value] = expression.value;
    expect(getParentExpression(value, map)).toBe(expression);
  });

  it("returns parent expression for nested expressions", () => {
    const nestedExpression = new ExpressionBuilder().addValue(200);
    const { map } = new ExpressionBuilder()
      .addValue(100)
      .addOperator(FormulaOperatorType.SUBTRACTION)
      .addExpression(nestedExpression);

    const [value] = nestedExpression.expression.value;
    expect(getParentExpression(value, map)).toBe(nestedExpression.expression);
  });
});

describe("findExpressionChild", () => {
  it("returns undefined if no child by id", () => {
    const { expression, map } = new ExpressionBuilder().addValue(100);

    expect(findExpressionChild(expression, "non-existent-id", map)).toBe(
      undefined
    );
  });

  it("returns child if one", () => {
    const child = createFormulaValue({ value: 200 });

    const { expression, map } = new ExpressionBuilder().addToExpression(child);

    const childFound = findExpressionChild(expression, child.id, map);

    expect(childFound?.id).toBe(child.id);
  });

  it("returns deeply nested child", () => {
    const child = createFormulaValue({ value: 200 });

    const { expression, map } = new ExpressionBuilder()
      .addValue(100)
      .addOperator(FormulaOperatorType.SUBTRACTION)
      .addExpression(
        new ExpressionBuilder()
          .addValue(200)
          .addOperator(FormulaOperatorType.DIVISION)
          .addExpression(
            new ExpressionBuilder().addExpression(
              new ExpressionBuilder().addToExpression(child)
            )
          )
      );

    const childFound = findExpressionChild(expression, child.id, map);

    expect(childFound?.id).toBe(child.id);
  });
});

describe("removeExpressionChildren", () => {
  const getExpression = () =>
    new ExpressionBuilder()
      .addValue(100)
      .addOperator(FormulaOperatorType.ADDITION)
      .addExpression(
        new ExpressionBuilder()
          .addValue(200)
          .addOperator(FormulaOperatorType.MULTIPLICATION)
          .addValue(2)
      );

  it("removes all expression children from map", () => {
    const { expression, map } = getExpression();

    const removedChildren = removeExpressionChildren(expression, map);

    expect(removedChildren.length).toBe(6);

    removedChildren.forEach((child) => {
      expect(getMapItem(child.id, map)).toBe(undefined);
    });
  });

  it("removes only children, keeps expression in map", () => {
    const { expression, map } = getExpression();

    removeExpressionChildren(expression, map);

    expect(getMapItem(expression.id, map)).toBe(expression);
  });
});
