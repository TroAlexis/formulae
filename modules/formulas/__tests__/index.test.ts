import { ExpressionBuilder } from "__utils__/expression";
import { useFormulasStore } from "__utils__/stores";
import { act, renderHook } from "@testing-library/react";
import { FormulaOperatorType } from "modules/formulas/enums";
import { FormulaExpression, FormulasStore } from "modules/formulas/models";
import {
  selectActiveExpression,
  selectAddFormula,
  selectEditFormula,
  selectFormulaById,
  selectOpenExpression,
  selectRemoveFormula,
  selectReplaceExpression,
  selectRootExpression,
  selectRootExpressionId,
  selectSelectedExpressionId,
  selectSetSelectedExpressionId,
  selectToggleCollapseExpression,
} from "modules/formulas/selectors";
import {
  createFormulaOperator,
  createFormulaValue,
} from "modules/formulas/utils/create";
import { getLast } from "utils/array";
import { StateSelector } from "zustand";

describe("Formulas store", () => {
  const renderSelector = <U>(selector: StateSelector<FormulasStore, U>) => {
    const { result } = renderHook(() => useFormulasStore(selector));

    return result;
  };

  const getFormula = (id: string) =>
    renderSelector((state) => selectFormulaById(state, id));

  const rootExpression = renderSelector(selectRootExpression);
  const addFormula = renderSelector(selectAddFormula);
  const editFormula = renderSelector(selectEditFormula);
  const removeFormula = renderSelector(selectRemoveFormula);
  const replaceExpression = renderSelector(selectReplaceExpression);
  const openExpression = renderSelector(selectOpenExpression);
  const setSelectedExpressionId = renderSelector(selectSetSelectedExpressionId);

  const createOpenExpression = () => {
    const activeExpression = renderSelector(selectActiveExpression);

    const openExpressionAndGetId = () => {
      act(() => {
        openExpression.current();
      });

      return activeExpression.current.id;
    };

    return { openExpressionAndGetId, activeExpression };
  };

  const createGetExpression = () => {
    const { openExpressionAndGetId } = createOpenExpression();

    const expressionId = openExpressionAndGetId();
    const expression = getFormula(expressionId);

    const getExpression = () => expression.current as FormulaExpression;

    return { getExpression };
  };

  it("addFormula", () => {
    const formulaOperator = createFormulaOperator({
      value: FormulaOperatorType.ADDITION,
    });

    act(() => {
      addFormula.current(formulaOperator);
    });

    const activeExpression = renderSelector(selectActiveExpression);
    const lastFormula = getLast(activeExpression.current.value);

    expect(lastFormula).toBe(formulaOperator.id);
  });

  it("editFormula", () => {
    const formulaValue = createFormulaValue({ value: 200 });
    const newValue = 300;

    act(() => {
      addFormula.current(formulaValue);
      editFormula.current(formulaValue.id, { value: newValue });
    });

    const formula = getFormula(formulaValue.id);

    expect(formula.current.value).toBe(newValue);
  });

  describe("removeFormula", () => {
    it("deletes from parent expression and map", () => {
      const formulaValue = createFormulaValue();
      act(() => {
        addFormula.current(formulaValue);
        removeFormula.current(formulaValue.id);
      });

      const formula = getFormula(formulaValue.id);
      const activeExpression = renderSelector(selectActiveExpression);

      expect(activeExpression.current.value).not.toContain(formulaValue.id);
      expect(formula.current).not.toBeDefined();
    });

    it("selects parent of deleted expression if it is selected", () => {
      const { expression } = new ExpressionBuilder();

      act(() => {
        addFormula.current(expression);
        setSelectedExpressionId.current(expression.id);
        removeFormula.current(expression.id);
      });

      const activeExpression = renderSelector(selectActiveExpression);

      expect(activeExpression.current.id).toBe(rootExpression.current.id);
    });

    it("selects parent of deleted expression if its child is selected", () => {
      const { openExpressionAndGetId, activeExpression } =
        createOpenExpression();

      const parentId = openExpressionAndGetId();
      const parentToDeleteId = openExpressionAndGetId();
      openExpressionAndGetId();
      openExpressionAndGetId();

      act(() => {
        removeFormula.current(parentToDeleteId);
      });

      expect(activeExpression.current.id).toBe(parentId);
    });
  });

  describe("replaceFormula", () => {
    it("replaces with new expression, inherits parent id, and skips selection", () => {
      const activeExpression = renderSelector(selectActiveExpression);
      const rootExpressionId = renderSelector(selectRootExpressionId);
      const { expression: replacedExpression } = new ExpressionBuilder();
      const { slice } = new ExpressionBuilder();

      act(() => {
        addFormula.current(replacedExpression);
      });

      const replacedExpressionParentId = getFormula(replacedExpression.id)
        .current.parentId;

      act(() => {
        replaceExpression.current(replacedExpression.id, slice);
      });

      const lastFormula = getLast(activeExpression.current.value);
      const newExpression = getFormula(lastFormula);

      expect(lastFormula).not.toBe(replacedExpression.id);
      expect(newExpression).toBeDefined();
      expect(activeExpression.current.id).toBe(rootExpressionId.current);
      expect(newExpression.current.parentId).toBe(replacedExpressionParentId);
    });

    it("replaces selected expression and selects the replacer", () => {
      const { slice } = new ExpressionBuilder();

      act(() => {
        openExpression.current();
      });

      const activeExpression = renderSelector(selectActiveExpression);
      const replacedExpressionId = activeExpression.current.id;

      act(() => {
        replaceExpression.current(replacedExpressionId, slice);
      });

      const rootExpression = renderSelector(selectRootExpression);
      const newExpressionId = getLast(rootExpression.current.value);

      expect(activeExpression.current.id).not.toBe(replacedExpressionId);
      expect(activeExpression.current.id).toBe(newExpressionId);
    });

    it("replaces and selects replacer if child of replaced expression is selected", () => {
      const { openExpressionAndGetId } = createOpenExpression();

      const parentId = openExpressionAndGetId();
      const childId = openExpressionAndGetId();
      const nestedChildId = openExpressionAndGetId();

      act(() => {
        replaceExpression.current(childId, new ExpressionBuilder().slice);
      });

      const parentExpression = getFormula(parentId)
        .current as FormulaExpression;
      const newExpressionId = getLast(parentExpression.value);

      const activeExpressionId = renderSelector(
        selectSelectedExpressionId
      ).current;

      expect(activeExpressionId).not.toBe(nestedChildId);
      expect(activeExpressionId).toBe(newExpressionId);
    });
  });

  describe("toggleCollapseExpression", () => {
    const toggleCollapseExpression = renderSelector(
      selectToggleCollapseExpression
    );

    it("changes toggle value to passed as parameter", () => {
      const { getExpression } = createGetExpression();
      const value = false;
      act(() => {
        toggleCollapseExpression.current(getExpression().id, value);
      });

      expect(getExpression().collapsed).toBe(value);
    });

    it("toggles value if no parameter passed", () => {
      const { getExpression } = createGetExpression();
      const expression = getExpression();

      act(() => {
        toggleCollapseExpression.current(expression.id);
      });

      expect(getExpression().collapsed).toBe(true);
    });
  });

  describe("openExpression", () => {
    it("wraps last value of current expression into expression", () => {
      const { getExpression } = createGetExpression();
      const expression = getExpression();
      const parentExpression = getFormula(expression.parentId!);

      const value = getFormula(getLast(expression.value));
      const valueId = value.current.id;

      expect(expression.value).toEqual([valueId]);
      expect(parentExpression.current.value).toHaveLength(1);
      expect(parentExpression.current.value).not.toContain(valueId);
      expect(parentExpression.current.value).toContain(expression.id);
    });

    it("creates new expression with an empty value", () => {
      act(() => {
        addFormula.current(
          createFormulaOperator({ value: FormulaOperatorType.ADDITION })
        );
      });

      const { getExpression } = createGetExpression();
      const expression = getExpression();
      const parentExpression = getFormula(expression.parentId!);
      const parentExpressionValue = getLast(
        parentExpression.current.value as never
      );
      const expressionValue = getLast(expression.value);

      expect(parentExpression.current.value).toHaveLength(3);
      expect(parentExpression.current.value).toContain(expression.id);
      expect(expressionValue).not.toEqual(parentExpressionValue);
    });
  });
});
