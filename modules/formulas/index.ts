import { debounce } from "debounce";
import {
  addFormula,
  closeExpression,
  editFormula,
  openExpression,
  pushCurrentExpressionIndex,
  removeFormula,
  replaceExpression,
  setCurrentExpressionIndex,
  toggleCollapseExpression,
} from "modules/formulas/actions";
import { FORMULAS_TEMPORAL_LIMIT } from "modules/formulas/consts";
import { FormulaType } from "modules/formulas/enums";
import {
  FormulasActions,
  FormulasState,
  FormulasStore,
} from "modules/formulas/models";
import { getBasicFormulaValue } from "modules/formulas/utils";
import { createStoreActionFactory } from "modules/utils/actions";
import { createUseTemporalStore } from "modules/utils/store";
import { QUARTER_SECOND } from "types/consts";
import { temporal } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const STATIC_FORMULA_ID = "new-formula";
export const STATIC_VALUE_ID = "new-value";

const initialState: FormulasState = {
  formulas: {
    id: STATIC_FORMULA_ID,
    type: FormulaType.EXPRESSION,
    // Set id to static value to prevent hydration errors
    value: [{ ...getBasicFormulaValue(), id: STATIC_VALUE_ID }],
    name: "New formula",
  },
  currentExpressionIndex: [],
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
          addFormula: createFormulasAction(addFormula),
          editFormula: createFormulasAction(editFormula),
          removeFormula: createFormulasAction(removeFormula),
          toggleCollapseExpression: createFormulasAction(
            toggleCollapseExpression
          ),
          pushCurrentExpressionIndex: createFormulasAction(
            pushCurrentExpressionIndex
          ),
          openExpression: createFormulasAction(openExpression),
          closeExpression: createFormulasAction(closeExpression),
          replaceExpression: createFormulasAction(replaceExpression),
          setCurrentExpressionIndex: createFormulasAction(
            setCurrentExpressionIndex
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
