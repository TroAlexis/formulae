import {
  ActionIcon,
  Burger,
  Header as MantineHeader,
  MediaQuery,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconMoonStars } from "@tabler/icons-react";
import React, { FC } from "react";

import { useShellStore } from "../../modules/shell";
import {
  selectIsNavbarOpen,
  selectToggleNavbar,
  selectToggleTheme,
} from "../../modules/shell/selectors";
import { useStyles } from "./styles";

interface Props {}

export const Header: FC<Props> = ({}) => {
  const isNavbarOpened = useShellStore(selectIsNavbarOpen);
  const toggleNavbar = useShellStore(selectToggleNavbar);
  const toggleTheme = useShellStore(selectToggleTheme);
  const theme = useMantineTheme();

  const { classes } = useStyles();

  return (
    <MantineHeader height={60} p={"xs"} className={classes.header}>
      <MediaQuery largerThan="lg" styles={{ display: "none" }}>
        <Burger
          opened={isNavbarOpened}
          onClick={toggleNavbar}
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
        gradient={{ from: "blue", to: "indigo" }}
      >
        formulae
      </Title>

      <ActionIcon
        size={"md"}
        color={"indigo"}
        variant={"outline"}
        className={classes.theme}
        onClick={toggleTheme}
      >
        <IconMoonStars size={theme.spacing.sm} />
      </ActionIcon>
    </MantineHeader>
  );
};
