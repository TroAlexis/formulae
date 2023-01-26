import { Header as MantineHeader, Title } from "@mantine/core";
import React, { FC } from "react";

interface Props {}

export const Header: FC<Props> = ({}) => {
  return (
    <MantineHeader
      height={80}
      p={"xs"}
      display={"flex"}
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <Title
        size={"h1"}
        lts={-2}
        variant={"gradient"}
        gradient={{ from: "blue", to: "indigo" }}
      >
        formulae
      </Title>
    </MantineHeader>
  );
};
