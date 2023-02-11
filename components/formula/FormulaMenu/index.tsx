import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { FormulaMenuProps } from "components/formula/FormulaMenu/models";
import React, { FC, PropsWithChildren } from "react";

export const FormulaMenu: FC<PropsWithChildren<FormulaMenuProps>> = ({
  children,
  ...props
}) => {
  const theme = useMantineTheme();
  return (
    <Menu withinPortal position={"bottom-end"} {...props}>
      <Menu.Target>
        <ActionIcon size={"lg"} className={props.classNames?.target}>
          <IconDotsVertical size={theme.spacing.sm} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
};
