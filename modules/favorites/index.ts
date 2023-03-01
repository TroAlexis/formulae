import {
  createFormulasMapSlice,
  formulasMapInitialState,
} from "modules/formula";
import { editFormulaInMap } from "modules/formula/actions";
import { createUseHydratedStore } from "modules/utils/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory } from "../utils/actions";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
  setSearchText,
} from "./actions";
import { FavoritesActions, FavoritesState, FavoritesStore } from "./models";

const initialState: FavoritesState = {
  favorites: [],
  search: {
    text: "",
  },
};

const useFavoritesStoreHook = create<FavoritesStore>()(
  devtools(
    persist(
      immer((set) => {
        const createFavoritesAction = createStoreActionFactory<
          FavoritesActions,
          FavoritesStore
        >()(set);

        const mapSlice = createFormulasMapSlice(set);

        return {
          ...initialState,
          ...mapSlice,
          addFavorite: createFavoritesAction(addFavorite),
          setFavorites: createFavoritesAction(setFavorites),
          removeFavorite: createFavoritesAction(removeFavorite),
          setSearchText: createFavoritesAction(setSearchText),
          editFavorite: createFavoritesAction(editFormulaInMap),
        };
      }),
      {
        name: "favorites",
      }
    )
  )
);

export const useFavoritesStore = createUseHydratedStore(useFavoritesStoreHook, {
  ...initialState,
  ...formulasMapInitialState,
});
