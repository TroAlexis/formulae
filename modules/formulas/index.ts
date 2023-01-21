import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { FormulasState, FormulasStore } from "./models";
import { selectFormulas } from "./selectors";

const initialState: FormulasState = {
  formulas: [],
};

export const useFormulasStore = create<FormulasStore>()(
  immer((set) => ({
    ...initialState,
    addFormula: (formula) =>
      set((state) => {
        const formulas = selectFormulas(state);
        formulas.push(formula);
      }),
    editFormula: (index, formula) =>
      set((state) => {
        const formulas = selectFormulas(state);
        formulas[index] = Object.assign(formulas[index], formula);
      }),
  }))
);
