import { Navbar as MantineNavbar, ScrollArea } from "@mantine/core";
import { FavoritesSearch } from "components/favorites/FavoritesSearch";
import { useStyles } from "components/ui/Navbar/styles";
import { useShellStore } from "modules/shell";
import { selectIsNavbarOpen } from "modules/shell/selectors";
import dynamic from "next/dynamic";
import React, { FC } from "react";

const FormulasFavorites = dynamic(
  () =>
    import("components/formula/FormulasFavorites").then(
      (module) => module.FormulasFavorites
    ),
  {
    ssr: false,
  }
);

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
