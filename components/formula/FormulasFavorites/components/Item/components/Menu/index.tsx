import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FormulasFavoritesItemMenuDelete } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/Delete";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props {
  item: FormulaComputable;
}

export const FormulasFavoritesItemMenu: FC<Props> = ({ item }) => {
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

        <FormulasFavoritesItemMenuDelete item={item} />
      </Menu.Dropdown>
    </Menu>
  );
};
