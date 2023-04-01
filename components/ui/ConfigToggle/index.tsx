import {
  ActionIcon,
  ActionIconProps,
  Flex,
  Kbd,
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
        <Flex align={"center"} gap={"xs"}>
          <Text size={"xs"} span>
            Customisation settings
          </Text>
          <Kbd lh={1}>
            <Text size={"xs"} span weight={700} lh={"inherit"}>
              ⌘ + ,
            </Text>
          </Kbd>
        </Flex>
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
