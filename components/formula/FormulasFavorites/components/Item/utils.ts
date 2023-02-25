import { useItemEditor } from "components/formula/FormulasFavorites/components/Item/hooks/useItemEditor";
import { FormulaComputable } from "modules/formulas/models";
import { getComputableShortId } from "modules/formulas/utils";

export const getFormulaName = (formula: FormulaComputable) => {
  return formula.name || `Formula: ${getComputableShortId(formula)}`;
};

export const createGetEditHandler =
  <T extends ReturnType<typeof useItemEditor>>(editors: T[]) =>
  (editor: T) => {
    return () => {
      editors.forEach((editorItem) => {
        if (editorItem !== editor) {
          editorItem.handleClose();
        }
      });

      editor.handleEdit();
    };
  };
