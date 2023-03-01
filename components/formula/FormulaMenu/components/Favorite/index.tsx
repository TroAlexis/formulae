import { IconDeviceFloppy } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFavoritesStore } from "modules/favorites";
import { selectAddFavorite } from "modules/favorites/selectors";
import { selectFormulasMap } from "modules/formula/selectors";
import { getFormulaSlice } from "modules/formula/utils";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import React, { FC } from "react";

type Props = FormulaMenuItemProps;

export const FormulaMenuFavorite: FC<Props> = (props) => {
  const addFavorite = useFavoritesStore(selectAddFavorite);
  const formulasMap = useFormulasStore(selectFormulasMap);
  const { formula } = useFormulaContext(FormulaType.EXPRESSION);

  const onAddFavorite = () => {
    const slice = getFormulaSlice(formula.id, formulasMap);

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
