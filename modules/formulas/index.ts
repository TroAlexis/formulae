import { debounce } from "debounce";
import { FORMULAS_TEMPORAL_LIMIT } from "modules/formulas/consts";
import { FormulasStore } from "modules/formulas/models";
import { createFormulasSlice } from "modules/formulas/slice";
import { createUseTemporalStore } from "modules/utils/store";
import { QUARTER_SECOND } from "types/consts";
import { temporal } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useFormulasStore = create<FormulasStore>()(
  devtools(
    temporal(immer(createFormulasSlice), {
      limit: FORMULAS_TEMPORAL_LIMIT,
      handleSet: (handleSet) => debounce(handleSet, QUARTER_SECOND, true),
    })
  )
);

export const useFormulasStoreTemporal = createUseTemporalStore(
  useFormulasStore.temporal
);
