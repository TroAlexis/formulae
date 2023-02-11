import { createSelector } from "reselect";
import { toLowerCaseTrim } from "utils/string";

import { createStoreSelector } from "../utils/selectors";
import { FavoritesStore } from "./models";

const createFavoritesSelector = createStoreSelector<FavoritesStore>();

export const selectFavorites = createFavoritesSelector("favorites");

export const selectFavoritesSearch = createFavoritesSelector("search");

export const selectFavoritesSearchText = createSelector(
  [selectFavoritesSearch],
  createFavoritesSelector("text")
);

export const selectFavoritesFilteredBySearchText = createSelector(
  [selectFavorites, selectFavoritesSearchText],
  (favorites, searchText = "") => {
    // Empty search - include all
    if (!searchText) {
      return favorites;
    }

    return favorites.filter((item) => {
      // No name - exclude
      if (!item.name) {
        return false;
      }

      const [name, text] = [item.name, searchText].map(toLowerCaseTrim);

      return name.includes(text);
    });
  }
);

export const selectAddFavorite = createFavoritesSelector("addFavorite");

export const selectRemoveFavorite = createFavoritesSelector("removeFavorite");

export const selectFavoritesSetSearchText =
  createFavoritesSelector("setSearchText");
