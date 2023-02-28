import { IconDeviceFloppy } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFavoritesStore } from "modules/favorites";
import { selectAddFavorite } from "modules/favorites/selectors";
import { FormulaType } from "modules/formulas/enums";
import React, { FC } from "react";

type Props = FormulaMenuItemProps;

export const FormulaMenuFavorite: FC<Props> = (props) => {
  const addFavorite = useFavoritesStore(selectAddFavorite);
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);
  const onAddFavorite = () => {
    addFavorite(formula);
  };

  return (
    <FormulaMenuItem onClick={onAddFavorite} icon={IconDeviceFloppy} {...props}>
      Save
    </FormulaMenuItem>
  );
};
