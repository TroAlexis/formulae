import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FormulaMenuFavorite } from "components/formula/FormulaMenu/components/Favorite";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props {
  computable: FormulaComputable;
}

export const FormulaMenu: FC<Props> = ({ computable }) => {
  const theme = useMantineTheme();
  return (
    <Menu withinPortal position={"bottom-end"}>
      <Menu.Target>
        <ActionIcon size={"lg"}>
          <IconDotsVertical size={theme.spacing.sm} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>
        <FormulaMenuFavorite computable={computable} />
      </Menu.Dropdown>
    </Menu>
  );
};
