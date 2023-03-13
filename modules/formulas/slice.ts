import {
  addFormula,
  closeExpression,
  editFormula,
  openExpression,
  removeFormula,
  replaceExpression,
  setSelectedExpressionId,
  toggleCollapseExpression,
} from "modules/formulas/actions";
import {
  FormulasActions,
  FormulasState,
  FormulasStore,
} from "modules/formulas/models";
import {
  createInitialExpression,
  createInitialValue,
} from "modules/formulas/utils/create";
import { createStoreActionFactory, StoreSet } from "modules/utils/actions";

const initialValue = createInitialValue();
const initialExpression = createInitialExpression();

const initialState: FormulasState = {
  rootExpressionId: initialExpression.id,
  selectedExpressionId: undefined,
  map: Object.fromEntries([
    [initialValue.id, initialValue],
    [initialExpression.id, initialExpression],
  ]),
};

export const createFormulasSlice = (set: StoreSet<FormulasStore>) => {
  const createFormulasAction = createStoreActionFactory<
    FormulasActions,
    FormulasStore
  >()(set);

  return {
    ...initialState,
    editFormula: createFormulasAction(editFormula),
    addFormula: createFormulasAction(addFormula),
    removeFormula: createFormulasAction(removeFormula),
    toggleCollapseExpression: createFormulasAction(toggleCollapseExpression),
    openExpression: createFormulasAction(openExpression),
    closeExpression: createFormulasAction(closeExpression),
    replaceExpression: createFormulasAction(replaceExpression),
    setSelectedExpressionId: createFormulasAction(setSelectedExpressionId),
  };
};
