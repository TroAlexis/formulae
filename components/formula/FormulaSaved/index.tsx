import { List, ThemeIcon, useMantineTheme } from "@mantine/core";
import { IconFunction } from "@tabler/icons-react";
import { FormulaSavedItem } from "components/formula/FormulaSaved/components/Item";
import { useStyles } from "components/formula/FormulaSaved/styles";
import { ACTION_COLOR } from "config/mantine/theme";
import { useFavoritesStore } from "modules/favorites";
import { selectFavorites } from "modules/favorites/selectors";
import React, { FC } from "react";

interface Props {}

export const FormulaSaved: FC<Props> = ({}) => {
  const theme = useMantineTheme();
  const favorites = useFavoritesStore(selectFavorites);
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
      {favorites.map((item) => (
        <List.Item key={item.id}>
          <FormulaSavedItem item={item} className={savedItem} />
        </List.Item>
      ))}
    </List>
  );
};
