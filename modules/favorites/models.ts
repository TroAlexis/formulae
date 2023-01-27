import { FormulaComputable } from "../formulas/models";

export interface FavoritesState {
  favorites: FormulaComputable[];
}

export interface FavoritesActions {
  addFavorite: (item: FormulaComputable) => void;
}

export interface FavoritesStore extends FavoritesState, FavoritesActions {}
