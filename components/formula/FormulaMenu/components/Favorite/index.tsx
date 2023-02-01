import {
  ActionIcon,
  Menu,
  MenuItemProps,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useFavoritesStore } from "modules/favorites";
import { selectAddFavorite } from "modules/favorites/selectors";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props extends MenuItemProps {
  computable: FormulaComputable;
}

export const FormulaMenuFavorite: FC<Props> = ({ computable, ...props }) => {
  const theme = useMantineTheme();
  const addFavorite = useFavoritesStore(selectAddFavorite);
  const onAddFavorite = () => {
    addFavorite(computable);
  };

  return (
    <Menu.Item
      icon={
        <ActionIcon size={"xs"} variant={"transparent"} component={"span"}>
          <IconDeviceFloppy size={theme.spacing.sm} />
        </ActionIcon>
      }
      onClick={onAddFavorite}
      {...props}
    >
      <Text size={"xs"}>Save formula</Text>
    </Menu.Item>
  );
};
