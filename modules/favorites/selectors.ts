import { FormulaExpression } from "modules/formulas/models";
import { createSelectById, createTypedSelectMap } from "modules/map/selectors";
import { createSelector } from "reselect";
import { Maybe } from "types/types";
import { getMapItem } from "utils/map";
import { toLowerCaseTrim } from "utils/string";

import { createStoreSelector } from "../utils/selectors";
import { FavoritesMap, FavoritesStore } from "./models";

const createFavoritesSelector = createStoreSelector<FavoritesStore>();

export const selectFavorites = createFavoritesSelector("favorites");

export const selectFavoritesMap = createTypedSelectMap<FavoritesStore>();

export const selectFavoritesSearch = createFavoritesSelector("search");

export const selectFavoritesSearchText = createSelector(
  [selectFavoritesSearch],
  createFavoritesSelector("text")
);

export const selectFavoriteSliceById = createSelectById<FavoritesStore>();

const getFavoriteFromSlice = (
  map: FavoritesMap,
  id: string
): Maybe<FormulaExpression> => {
  const slice = getMapItem(id, map);

  if (!slice) {
    return undefined;
  }

  return getMapItem(id, slice.map);
};

export const selectFavoriteFormulaById = createSelector(
  [selectFavoritesMap, (_, id: string) => id],
  (...args) => getFavoriteFromSlice(...args)
);

export const selectFavoritesFilteredBySearchText = createSelector(
  [selectFavorites, selectFavoritesMap, selectFavoritesSearchText],
  (favorites, map, searchText = "") => {
    // Empty search - include all
    if (!searchText) {
      return favorites;
    }

    return favorites.filter((id) => {
      const favorite = getFavoriteFromSlice(map, id);

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
