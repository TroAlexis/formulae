import { FormulaComputable } from "modules/formulas/models";

export interface FormulasFavoritesItemMenuEditProps {
  item: FormulaComputable;
  onEdit: (item: FormulaComputable) => void;
}
