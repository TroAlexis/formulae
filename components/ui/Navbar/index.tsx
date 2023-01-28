import { Navbar as MantineNavbar, ScrollArea } from "@mantine/core";
import { useShellStore } from "modules/shell";
import { selectIsNavbarOpen } from "modules/shell/selectors";
import React, { FC } from "react";

interface Props {}

export const Navbar: FC<Props> = ({}) => {
  const isNavbarOpen = useShellStore(selectIsNavbarOpen);
  return (
    <MantineNavbar
      hiddenBreakpoint={"lg"}
      hidden={!isNavbarOpen}
      fixed
      p={"xs"}
      width={{ lg: 300 }}
    >
      <MantineNavbar.Section>search</MantineNavbar.Section>
      <MantineNavbar.Section grow component={ScrollArea} px={"xs"}>
        content
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
