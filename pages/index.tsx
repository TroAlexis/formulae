import { AppShell, createStyles } from "@mantine/core";
import { CSSProperties } from "react";

import { FormulaCreator } from "../components/FormulaCreator";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

// Remove offset of navbar with padding
const navbarReset = {
  "--mantine-navbar-width": "0px",
} as CSSProperties;

const useStyles = createStyles(() => ({
  main: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <AppShell
      classNames={{ main: classes.main }}
      padding={"sm"}
      header={<Header />}
      navbar={<Navbar />}
      style={navbarReset}
    >
      <FormulaCreator />
    </AppShell>
  );
}
