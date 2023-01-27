import { AppShell } from "@mantine/core";
import { CSSProperties } from "react";

import { FormulaCreator } from "../components/FormulaCreator";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

// Remove offset of navbar with padding
const navbarReset = {
  "--mantine-navbar-width": "0px",
} as CSSProperties;

export default function Home() {
  return (
    <AppShell
      padding={"sm"}
      header={<Header />}
      navbar={<Navbar />}
      style={navbarReset}
    >
      <FormulaCreator />
    </AppShell>
  );
}
