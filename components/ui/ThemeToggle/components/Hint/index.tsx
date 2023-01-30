import { Flex, Kbd, Text } from "@mantine/core";
import React, { FC } from "react";

interface Props {}

export const ThemeToggleHint: FC<Props> = ({}) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      <Text size={"xs"} span>
        Toggle theme
      </Text>
      <Kbd lh={1}>
        <Text size={"xs"} span weight={700} lh={"inherit"}>
          ⌘ + J
        </Text>
      </Kbd>
    </Flex>
  );
};
