import {
  addFormulaToMap,
  clearFormulaMap,
  deleteFormulaFromMap,
  editFormulaInMap,
} from "modules/formula/actions";
import {
  FormulasMapActions,
  FormulasMapState,
  FormulasMapStore,
} from "modules/formula/models";
import { createStoreActionFactory, StoreSet } from "modules/utils/actions";

export const formulasMapInitialState: FormulasMapState = {
  map: {},
};

export const createFormulasMapSlice = (
  set: StoreSet<FormulasMapStore>,
  initialState = formulasMapInitialState
) => {
  const createFormulasAction = createStoreActionFactory<
    FormulasMapActions,
    FormulasMapStore
  >()(set);

  return {
    ...initialState,
    deleteFormulaFromMap: createFormulasAction(deleteFormulaFromMap),
    addFormulaToMap: createFormulasAction(addFormulaToMap),
    editFormulaInMap: createFormulasAction(editFormulaInMap),
    clearFormulaMap: createFormulasAction(clearFormulaMap),
  };
};
