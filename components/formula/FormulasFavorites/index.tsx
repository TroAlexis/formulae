import { Center, List, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { IconFunction } from "@tabler/icons-react";
import { FormulaSavedItem } from "components/formula/FormulasFavorites/components/Item";
import { useStyles } from "components/formula/FormulasFavorites/styles";
import { ACTION_COLOR } from "config/mantine/theme";
import { useFavoritesStore } from "modules/favorites";
import { selectFavoritesFilteredBySearchText } from "modules/favorites/selectors";
import React, { FC } from "react";

interface Props {}

export const FormulasFavorites: FC<Props> = ({}) => {
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
    >
      {favorites.length ? (
        favorites.map((item) => (
          <List.Item key={item.id}>
            <FormulaSavedItem item={item} className={savedItem} />
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
