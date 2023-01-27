import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory } from "../utils/actions";
import { addFavorite } from "./actions";
import { FavoritesActions, FavoritesState, FavoritesStore } from "./models";

const initialState: FavoritesState = {
  favorites: [],
};

export const useFavoritesStore = create<FavoritesStore>()(
  devtools(
    persist(
      immer((set) => {
        const createFavoritesAction = createStoreActionFactory<
          FavoritesActions,
          FavoritesStore
        >()(set);

        return {
          ...initialState,
          addFavorite: createFavoritesAction(addFavorite),
        };
      }),
      {
        name: "favorites",
      }
    )
  )
);
