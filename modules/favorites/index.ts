import {
  createFavoritesSlice,
  favoritesInitialState,
} from "modules/favorites/slice";
import { createUseHydratedStore } from "modules/utils/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { FavoritesStore } from "./models";

const useFavoritesStoreHook = create<FavoritesStore>()(
  devtools(
    persist(immer(createFavoritesSlice), {
      name: "favorites",
      version: 1,
    })
  )
);

export const useFavoritesStore = createUseHydratedStore(useFavoritesStoreHook, {
  ...favoritesInitialState,
});
