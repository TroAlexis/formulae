import { FormulaComputable } from "modules/formulas/models";

export interface FormulasFavoritesItemMenuEditDescriptionProps {
  item: FormulaComputable;
  onDescriptionEdit: (item: FormulaComputable) => void;
}
