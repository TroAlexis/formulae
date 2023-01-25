import { create, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { OmitFirst } from "../../types/types";
import {
  addFormula,
  closeExpression,
  editFormula,
  openExpression,
  pushCurrentExpressionIndex,
} from "./actions";
import { FormulaType } from "./enums";
import { FormulasActions, FormulasState, FormulasStore } from "./models";
import { StoreAction } from "./types";
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

type FormulasStoreAction = StoreAction<keyof FormulasActions, FormulasStore>;

const createFormulasStoreAction =
  <
    A extends FormulasStoreAction,
    S extends StoreApi<FormulasStore>["setState"]
  >(
    action: A,
    set: S
  ) =>
  (...args: OmitFirst<Parameters<A>>) =>
    set((state) => action(state, ...args));

export const useFormulasStore = create<FormulasStore>()(
  devtools(
    immer((set) => {
      const createFormulasAction = <
        A extends StoreAction<keyof FormulasActions, any>
      >(
        action: A
      ) => createFormulasStoreAction(action, set);

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
