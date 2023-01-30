import { Navbar as MantineNavbar, ScrollArea } from "@mantine/core";
import { FavoritesSearch } from "components/favorites/FavoritesSearch";
import { FormulasFavorites } from "components/formula/FormulasFavorites";
import { useStyles } from "components/ui/Navbar/styles";
import { useShellStore } from "modules/shell";
import { selectIsNavbarOpen } from "modules/shell/selectors";
import React, { FC } from "react";

interface Props {}

export const Navbar: FC<Props> = ({}) => {
  const isNavbarOpen = useShellStore(selectIsNavbarOpen);
  const { classes } = useStyles();

  return (
    <MantineNavbar
      hiddenBreakpoint={"lg"}
      hidden={!isNavbarOpen}
      fixed
      p={"xs"}
      width={{ lg: 300 }}
    >
      <MantineNavbar.Section mb={"sm"}>
        <FavoritesSearch />
      </MantineNavbar.Section>
      <MantineNavbar.Section
        grow
        component={ScrollArea}
        offsetScrollbars
        classNames={classes}
      >
        <FormulasFavorites />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
