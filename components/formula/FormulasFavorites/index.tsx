import {
  Center,
  List,
  ListProps,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconFunction } from "@tabler/icons-react";
import { FormulaFavoritesItem } from "components/formula/FormulasFavorites/components/Item";
import { useStyles } from "components/formula/FormulasFavorites/styles";
import { ACTION_COLOR } from "config/mantine/theme";
import { useFavoritesStore } from "modules/favorites";
import { selectFavoritesFilteredBySearchText } from "modules/favorites/selectors";
import React, { FC } from "react";

interface Props extends Omit<ListProps, "children"> {
  onItemClick?: () => unknown;
}

export const FormulasFavorites: FC<Props> = ({ onItemClick, ...props }) => {
  const theme = useMantineTheme();
  const favorites = useFavoritesStore(selectFavoritesFilteredBySearchText);
  const styles = useStyles();
  const { savedItem, ...classes } = styles.classes;

  return (
    <List
      icon={
        <ThemeIcon
          size={"sm"}
          variant={"light"}
          radius={"xl"}
          color={ACTION_COLOR}
        >
          <IconFunction size={theme.spacing.sm} />
        </ThemeIcon>
      }
      center
      spacing={"xs"}
      classNames={classes}
      {...props}
    >
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
