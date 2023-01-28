import { AppShell, createStyles } from "@mantine/core";
import { FormulaCreator } from "components/formula/FormulaCreator";
import { Header } from "components/ui/Header";
import { Navbar } from "components/ui/Navbar";
import { CSSProperties } from "react";

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
