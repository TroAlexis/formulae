import { FormulaComputable } from "modules/formulas/models";

export interface FormulasFavoritesItemMenuEditNameProps {
  item: FormulaComputable;
  onNameEdit: (item: FormulaComputable) => void;
}
