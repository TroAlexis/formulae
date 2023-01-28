import {
  addFormula,
  closeExpression,
  editFormula,
  openExpression,
  pushCurrentExpressionIndex,
} from "modules/formulas/actions";
import { FormulaType } from "modules/formulas/enums";
import {
  FormulasActions,
  FormulasState,
  FormulasStore,
} from "modules/formulas/models";
import { getBasicFormulaValue } from "modules/formulas/utils";
import { createStoreActionFactory } from "modules/utils/actions";
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
};

export const useFormulasStore = create<FormulasStore>()(
  devtools(
    immer((set) => {
      const createFormulasAction = createStoreActionFactory<
        FormulasActions,
        FormulasStore
      >()(set);

      return {
        ...initialState,
        addFormula: createFormulasAction(addFormula),
        editFormula: createFormulasAction(editFormula),
        pushCurrentExpressionIndex: createFormulasAction(
          pushCurrentExpressionIndex
        ),
        openExpression: createFormulasAction(openExpression),
        closeExpression: createFormulasAction(closeExpression),
      };
    })
  )
);
