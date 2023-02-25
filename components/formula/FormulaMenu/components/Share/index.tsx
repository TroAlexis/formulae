import {
  ActionIcon,
  Menu,
  MenuItemProps,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconShare } from "@tabler/icons-react";
import { useFormulaShare } from "hooks/useFormulaShare";
import { FormulaComputable } from "modules/formulas/models";
import React, { FC } from "react";

interface Props extends MenuItemProps {
  computable: FormulaComputable;
}

export const FormulaMenuShare: FC<Props> = ({ computable, ...props }) => {
  const theme = useMantineTheme();
  const { link } = useFormulaShare(computable);
  const clipboard = useClipboard();

  const handleClick = () => {
    clipboard.copy(link);
  };

  return (
    <Menu.Item
      icon={
        <ActionIcon size={"xs"} variant={"transparent"} component={"span"}>
          <IconShare size={theme.spacing.sm} />
        </ActionIcon>
      }
      onClick={handleClick}
      {...props}
    >
      <Text size={"xs"}>Copy link</Text>
    </Menu.Item>
  );
};
