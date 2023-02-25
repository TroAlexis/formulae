import { IconPencil } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulasFavoritesItemMenuEditNameProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName/models";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuEditName: FC<
  FormulasFavoritesItemMenuEditNameProps
> = ({ item, onNameEdit }) => {
  const handleEdit = () => onNameEdit(item);

  return (
    <FormulaMenuItem onClick={handleEdit} icon={IconPencil}>
      Edit name
    </FormulaMenuItem>
  );
};
