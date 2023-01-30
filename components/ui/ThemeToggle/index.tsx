import { ActionIcon, ActionIconProps, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSunFilled } from "@tabler/icons-react";
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

  return (
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
  );
};
