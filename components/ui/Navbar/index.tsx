import { Flex, Navbar as MantineNavbar, ScrollArea } from "@mantine/core";
import { FavoritesMenu } from "components/favorites/FavoritesMenu";
import { FavoritesSearch } from "components/favorites/FavoritesSearch";
import { FormulasFavorites } from "components/formula/FormulasFavorites";
import { useStyles } from "components/ui/Navbar/styles";
import { useShellStore } from "modules/shell";
import { selectCloseNavbar, selectIsNavbarOpen } from "modules/shell/selectors";
import React, { FC } from "react";

interface Props {}

export const Navbar: FC<Props> = ({}) => {
  const isNavbarOpen = useShellStore(selectIsNavbarOpen);
  const { classes } = useStyles();

  const closeNavbar = useShellStore(selectCloseNavbar);

  return (
    <MantineNavbar
      hiddenBreakpoint={"lg"}
      hidden={!isNavbarOpen}
      fixed
      p={"xs"}
      width={{ lg: 300 }}
    >
      <MantineNavbar.Section>
        <Flex align={"center"} pr={12}>
          <FavoritesSearch mr={"sm"} className={classes.search} />
          <FavoritesMenu />
        </Flex>
      </MantineNavbar.Section>
      <MantineNavbar.Section
        grow
        component={ScrollArea}
        offsetScrollbars
        classNames={classes}
      >
        <FormulasFavorites pt={"sm"} onItemClick={closeNavbar} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
