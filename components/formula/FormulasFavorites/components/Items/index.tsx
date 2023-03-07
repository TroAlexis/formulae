import { FormulaFavoritesItem } from "components/formula/FormulasFavorites/components/Item";
import { useStyles } from "components/formula/FormulasFavorites/components/Items/styles";
import { FormulaProvider } from "contexts/useFormulaContext";
import { useFavoritesStore } from "modules/favorites";
import {
  selectFavoriteFormulaById,
  selectFavoriteSliceById,
} from "modules/favorites/selectors";
import React, { FC, useMemo } from "react";

export interface FormulasFavoritesItemsProps {
  ids: string[];
  onItemClick?: () => unknown;
}

export const FormulaFavoritesItems: FC<FormulasFavoritesItemsProps> = ({
  ids,
  onItemClick,
}) => {
  const { classes } = useStyles();

  const item = useMemo(
    () => (
      <FormulaFavoritesItem className={classes.item} onClick={onItemClick} />
    ),
    [onItemClick, classes.item]
  );

  return (
    <>
      {ids.map((id) => (
        <li className={classes.wrapper} key={id}>
          <FormulaProvider
            id={id}
            useStore={useFavoritesStore}
            formulaSelector={selectFavoriteFormulaById}
            sliceSelector={selectFavoriteSliceById}
          >
            {item}
          </FormulaProvider>
        </li>
      ))}
    </>
  );
};
