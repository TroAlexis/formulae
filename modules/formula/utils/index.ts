import {
  Formula,
  FormulaExpression,
  FormulaSlice,
  FormulasMap,
} from "modules/formula/models";
import { checkIsFormulaExpression } from "modules/formulas/utils/check";
import { Maybe } from "types/types";
import { getMapItem, removeMapItem } from "utils/map";
import { uuid } from "utils/uuid";

export const getParentExpression = (
  id: string,
  map: FormulasMap
): Maybe<FormulaExpression> => {
  const formula = getMapItem(id, map);

  if (!formula) {
    return undefined;
  }

  const { parentId } = formula;

  if (parentId) {
    const parent = getMapItem(parentId, map);
    return checkIsFormulaExpression(parent) ? parent : undefined;
  }

  return undefined;
};

export const findExpressionChild = (
  formula: FormulaExpression,
  id: string,
  map: FormulasMap
): Maybe<Formula> => {
  const { value: childIds } = formula;

  const hasImmediateChild = childIds.includes(id);
  let childFound = hasImmediateChild ? getMapItem(id, map) : undefined;

  /* Keep searching in children expressions */
  for (const childId of childIds) {
    if (childFound) {
      return childFound;
    }

    const childFormula = getMapItem(childId, map);

    if (checkIsFormulaExpression(childFormula)) {
      childFound = findExpressionChild(childFormula, childId, map);
    }
  }

  return childFound;
};

export const removeExpressionChildren = (
  expression: FormulaExpression,
  map: FormulasMap
) => {
  type RemovedChildren = Array<(typeof map)[keyof typeof map]>;
  // Remove children recursively
  return expression.value.reduce<RemovedChildren>(
    (removedChildren, childId) => {
      const removedChild = removeMapItem(childId, map);

      if (removedChild) {
        removedChildren.push(removedChild);
      }

      if (checkIsFormulaExpression(removedChild)) {
        removedChildren.push(...removeExpressionChildren(removedChild, map));
      }

      return removedChildren;
    },
    []
  );
};

export const getFormulaSlice = (
  id: string,
  map: FormulasMap,
  newMap: FormulasMap = {}
): Maybe<FormulaSlice> => {
  const formula = getMapItem(id, map);

  if (!formula) {
    return undefined;
  }

  if (checkIsFormulaExpression(formula)) {
    formula.value.forEach((childId) => {
      getFormulaSlice(childId, map, newMap);
    });
  }

  newMap[id] = formula;

  return { id, map: newMap };
};

export const cloneFormulaSlice = (
  slice: FormulaSlice,
  newMap: FormulasMap = {},
  meta: Pick<Formula, "parentId"> = {}
): Maybe<FormulaSlice> => {
  const { id, map } = slice;

  const formula = getMapItem(id, map);

  if (!formula) {
    return undefined;
  }

  const newId = uuid();
  const clonedFormula = { ...formula, id: newId, ...meta };
  newMap[newId] = clonedFormula;

  if (
    checkIsFormulaExpression(formula) &&
    checkIsFormulaExpression(clonedFormula)
  ) {
    clonedFormula.value = cloneExpressionChildren(clonedFormula, map, newMap);
  }

  return { id: newId, map: newMap };
};

export const cloneExpressionChildren = (
  expression: FormulaExpression,
  map: FormulasMap,
  newMap: FormulasMap = {}
) => {
  return expression.value.reduce<string[]>((childIds, childId) => {
    const clonedChildModule = cloneFormulaSlice({ id: childId, map }, newMap, {
      parentId: expression.id,
    });

    if (clonedChildModule) {
      childIds.push(clonedChildModule.id);
    }

    return childIds;
  }, []);
};
