import { FlexProps } from "@mantine/core";
import { FormulaIndex } from "modules/formulas/types";
import { PropsWithChildren } from "react";

export interface FormulaLayoutProps extends PropsWithChildren<FlexProps> {
  index: FormulaIndex;
}
