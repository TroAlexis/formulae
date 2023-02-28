import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FormulaMenuShare } from "components/formula/FormulaMenu/components/Share";
import { FormulasFavoritesItemMenuDelete } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/Delete";
import { FormulasFavoritesItemMenuEditDescription } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditDescription";
import { FormulasFavoritesItemMenuEditDescriptionProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditDescription/models";
import { FormulasFavoritesItemMenuEditName } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName";
import { FormulasFavoritesItemMenuEditNameProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName/models";
import React, { FC } from "react";

interface Props
  extends FormulasFavoritesItemMenuEditNameProps,
    FormulasFavoritesItemMenuEditDescriptionProps {}

export const FormulasFavoritesItemMenu: FC<Props> = ({
  onNameEdit,
  onDescriptionEdit,
}) => {
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

        <FormulasFavoritesItemMenuEditName onNameEdit={onNameEdit} />
        <FormulasFavoritesItemMenuEditDescription
          onDescriptionEdit={onDescriptionEdit}
        />
        <FormulasFavoritesItemMenuDelete />

        <Menu.Label>Share & reuse</Menu.Label>
        <FormulaMenuShare action={"link"} />
        <FormulaMenuShare action={"formula"} />
      </Menu.Dropdown>
    </Menu>
  );
};
