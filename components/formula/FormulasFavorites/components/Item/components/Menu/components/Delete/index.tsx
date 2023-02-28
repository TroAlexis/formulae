import { IconTrash } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFavoritesStore } from "modules/favorites";
import { selectRemoveFavorite } from "modules/favorites/selectors";
import { FormulaType } from "modules/formulas/enums";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuDelete: FC = () => {
  const removeItem = useFavoritesStore(selectRemoveFavorite);
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);

  const handleRemove = () => {
    removeItem(formula.id);
  };

  return (
    <FormulaMenuItem icon={IconTrash} onClick={handleRemove}>
      Delete
    </FormulaMenuItem>
  );
};
