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
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  body: { flex: 1, flexDirection: "column" },
  main: {
    minHeight: "unset",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <AppShell
      classNames={classes}
      padding={"sm"}
      header={<Header />}
      navbar={<Navbar />}
      style={navbarReset}
    >
      <FormulaCreator />
    </AppShell>
  );
}
