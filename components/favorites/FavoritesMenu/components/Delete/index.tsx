import { IconTrashX } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { useFavoritesStore } from "modules/favorites";
import { selectSetFavorites } from "modules/favorites/selectors";
import React, { FC } from "react";

interface Props {}

export const FavoritesMenuDelete: FC<Props> = ({}) => {
  const setFavorites = useFavoritesStore(selectSetFavorites);

  const handleClick = () => setFavorites([]);

  return (
    <FormulaMenuItem icon={IconTrashX} onClick={handleClick}>
      Delete all
    </FormulaMenuItem>
  );
};
