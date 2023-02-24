import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { FormulasFavoritesItemMenuEditProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/Edit/models";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuEdit: FC<
  FormulasFavoritesItemMenuEditProps
> = ({ item, onEdit }) => {
  const theme = useMantineTheme();

  const handleEdit = () => onEdit(item);

  return (
    <Menu.Item
      onClick={handleEdit}
      icon={
        <ActionIcon component={"span"} size={"xs"}>
          <IconPencil size={theme.spacing.sm}></IconPencil>
        </ActionIcon>
      }
    >
      Edit name
    </Menu.Item>
  );
};
