import { Drawer, Text } from "@mantine/core";
import ConfigSettingsPrecision from "components/ui/ConfigSettings/components/Precision";
import { useThemeStore } from "modules/theme";
import { selectCloseConfig, selectIsConfigOpen } from "modules/theme/selectors";
import React, { FC } from "react";

interface Props {}

export const ConfigSettings: FC<Props> = ({}) => {
  const isOpen = useThemeStore(selectIsConfigOpen);
  const closeConfig = useThemeStore(selectCloseConfig);
  return (
    <Drawer
      opened={isOpen}
      onClose={closeConfig}
      padding={"sm"}
      title={<Text weight={"500"}>Customisation settings</Text>}
    >
      <ConfigSettingsPrecision type={"resultPrecision"} mb={"sm"} />

      <ConfigSettingsPrecision type={"valuePrecision"} />
    </Drawer>
  );
};
