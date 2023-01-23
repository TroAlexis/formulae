import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { uuid } from "../../utils/uuid";
import { FormulaType } from "./enums";
import { Formula, FormulasState, FormulasStore } from "./models";
import { selectActiveExpression, selectFormulas } from "./selectors";
import { getBasicFormulaValue, getFormulaByIndex } from "./utils";

const initialState: FormulasState = {
  formulas: {
    id: "root-formula",
    type: FormulaType.EXPRESSION,
    value: [{ ...getBasicFormulaValue(), id: "base" }],
    name: "Root",
  },
};

export const useFormulasStore = create<FormulasStore>()(
  devtools((set) => ({
    ...initialState,
    addFormula: (formula) =>
      set(
        produce((state) => {
          const currentExpression = selectActiveExpression(state);
          const newFormula = { ...formula, id: uuid() } as Formula;
          currentExpression.value.push(newFormula);
        })
      ),
    editFormula: (index, formula) =>
      set(
        produce((state) => {
          const formulas = selectFormulas(state);
          const editedFormula = getFormulaByIndex(formulas, index);
          Object.assign(editedFormula, formula);
        })
      ),
  }))
);
