import { FormulaExpression, FormulaSlice } from "modules/formulas/models";
import { MapState } from "modules/map/models";

export type FavoritesSlice = FormulaSlice<FormulaExpression>;

export type FavoritesMapState = MapState<string, FavoritesSlice>;

export type FavoritesMap = FavoritesMapState["map"];

export interface FavoritesState extends FavoritesMapState {
  favorites: string[];
  search: {
    text?: string;
  };
}

export interface FavoritesActions {
  addFavorite: (favorite: FavoritesSlice) => void;
  setFavorites: (favorites: FavoritesSlice[]) => void;
  editFavorite: (id: string, item: Partial<FormulaExpression>) => void;
  removeFavorite: (id: string) => void;
  setSearchText: (text: string) => void;
}

export interface FavoritesStore extends FavoritesState, FavoritesActions {}
