import { useClipboard } from "@mantine/hooks";
import { IconFileArrowRight } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { useFavoritesStore } from "modules/favorites";
import { selectFavorites } from "modules/favorites/selectors";
import { selectFormulasMap } from "modules/formula/selectors";
import { getFormulaSlice } from "modules/formula/utils";
import React, { FC } from "react";
import { serialize } from "utils/serialize";

interface Props {}

export const FavoritesMenuExport: FC<Props> = ({}) => {
  const favorites = useFavoritesStore(selectFavorites);
  const map = useFavoritesStore(selectFormulasMap);
  const { copy } = useClipboard();

  const handleClick = () => {
    const slices = favorites.map((id) => getFormulaSlice(id, map));
    const value = serialize(slices);
    copy(value);
  };

  return (
    <FormulaMenuItem icon={IconFileArrowRight} onClick={handleClick}>
      Export all
    </FormulaMenuItem>
  );
};
