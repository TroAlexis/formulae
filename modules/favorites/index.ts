import { createUseHydratedStore } from "modules/utils/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createStoreActionFactory } from "../utils/actions";
import {
  addFavorite,
  editFavorite,
  removeFavorite,
  setSearchText,
} from "./actions";
import { FavoritesActions, FavoritesState, FavoritesStore } from "./models";

const initialState: FavoritesState = {
  favorites: [],
  search: {
    text: "",
  },
};

const useFavoritesStoreHook = create<FavoritesStore>()(
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
          removeFavorite: createFavoritesAction(removeFavorite),
          setSearchText: createFavoritesAction(setSearchText),
          editFavorite: createFavoritesAction(editFavorite),
        };
      }),
      {
        name: "favorites",
      }
    )
  )
);

export const useFavoritesStore = createUseHydratedStore(
  useFavoritesStoreHook,
  initialState
);
