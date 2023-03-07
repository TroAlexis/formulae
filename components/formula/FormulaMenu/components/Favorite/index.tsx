import { IconDeviceFloppy } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFavoritesStore } from "modules/favorites";
import { FavoritesSlice } from "modules/favorites/models";
import { selectAddFavorite } from "modules/favorites/selectors";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { getFormulaSlice } from "modules/formulas/utils/slice";
import { selectMap } from "modules/map/selectors";
import React, { FC } from "react";

type Props = FormulaMenuItemProps;

export const FormulaMenuFavorite: FC<Props> = (props) => {
  const addFavorite = useFavoritesStore(selectAddFavorite);
  const map = useFormulasStore(selectMap);
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);

  const onAddFavorite = () => {
    const slice = getFormulaSlice(formula.id, map) as FavoritesSlice;

    if (slice) {
      addFavorite(slice);
    }
  };

  return (
    <FormulaMenuItem onClick={onAddFavorite} icon={IconDeviceFloppy} {...props}>
      Save
    </FormulaMenuItem>
  );
};
