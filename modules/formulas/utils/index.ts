import {
  Formula,
  FormulaComputable,
  FormulaExpression,
  FormulaMap,
} from "modules/formulas/models";
import { checkIsFormulaExpression } from "modules/formulas/utils/check";
import { Maybe } from "types/types";
import { getMapItem, removeMapItem } from "utils/map";

export const getComputableShortId = (computable: FormulaComputable) => {
  const [shortId] = computable.id.split("-");

  return shortId;
};
export const getParentExpression = (
  id: string,
  map: FormulaMap
): Maybe<FormulaExpression> => {
  const formula = getMapItem(id, map);

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
  map: FormulaMap
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
      childFound = findExpressionChild(childFormula, id, map);
    }
  }

  return childFound;
};
export const removeExpressionChildren = (
  expression: FormulaExpression,
  map: FormulaMap
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
