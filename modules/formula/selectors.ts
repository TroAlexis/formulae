import { FormulasMapStore } from "modules/formula/models";
import { createStoreSelector } from "modules/utils/selectors";
import { createSelector } from "reselect";
import { getMapItem } from "utils/map";

const createFormulasMapSelector = createStoreSelector<FormulasMapStore>();

export const selectFormulasMap = createFormulasMapSelector("map");

/* Basic */
export const selectFormulaById = createSelector(
  [selectFormulasMap, (_, id: string) => id],
  (map, id) => getMapItem(id, map)
);
