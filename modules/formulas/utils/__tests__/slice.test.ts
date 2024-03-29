import { ExpressionBuilder } from "__utils__/expression";
import { FormulaOperatorType } from "modules/formulas/enums";
import {
  FormulaExpression,
  FormulaMap,
  FormulaValue,
} from "modules/formulas/models";
import { createFormulaValue } from "modules/formulas/utils/create";
import {
  cloneFormulaSlice,
  getFormulaSlice,
} from "modules/formulas/utils/slice";
import { getLast } from "utils/array";
import { getMapItem } from "utils/map";

describe("getFormulaSlice", () => {
  it("returns scoped slice for primitive formulas", () => {
    const newValue = createFormulaValue({ value: 200 });
    const { map } = new ExpressionBuilder()
      .addValue(100)
      .addToExpression(newValue)
      .addValue(300);

    const slice = getFormulaSlice(newValue.id, map);

    expect(slice.id).toBe(newValue.id);
    expect(Object.keys(slice.map)).toHaveLength(1);
  });

  it("returns complete slice for expression including children", () => {
    const childExpression = new ExpressionBuilder()
      .addValue(100)
      .addOperator(FormulaOperatorType.ADDITION);
    const childExpressionId = childExpression.expression.id;

    const { map } = new ExpressionBuilder()
      .addValue(100)
      .addExpression(childExpression);

    const slice = getFormulaSlice(childExpressionId, map);

    expect(slice.id).toBe(childExpressionId);
    expect(slice.map).toEqual(childExpression.map);
  });
});

describe("cloneFormulaSlice", () => {
  it("returns cloned formula with different id", () => {
    const value = createFormulaValue({ value: 300 });
    const { map } = new ExpressionBuilder().addToExpression(value);

    const slice = getFormulaSlice(value.id, map);

    const clonedSlice = cloneFormulaSlice(slice);
    const clonedValue = getMapItem(clonedSlice.id, clonedSlice.map);

    expect(clonedSlice).not.toStrictEqual(slice);
    expect(clonedValue.value).toBe(value.value);
    expect(clonedValue.type).toBe(value.type);
  });

  describe("clones", () => {
    const outerId = "outer-id";
    const childExpressionBuilder = new ExpressionBuilder()
      .addValue(300, { ref: outerId })
      .addOperator(FormulaOperatorType.DIVISION)
      .addValue(100);
    const { expression: childExpression, map: childExpressionMap } =
      childExpressionBuilder;

    const firstChildExpressionValueId = childExpression.value[0];
    const { expression, map } = new ExpressionBuilder()
      .addValue(100, { ref: firstChildExpressionValueId })
      .addOperator(FormulaOperatorType.MULTIPLICATION)
      .addExpression(childExpressionBuilder);
    const slice = getFormulaSlice(expression.id, map);
    /* Setup */

    const clonedSlice = cloneFormulaSlice(slice);
    const clonedExpression = getMapItem(
      clonedSlice.id,
      clonedSlice.map
    ) as FormulaExpression;

    const clonedChildId = getLast(clonedExpression.value);
    const clonedChildExpression = getMapItem(
      clonedChildId,
      clonedSlice.map
    ) as FormulaExpression;

    const getFirstValue = (expression: FormulaExpression, map: FormulaMap) => {
      const [valueId] = expression.value;
      return getMapItem(valueId, map);
    };

    it("expression and children", () => {
      /* Setup */
      expect(clonedExpression.value).not.toEqual(expression.value);
      expect(clonedExpression.value).toHaveLength(expression.value.length);
    });

    it("child expression", () => {
      expect(clonedChildExpression.value).not.toEqual(childExpression.value);
      expect(clonedChildExpression.value).toHaveLength(
        childExpression.value.length
      );
      expect(clonedChildExpression.id).not.toBe(childExpression.id);
    });

    const childExpressionValue = getFirstValue(
      childExpression,
      childExpressionMap
    ) as FormulaValue;

    const clonedChildExpressionValue = getFirstValue(
      clonedChildExpression,
      clonedSlice.map
    ) as FormulaValue;

    it("child expression children", () => {
      expect(clonedChildExpressionValue.value).toBe(childExpressionValue.value);
      expect(clonedChildExpressionValue.id).not.toBe(childExpressionValue.id);
      expect(clonedChildExpressionValue.parentId).not.toBe(
        childExpressionValue.parentId
      );
    });

    it("leaves outer reference ids", () => {
      expect(clonedChildExpressionValue.ref).toBe(childExpressionValue.ref);
    });

    it("clones inner reference ids", () => {
      const clonedExpressionValue = getFirstValue(
        clonedExpression,
        clonedSlice.map
      ) as FormulaValue;
      expect(clonedExpressionValue.ref).toBe(clonedChildExpressionValue.id);
    });
  });
});
