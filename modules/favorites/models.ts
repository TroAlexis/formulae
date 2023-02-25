import { FormulaComputable } from "../formulas/models";

export interface FavoritesState {
  favorites: FormulaComputable[];
  search: {
    text?: string;
  };
}

export interface FavoritesActions {
  addFavorite: (item: FormulaComputable) => void;
  editFavorite: (id: string, item: Partial<FormulaComputable>) => void;
  removeFavorite: (id: string) => void;
  setSearchText: (text: string) => void;
}

export interface FavoritesStore extends FavoritesState, FavoritesActions {}
