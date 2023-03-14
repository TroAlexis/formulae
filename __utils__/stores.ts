import { FavoritesStore } from "modules/favorites/models";
import { createFavoritesSlice } from "modules/favorites/slice";
import { FormulasStore } from "modules/formulas/models";
import { createFormulasSlice } from "modules/formulas/slice";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useFormulasStore = create<FormulasStore>()(
  immer(createFormulasSlice)
);
export const useFavoritesStore = create<FavoritesStore>()(
  immer(createFavoritesSlice)
);
