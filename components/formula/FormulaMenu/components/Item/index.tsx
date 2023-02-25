import { ActionIcon, Menu, Text, useMantineTheme } from "@mantine/core";
import { FormulaMenuItemProps } from "components/formula/FormulaMenu/components/Item/models";
import React, { FC } from "react";

export const FormulaMenuItem: FC<FormulaMenuItemProps> = ({
  icon: Icon,
  children,
  ...props
}) => {
  const theme = useMantineTheme();
  return (
    <Menu.Item
      icon={
        Icon && (
          <ActionIcon size={"xs"} variant={"transparent"} component={"span"}>
            <Icon size={theme.spacing.sm} />
          </ActionIcon>
        )
      }
      {...props}
    >
      <Text size={"xs"}>{children}</Text>
    </Menu.Item>
  );
};
