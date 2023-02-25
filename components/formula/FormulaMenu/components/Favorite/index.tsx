import { IconDeviceFloppy } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFavoritesStore } from "modules/favorites";
import { selectAddFavorite } from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props extends FormulaMenuItemProps {
  computable: FormulaComputable;
}

export const FormulaMenuFavorite: FC<Props> = ({ computable, ...props }) => {
  const addFavorite = useFavoritesStore(selectAddFavorite);
  const onAddFavorite = () => {
    addFavorite(computable);
  };

  return (
    <FormulaMenuItem onClick={onAddFavorite} icon={IconDeviceFloppy} {...props}>
      Save
    </FormulaMenuItem>
  );
};
