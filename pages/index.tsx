import { AppShell, Header, Title } from "@mantine/core";

import { FormulaCreator } from "../components/FormulaCreator";

export default function Home() {
  return (
    <AppShell
      padding={"sm"}
      header={
        <Header
          height={80}
          p={"xs"}
          display={"flex"}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Title size={"h1"} lts={-2} color={"blue"}>
            formulae
          </Title>
        </Header>
      }
    >
      <FormulaCreator />
    </AppShell>
  );
}
