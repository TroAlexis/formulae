import { Box, BoxProps, Center, Text } from "@mantine/core";
import { FormulaFavoritesItem } from "components/formula/FormulasFavorites/components/Item";
import { useStyles } from "components/formula/FormulasFavorites/styles";
import { FormulaProvider } from "contexts/useFormulaContext";
import { useFavoritesStore } from "modules/favorites";
import { selectFavoritesFilteredBySearchText } from "modules/favorites/selectors";
import React, { FC } from "react";

interface Props extends BoxProps {
  onItemClick?: () => unknown;
}

export const FormulasFavorites: FC<Props> = ({ onItemClick, ...props }) => {
  const favorites = useFavoritesStore(selectFavoritesFilteredBySearchText);
  const styles = useStyles();
  const { savedItem, ...classes } = styles.classes;

  return (
    <Box component={"ul"} className={classes.list} {...props}>
      {favorites.length ? (
        favorites.map((id) => (
          <li className={classes.item} key={id}>
            <FormulaProvider id={id} useStore={useFavoritesStore}>
              <FormulaFavoritesItem
                className={savedItem}
                onClick={onItemClick}
              />
            </FormulaProvider>
          </li>
        ))
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
