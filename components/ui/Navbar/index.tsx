import { Navbar as MantineNavbar, ScrollArea } from "@mantine/core";
import { useStyles } from "components/ui/Navbar/styles";
import { useShellStore } from "modules/shell";
import { selectIsNavbarOpen } from "modules/shell/selectors";
import dynamic from "next/dynamic";
import React, { FC } from "react";

const FormulaSaved = dynamic(
  () =>
    import("components/formula/FormulaSaved").then(
      (module) => module.FormulaSaved
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
      <MantineNavbar.Section>{/* search */}</MantineNavbar.Section>
      <MantineNavbar.Section grow component={ScrollArea} classNames={classes}>
        <FormulaSaved />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
