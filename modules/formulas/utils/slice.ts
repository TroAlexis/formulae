import {
  Formula,
  FormulaExpression,
  FormulaMap,
  FormulaSlice,
} from "modules/formulas/models";
import {
  checkIsFormulaComputable,
  checkIsFormulaExpression,
} from "modules/formulas/utils/check";
import { getMapItem } from "utils/map";
import { uuid } from "utils/uuid";

type IdMap = Record<string, string>;
type CloneMeta = Pick<Formula, "parentId"> & {
  idMap?: IdMap;
};

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
  meta: CloneMeta = {}
): FormulaSlice => {
  const { id, map } = slice;
  const { idMap = {} } = meta;

  const formula = getMapItem(id, map);

  const newId = uuid();
  const clonedFormula = { ...formula, id: newId, ...meta };
  newMap[newId] = clonedFormula;
  idMap[id] = newId;

  if (
    checkIsFormulaExpression(formula) &&
    checkIsFormulaExpression(clonedFormula)
  ) {
    clonedFormula.value = cloneExpressionChildren(clonedFormula, map, newMap, {
      idMap,
    });
  }

  /* Clone ref ids for all formulas */
  Object.values(newMap).forEach((formula) => {
    if (checkIsFormulaComputable(formula)) {
      const { ref } = formula;
      /* Swap ref if is in cloned map, leave - if outside */
      formula.ref = ref ? idMap[ref] || ref : undefined;
    }
  });

  return { id: newId, map: newMap };
};

export const cloneExpressionChildren = (
  expression: FormulaExpression,
  map: FormulaMap,
  newMap: FormulaMap = {},
  meta: CloneMeta = {}
) => {
  return expression.value.reduce<string[]>((childIds, childId) => {
    const clonedChildModule = cloneFormulaSlice({ id: childId, map }, newMap, {
      ...meta,
      parentId: expression.id,
    });

    childIds.push(clonedChildModule.id);

    return childIds;
  }, []);
};
