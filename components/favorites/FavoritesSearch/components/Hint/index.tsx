import { Flex, Kbd, Text } from "@mantine/core";
import React, { FC } from "react";

interface Props {}

export const FavoritesSearchHint: FC<Props> = ({}) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      <Kbd lh={1}>
        <Text span weight={700} lh={"inherit"}>
          ⌘ + K
        </Text>
      </Kbd>
    </Flex>
  );
};
