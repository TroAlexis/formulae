import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FavoritesMenuExport } from "components/favorites/FavoritesMenu/components/Export";
import { FavoritesMenuImport } from "components/favorites/FavoritesMenu/components/Import";
import React, { FC } from "react";

interface Props {}

export const FavoritesMenu: FC<Props> = ({}) => {
  const theme = useMantineTheme();

  return (
    <Menu position={"bottom-end"}>
      <Menu.Target>
        <ActionIcon size={"sm"}>
          <IconDotsVertical size={theme.spacing.sm} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>

        <FavoritesMenuExport />
        <FavoritesMenuImport action={"add"} />
        <FavoritesMenuImport action={"replace"} />
      </Menu.Dropdown>
    </Menu>
  );
};
