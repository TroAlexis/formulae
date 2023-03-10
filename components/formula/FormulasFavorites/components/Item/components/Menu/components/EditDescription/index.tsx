import { IconFileDescription } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulasFavoritesItemMenuEditDescriptionProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditDescription/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { FormulaType } from "modules/formulas/enums";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuEditDescription: FC<
  FormulasFavoritesItemMenuEditDescriptionProps
> = ({ onDescriptionEdit }) => {
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);
  const handleEdit = () => onDescriptionEdit(formula);

  return (
    <FormulaMenuItem onClick={handleEdit} icon={IconFileDescription}>
      Edit description
    </FormulaMenuItem>
  );
};
