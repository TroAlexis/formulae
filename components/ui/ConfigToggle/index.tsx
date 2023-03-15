import {
  ActionIcon,
  ActionIconProps,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import { ACTION_COLOR } from "config/mantine/theme";
import { useThemeStore } from "modules/theme";
import { selectToggleConfig } from "modules/theme/selectors";
import React, { FC } from "react";
import { wrapFunctionCall } from "utils/function";

interface Props extends ActionIconProps {}

export const ConfigToggle: FC<Props> = (props) => {
  const theme = useMantineTheme();

  const toggleConfig = useThemeStore(selectToggleConfig);
  const handleToggleConfig = wrapFunctionCall(toggleConfig);

  const iconSize = theme.spacing.sm;

  useHotkeys([["mod+,", handleToggleConfig]]);

  return (
    <Tooltip
      label={
        <Text span size={"xs"}>
          Customisation settings
        </Text>
      }
      withArrow
      position={"left"}
    >
      <ActionIcon
        size={"md"}
        color={ACTION_COLOR}
        variant={"subtle"}
        onClick={handleToggleConfig}
        {...props}
      >
        <IconSettings size={iconSize} />
      </ActionIcon>
    </Tooltip>
  );
};
