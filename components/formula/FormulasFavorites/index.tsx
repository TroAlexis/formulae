import { Center, List, ListProps, Text } from "@mantine/core";
import { FormulaFavoritesItem } from "components/formula/FormulasFavorites/components/Item";
import { useStyles } from "components/formula/FormulasFavorites/styles";
import { useFavoritesStore } from "modules/favorites";
import { selectFavoritesFilteredBySearchText } from "modules/favorites/selectors";
import React, { FC } from "react";

interface Props extends Omit<ListProps, "children"> {
  onItemClick?: () => unknown;
}

export const FormulasFavorites: FC<Props> = ({ onItemClick, ...props }) => {
  const favorites = useFavoritesStore(selectFavoritesFilteredBySearchText);
  const styles = useStyles();
  const { savedItem, ...classes } = styles.classes;

  return (
    <List center spacing={"xs"} classNames={classes} {...props}>
      {favorites.length ? (
        favorites.map((item) => (
          <List.Item key={item.id}>
            <FormulaFavoritesItem
              item={item}
              className={savedItem}
              onClick={onItemClick}
            />
          </List.Item>
        ))
      ) : (
        <Center>
          <Text color={"dimmed"} size={"sm"}>
            No formulas found
          </Text>
        </Center>
      )}
    </List>
  );
};
