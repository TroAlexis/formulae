import { uuid } from "../../utils/uuid";
import { createStoreMutationFactory } from "../utils/actions";
import { FavoritesActions, FavoritesStore } from "./models";

const createFavoritesMutation = createStoreMutationFactory<
  FavoritesActions,
  FavoritesStore
>();

export const addFavorite = createFavoritesMutation("addFavorite")(
  (state, favorite) => {
    state.favorites.push({
      ...favorite,
      // Generate new id for computable to prevent duplicates
      id: uuid(),
    });
  }
);
