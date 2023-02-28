import { IconPencil } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulasFavoritesItemMenuEditNameProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { FormulaType } from "modules/formulas/enums";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuEditName: FC<
  FormulasFavoritesItemMenuEditNameProps
> = ({ onNameEdit }) => {
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);
  const handleEdit = () => onNameEdit(formula);

  return (
    <FormulaMenuItem onClick={handleEdit} icon={IconPencil}>
      Edit name
    </FormulaMenuItem>
  );
};
