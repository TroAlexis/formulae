import {
  Formula,
  FormulaExpression,
  FormulaMap,
  FormulaSlice,
} from "modules/formulas/models";
import { checkIsFormulaExpression } from "modules/formulas/utils/check";
import { getMapItem } from "utils/map";
import { uuid } from "utils/uuid";

export const getFormulaSlice = (
  id: string,
  map: FormulaMap,
  newMap: FormulaMap = {}
): FormulaSlice => {
  const formula = getMapItem(id, map);

  newMap[id] = formula;

  if (checkIsFormulaExpression(formula)) {
    formula.value.forEach((childId) => {
      getFormulaSlice(childId, map, newMap);
    });
  }

  return { id, map: newMap };
};

export const cloneFormulaSlice = (
  slice: FormulaSlice,
  newMap: FormulaMap = {},
  meta: Pick<Formula, "parentId"> = {}
): FormulaSlice => {
  const { id, map } = slice;

  const formula = getMapItem(id, map);

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
  map: FormulaMap,
  newMap: FormulaMap = {}
) => {
  return expression.value.reduce<string[]>((childIds, childId) => {
    const clonedChildModule = cloneFormulaSlice({ id: childId, map }, newMap, {
      parentId: expression.id,
    });

    childIds.push(clonedChildModule.id);

    return childIds;
  }, []);
};
