import {
  ActionIcon,
  ActionIconProps,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconMoonStars, IconSunFilled } from "@tabler/icons-react";
import { ThemeToggleHint } from "components/ui/ThemeToggle/components/Hint";
import { ACTION_COLOR } from "config/mantine/theme";
import { useThemeStore } from "modules/theme";
import { selectTheme, selectToggleTheme } from "modules/theme/selectors";
import React, { FC } from "react";

interface Props extends ActionIconProps {}

export const ThemeToggle: FC<Props> = (props) => {
  const theme = useMantineTheme();

  const toggleTheme = useThemeStore(selectToggleTheme);
  const scheme = useThemeStore(selectTheme);

  const iconSize = theme.spacing.sm;

  useHotkeys([["mod+J", toggleTheme]]);

  return (
    <Tooltip label={<ThemeToggleHint />} withArrow position={"left"}>
      <ActionIcon
        size={"md"}
        color={ACTION_COLOR}
        variant={"outline"}
        onClick={toggleTheme}
        {...props}
      >
        {scheme === "light" ? (
          <IconMoonStars size={iconSize} />
        ) : (
          <IconSunFilled size={iconSize} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
