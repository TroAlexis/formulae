import {
  addFavorite,
  editFavorite,
  removeFavorite,
  setFavorites,
  setSearchText,
} from "modules/favorites/actions";
import {
  FavoritesActions,
  FavoritesState,
  FavoritesStore,
} from "modules/favorites/models";
import { createStoreActionFactory, StoreSet } from "modules/utils/actions";

export const favoritesInitialState: FavoritesState = {
  favorites: [],
  map: {},
  search: {
    text: "",
  },
};

export const createFavoritesSlice = (set: StoreSet<FavoritesStore>) => {
  const createFavoritesAction = createStoreActionFactory<
    FavoritesActions,
    FavoritesStore
  >()(set);

  return {
    ...favoritesInitialState,
    addFavorite: createFavoritesAction(addFavorite),
    setFavorites: createFavoritesAction(setFavorites),
    removeFavorite: createFavoritesAction(removeFavorite),
    setSearchText: createFavoritesAction(setSearchText),
    editFavorite: createFavoritesAction(editFavorite),
  };
};
