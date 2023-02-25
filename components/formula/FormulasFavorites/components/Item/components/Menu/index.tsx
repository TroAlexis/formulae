import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FormulaMenuShare } from "components/formula/FormulaMenu/components/Share";
import { FormulasFavoritesItemMenuDelete } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/Delete";
import { FormulasFavoritesItemMenuEditDescription } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditDescription";
import { FormulasFavoritesItemMenuEditDescriptionProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditDescription/models";
import { FormulasFavoritesItemMenuEditName } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName";
import { FormulasFavoritesItemMenuEditNameProps } from "components/formula/FormulasFavorites/components/Item/components/Menu/components/EditName/models";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props
  extends FormulasFavoritesItemMenuEditNameProps,
    FormulasFavoritesItemMenuEditDescriptionProps {
  item: FormulaComputable;
}

export const FormulasFavoritesItemMenu: FC<Props> = ({
  item,
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

        <FormulasFavoritesItemMenuEditName
          item={item}
          onNameEdit={onNameEdit}
        />
        <FormulasFavoritesItemMenuEditDescription
          item={item}
          onDescriptionEdit={onDescriptionEdit}
        />
        <FormulaMenuShare computable={item} action={"link"} />
        <FormulaMenuShare computable={item} action={"formula"} />
        <FormulasFavoritesItemMenuDelete item={item} />
      </Menu.Dropdown>
    </Menu>
  );
};
