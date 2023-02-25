import { ActionIcon, Menu, Text, useMantineTheme } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import { FormulasFavoritesItemMenuEditDescriptionProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName/models";
import React, { FC } from "react";

export const FormulasFavoritesItemMenuEditDescription: FC<
  FormulasFavoritesItemMenuEditDescriptionProps
> = ({ item, onDescriptionEdit }) => {
  const theme = useMantineTheme();

  const handleEdit = () => onDescriptionEdit(item);

  return (
    <Menu.Item
      onClick={handleEdit}
      icon={
        <ActionIcon component={"span"} size={"xs"}>
          <IconFileDescription size={theme.spacing.sm}></IconFileDescription>
        </ActionIcon>
      }
    >
      <Text size={"xs"}>Edit description</Text>
    </Menu.Item>
  );
};
