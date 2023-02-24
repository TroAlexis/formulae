import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FormulasFavoritesItemMenuDelete } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/Delete";
import { FormulasFavoritesItemMenuEdit } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/Edit";
import { FormulasFavoritesItemMenuEditProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/Edit/models";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props extends FormulasFavoritesItemMenuEditProps {
  item: FormulaComputable;
}

export const FormulasFavoritesItemMenu: FC<Props> = ({ item, onEdit }) => {
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
        <FormulasFavoritesItemMenuEdit item={item} onEdit={onEdit} />
      </Menu.Dropdown>
    </Menu>
  );
};
