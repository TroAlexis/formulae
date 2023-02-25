import { IconFileDescription } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulasFavoritesItemMenuEditDescriptionProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditDescription/models";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuEditDescription: FC<
  FormulasFavoritesItemMenuEditDescriptionProps
> = ({ item, onDescriptionEdit }) => {
  const handleEdit = () => onDescriptionEdit(item);

  return (
    <FormulaMenuItem onClick={handleEdit} icon={IconFileDescription}>
      Edit description
    </FormulaMenuItem>
  );
};
