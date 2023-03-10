import { debounce } from "debounce";
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
import { FORMULAS_TEMPORAL_LIMIT } from "modules/formulas/consts";
import {
  FormulasActions,
  FormulasState,
  FormulasStore,
} from "modules/formulas/models";
import {
  createInitialExpression,
  createInitialValue,
} from "modules/formulas/utils/create";
import { createStoreActionFactory } from "modules/utils/actions";
import { createUseTemporalStore } from "modules/utils/store";
import { QUARTER_SECOND } from "types/consts";
import { temporal } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

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

export const useFormulasStore = create<FormulasStore>()(
  devtools(
    temporal(
      immer((set) => {
        const createFormulasAction = createStoreActionFactory<
          FormulasActions,
          FormulasStore
        >()(set);

        return {
          ...initialState,
          editFormula: createFormulasAction(editFormula),
          addFormula: createFormulasAction(addFormula),
          removeFormula: createFormulasAction(removeFormula),
          toggleCollapseExpression: createFormulasAction(
            toggleCollapseExpression
          ),
          openExpression: createFormulasAction(openExpression),
          closeExpression: createFormulasAction(closeExpression),
          replaceExpression: createFormulasAction(replaceExpression),
          setSelectedExpressionId: createFormulasAction(
            setSelectedExpressionId
          ),
        };
      }),
      {
        limit: FORMULAS_TEMPORAL_LIMIT,
        handleSet: (handleSet) => debounce(handleSet, QUARTER_SECOND, true),
      }
    )
  )
);

export const useFormulasStoreTemporal = createUseTemporalStore(
  useFormulasStore.temporal
);
