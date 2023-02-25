import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { FormulasFavoritesItemMenuEditNameProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName/models";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuEditName: FC<
  FormulasFavoritesItemMenuEditNameProps
> = ({ item, onNameEdit }) => {
  const theme = useMantineTheme();

  const handleEdit = () => onNameEdit(item);

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
