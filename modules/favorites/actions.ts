import { selectFavoriteById } from "modules/favorites/selectors";
import { cloneFormula } from "modules/formulas/utils";

import { createStoreMutationFactory } from "../utils/actions";
import { FavoritesActions, FavoritesStore } from "./models";

const createFavoritesMutation = createStoreMutationFactory<
  FavoritesActions,
  FavoritesStore
>();

export const addFavorite = createFavoritesMutation("addFavorite")(
  (state, favorite) => {
    const clonedFavorite = cloneFormula(favorite);

    state.favorites.push(clonedFavorite);
  }
);

export const setFavorites = createFavoritesMutation("setFavorites")(
  (state, favorites) => {
    state.favorites = favorites.map((formula) => cloneFormula(formula));
  }
);

export const editFavorite = createFavoritesMutation("editFavorite")(
  (state, id, favorite) => {
    const editedFavorite = selectFavoriteById(state, id);

    if (!editedFavorite) {
      return;
    }

    Object.assign(editedFavorite, favorite);
  }
);

export const removeFavorite = createFavoritesMutation("removeFavorite")(
  (state, id) => {
    const indexOfItem = state.favorites.findIndex((item) => item.id === id);

    state.favorites.splice(indexOfItem, 1);
  }
);

export const setSearchText = createFavoritesMutation("setSearchText")(
  (state, text) => {
    state.search.text = text;
  }
);
