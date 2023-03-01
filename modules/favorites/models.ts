import {
  FormulaComputable,
  FormulaSlice,
  FormulasMapActions,
  FormulasMapState,
} from "modules/formula/models";

export interface FavoritesState {
  favorites: string[];
  search: {
    text?: string;
  };
}

export interface FavoritesActions extends FormulasMapActions {
  addFavorite: (favorite: FormulaSlice) => void;
  setFavorites: (favorites: FormulaSlice[]) => void;
  editFavorite: (id: string, item: Partial<FormulaComputable>) => void;
  removeFavorite: (id: string) => void;
  setSearchText: (text: string) => void;
}

export interface FavoritesStore
  extends FavoritesState,
    FormulasMapState,
    FavoritesActions {}
