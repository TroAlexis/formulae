import { createSelectById, createTypedSelectMap } from "modules/map/selectors";
import { createSelector } from "reselect";
import { getMapItem } from "utils/map";
import { toLowerCaseTrim } from "utils/string";

import { createStoreSelector } from "../utils/selectors";
import { FavoritesStore } from "./models";

const createFavoritesSelector = createStoreSelector<FavoritesStore>();

export const selectFavorites = createFavoritesSelector("favorites");

export const selectFavoritesMap = createTypedSelectMap<FavoritesStore>();

export const selectFavoritesSearch = createFavoritesSelector("search");

export const selectFavoritesSearchText = createSelector(
  [selectFavoritesSearch],
  createFavoritesSelector("text")
);

export const selectFavoriteSliceById = createSelectById<FavoritesStore>();

export const selectFavoriteFormulaById = createSelector(
  [selectFavoritesMap, (_, id: string) => id],
  (map, id) => {
    const slice = getMapItem(id, map);

    if (!slice) {
      return undefined;
    }

    return getMapItem(id, slice.map);
  }
);

export const selectFavoritesFilteredBySearchText = createSelector(
  [selectFavorites, selectFavoritesMap, selectFavoritesSearchText],
  (favorites, map, searchText = "") => {
    // Empty search - include all
    if (!searchText) {
      return favorites;
    }

    return favorites.filter((id) => {
      const slice = getMapItem(id, map);
      const favorite = getMapItem(id, slice.map);

      // No name - exclude
      if (!favorite?.name) {
        return false;
      }

      const [name, text] = [favorite.name, searchText].map(toLowerCaseTrim);

      return name.includes(text);
    });
  }
);

export const selectAddFavorite = createFavoritesSelector("addFavorite");

export const selectSetFavorites = createFavoritesSelector("setFavorites");

export const selectRemoveFavorite = createFavoritesSelector("removeFavorite");

export const selectEditFavorite = createFavoritesSelector("editFavorite");

export const selectFavoritesSetSearchText =
  createFavoritesSelector("setSearchText");
