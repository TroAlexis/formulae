import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  addFormula,
  closeExpression,
  editFormula,
  openExpression,
  pushCurrentExpressionIndex,
} from "./actions";
import { FormulaType } from "./enums";
import { FormulasState, FormulasStore } from "./models";
import { getBasicFormulaValue } from "./utils";

const initialState: FormulasState = {
  formulas: {
    id: "root-formula",
    type: FormulaType.EXPRESSION,
    value: [{ ...getBasicFormulaValue(), id: "base" }],
    name: "Root",
  },
};
export const useFormulasStore = create<FormulasStore>()(
  devtools(
    immer((set) => ({
      ...initialState,
      addFormula: (formula) =>
        set((state) => {
          addFormula(state, formula);
        }),
      editFormula: (index, formula) =>
        set((state) => {
          editFormula(state, index, formula);
        }),
      pushCurrentExpressionIndex: (index) =>
        set((state) => {
          pushCurrentExpressionIndex(state, index);
        }),
      openExpression: () =>
        set((state) => {
          openExpression(state);
        }),
      closeExpression: () => set((state) => closeExpression(state)),
    }))
  )
);
