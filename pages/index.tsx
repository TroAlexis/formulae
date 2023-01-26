import { AppShell } from "@mantine/core";

import { FormulaCreator } from "../components/FormulaCreator";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <AppShell padding={"sm"} header={<Header />}>
      <FormulaCreator />
    </AppShell>
  );
}
