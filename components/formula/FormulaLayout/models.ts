import { FlexProps } from "@mantine/core";
import { HoverableProps } from "components/ui/Hoverable/models";
import { PropsWithChildren } from "react";

export interface FormulaLayoutProps extends PropsWithChildren<FlexProps> {
  menu?: HoverableProps["children"];
}
