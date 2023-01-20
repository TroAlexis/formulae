import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Formula, FormulasState, FormulasStore } from "./models";

const initialState: FormulasState = {
  formulas: [],
};

export const useFormulasStore = create<FormulasStore>()(
  immer((set) => ({
    ...initialState,
    addFormula: (formula: Formula) =>
      set(({ formulas }) => {
        formulas.push(formula);
      }),
  }))
);
