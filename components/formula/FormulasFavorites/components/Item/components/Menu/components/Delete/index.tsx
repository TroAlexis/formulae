import { IconTrash } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { useFavoritesStore } from "modules/favorites";
import { selectRemoveFavorite } from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props {
  item: FormulaComputable;
}

export const FormulasFavoritesItemMenuDelete: FC<Props> = ({ item }) => {
  const removeItem = useFavoritesStore(selectRemoveFavorite);

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <FormulaMenuItem icon={IconTrash} onClick={handleRemove}>
      Delete
    </FormulaMenuItem>
  );
};
