import { FormulasMapActions, FormulasMapStore } from "modules/formula/models";
import { selectFormulasMap } from "modules/formula/selectors";
import { removeExpressionChildren } from "modules/formula/utils";
import { checkIsFormulaExpression } from "modules/formulas/utils/check";
import { createStoreMutationFactory } from "modules/utils/actions";
import { removeMapItem } from "utils/map";

const createMutation = createStoreMutationFactory<
  FormulasMapActions,
  FormulasMapStore
>();

export const addFormulaToMap = createMutation("addFormulaToMap")(
  (state, formula) => {
    const map = selectFormulasMap(state);

    map[formula.id] = formula;
  }
);

export const editFormulaInMap = createMutation("editFormulaInMap")(
  (state, id, formula) => {
    const map = selectFormulasMap(state);

    const editedFormula = map[id];

    if (editedFormula) {
      Object.assign(editedFormula, formula);
    }
  }
);

export const deleteFormulaFromMap = createMutation("deleteFormulaFromMap")(
  (state, id) => {
    const map = selectFormulasMap(state);
    const formula = removeMapItem(id, map);

    if (checkIsFormulaExpression(formula)) {
      removeExpressionChildren(formula, map);
    }

    return formula;
  }
);

export const clearFormulaMap = createMutation("clearFormulaMap")((state) => {
  state.map = {};
});
