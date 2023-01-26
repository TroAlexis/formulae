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

const initialState: FormulasState = {
  formulas: {
    id: "root-formula",
    type: FormulaType.EXPRESSION,
    // Set id to static value to prevent hydration errors
    value: [{ ...getBasicFormulaValue(), id: "base" }],
    name: "Root",
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
