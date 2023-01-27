import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory } from "../utils/actions";
import {
  addFormula,
  closeExpression,
  editFormula,
  openExpression,
  pushCurrentExpressionIndex,
} from "./actions";
import { FormulaType } from "./enums";
import { FormulasActions, FormulasState, FormulasStore } from "./models";
import { getBasicFormulaValue } from "./utils";

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
