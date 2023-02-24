import {
  Burger,
  Header as MantineHeader,
  MediaQuery,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ACTION_COLOR } from "config/mantine/theme";
import { useShellStore } from "modules/shell";
import {
  selectIsNavbarOpen,
  selectToggleNavbar,
} from "modules/shell/selectors";
import React, { FC } from "react";
import { wrapFunctionCall } from "utils/function";

import { ThemeToggle } from "../ThemeToggle";
import { useStyles } from "./styles";

interface Props {}

export const Header: FC<Props> = ({}) => {
  const isNavbarOpened = useShellStore(selectIsNavbarOpen);
  const toggleNavbar = useShellStore(selectToggleNavbar);
  const theme = useMantineTheme();

  const { classes } = useStyles();

  const handleBurgerClick = wrapFunctionCall(toggleNavbar);

  return (
    <MantineHeader height={60} p={"xs"} className={classes.header}>
      <MediaQuery largerThan="lg" styles={{ display: "none" }}>
        <Burger
          opened={isNavbarOpened}
          onClick={handleBurgerClick}
          color={theme.colors.indigo[6]}
          size="sm"
          className={classes.burger}
        />
      </MediaQuery>
      <Title
        size={"h1"}
        lts={-2}
        variant={"gradient"}
        className={classes.title}
        gradient={{ from: "blue", to: ACTION_COLOR }}
      >
        formulae
      </Title>

      <ThemeToggle className={classes.theme} />
    </MantineHeader>
  );
};
