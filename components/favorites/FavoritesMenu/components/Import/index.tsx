import { IconFileArrowLeft } from "@tabler/icons-react";
import { FormulaMenuItem } from "components/formula/FormulaMenu/components/Item";
import { useFavoritesStore } from "modules/favorites";
import {
  selectAddFavorite,
  selectSetFavorites,
} from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";
import { parse } from "utils/serialize";

interface Props {
  action: "replace" | "add";
}

export const FavoritesMenuImport: FC<Props> = ({ action }) => {
  const setFavorites = useFavoritesStore(selectSetFavorites);
  const addFavorite = useFavoritesStore(selectAddFavorite);

  const handleClick = async () => {
    const data = await navigator.clipboard.readText();

    const parsed = parse<FormulaComputable[] | FormulaComputable>(data);

    const favorites = Array.isArray(parsed) ? parsed : [parsed];

    if (action === "add") {
      favorites.forEach(addFavorite);
    } else if (action === "replace") {
      setFavorites(favorites);
    }
  };

  return (
    <FormulaMenuItem icon={IconFileArrowLeft} onClick={handleClick}>
      Import ({action})
    </FormulaMenuItem>
  );
};
