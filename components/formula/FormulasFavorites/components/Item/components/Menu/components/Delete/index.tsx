import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useFavoritesStore } from "modules/favorites";
import { selectRemoveFavorite } from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props {
  item: FormulaComputable;
}

export const FormulasFavoritesItemMenuDelete: FC<Props> = ({ item }) => {
  const theme = useMantineTheme();
  const removeItem = useFavoritesStore(selectRemoveFavorite);

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <Menu.Item
      onClick={handleRemove}
      icon={
        <ActionIcon component={"span"} size={"xs"}>
          <IconTrash size={theme.spacing.sm}></IconTrash>
        </ActionIcon>
      }
    >
      Delete
    </Menu.Item>
  );
};
