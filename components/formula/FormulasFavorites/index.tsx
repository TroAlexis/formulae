import { Box, BoxProps, Center, Text } from "@mantine/core";
import {
  FormulaFavoritesItems,
  FormulasFavoritesItemsProps,
} from "components/formula/FormulasFavorites/components/Items";
import { useStyles } from "components/formula/FormulasFavorites/styles";
import { useFavoritesStore } from "modules/favorites";
import { selectFavoritesFilteredBySearchText } from "modules/favorites/selectors";
import React, { FC } from "react";

interface Props
  extends BoxProps,
    Pick<FormulasFavoritesItemsProps, "onItemClick"> {}

export const FormulasFavorites: FC<Props> = ({ onItemClick, ...props }) => {
  const favorites = useFavoritesStore(selectFavoritesFilteredBySearchText);
  const { classes } = useStyles();

  return (
    <Box component={"ul"} className={classes.list} {...props}>
      {favorites.length ? (
        <FormulaFavoritesItems ids={favorites} onItemClick={onItemClick} />
      ) : (
        <Center>
          <Text color={"dimmed"} size={"sm"}>
            No formulas found
          </Text>
        </Center>
      )}
    </Box>
  );
};
