import { createStoreSelector } from "../utils/selectors";
import { FavoritesStore } from "./models";

const createFavoritesSelector = createStoreSelector<FavoritesStore>();

export const selectFavorites = createFavoritesSelector("favorites");

export const selectAddFavorite = createFavoritesSelector("addFavorite");

export const selectRemoveFavorite = createFavoritesSelector("removeFavorite");
