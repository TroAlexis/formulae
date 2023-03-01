import { selectFavorites } from "modules/favorites/selectors";
import { clearFormulaMap, deleteFormulaFromMap } from "modules/formula/actions";
import { selectFormulasMap } from "modules/formula/selectors";
import { cloneFormulaSlice } from "modules/formula/utils";
import { spliceItem } from "utils/array";
import { mergeMaps } from "utils/map";

import { createStoreMutationFactory } from "../utils/actions";
import { FavoritesActions, FavoritesStore } from "./models";

const createFavoritesMutation = createStoreMutationFactory<
  FavoritesActions,
  FavoritesStore
>();

export const addFavorite = createFavoritesMutation("addFavorite")(
  (state, favorite) => {
    const clonedFavorite = cloneFormulaSlice(favorite);
    const map = selectFormulasMap(state);

    if (clonedFavorite) {
      state.favorites.push(clonedFavorite.id);

      mergeMaps(map, clonedFavorite.map);
    }
  }
);

export const setFavorites = createFavoritesMutation("setFavorites")(
  (state, favorites) => {
    state.favorites = favorites.map((slice) => slice.id);

    clearFormulaMap(state);

    const map = selectFormulasMap(state);

    favorites.forEach((slice) => {
      mergeMaps(map, slice.map);
    });
  }
);

export const removeFavorite = createFavoritesMutation("removeFavorite")(
  (state, id) => {
    const favorites = selectFavorites(state);

    spliceItem(favorites, id);

    deleteFormulaFromMap(state, id);
  }
);

export const setSearchText = createFavoritesMutation("setSearchText")(
  (state, text) => {
    state.search.text = text;
  }
);
