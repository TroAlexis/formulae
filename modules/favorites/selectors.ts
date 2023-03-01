import { selectFormulasMap } from "modules/formula/selectors";
import { checkIsFormulaComputable } from "modules/formulas/utils/check";
import { createSelector } from "reselect";
import { getMapItem } from "utils/map";
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
  [selectFavorites, selectFormulasMap, selectFavoritesSearchText],
  (favorites, map, searchText = "") => {
    // Empty search - include all
    if (!searchText) {
      return favorites;
    }

    return favorites.filter((id) => {
      const favorite = getMapItem(id, map);

      if (!checkIsFormulaComputable(favorite)) {
        return false;
      }

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
