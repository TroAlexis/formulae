import { selectFavorites } from "modules/favorites/selectors";
import { cloneFormulaSlice } from "modules/formulas/utils/slice";
import {
  addToMap,
  clearMap,
  deleteFromMap,
  editInMap,
} from "modules/map/actions";
import { spliceItem } from "utils/array";

import { createStoreMutationFactory } from "../utils/actions";
import { FavoritesActions, FavoritesStore } from "./models";

const createFavoritesMutation = createStoreMutationFactory<
  FavoritesActions,
  FavoritesStore
>();

export const addFavorite = createFavoritesMutation("addFavorite")(
  (state, favorite) => {
    const clonedFavorite = cloneFormulaSlice(favorite);

    state.favorites.push(clonedFavorite.id);

    addToMap(state, clonedFavorite.id, clonedFavorite);
  }
);

export const editFavorite = createFavoritesMutation("editFavorite")(
  (state, id, formula) => {
    editInMap(state, id, (slice) => {
      editInMap(slice, id, (value) => Object.assign(value, formula));
    });
  }
);

export const setFavorites = createFavoritesMutation("setFavorites")(
  (state, favorites) => {
    state.favorites = favorites.map((slice) => slice.id);

    clearMap(state);

    favorites.forEach((slice) => {
      addToMap(state, slice.id, slice);
    });
  }
);

export const removeFavorite = createFavoritesMutation("removeFavorite")(
  (state, id) => {
    const favorites = selectFavorites(state);

    spliceItem(favorites, id);

    deleteFromMap(state, id);
  }
);

export const setSearchText = createFavoritesMutation("setSearchText")(
  (state, text) => {
    state.search.text = text;
  }
);
