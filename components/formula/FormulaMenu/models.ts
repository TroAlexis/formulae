import { MenuProps } from "@mantine/core";

export interface FormulaMenuProps extends MenuProps {
  classNames?: MenuProps["classNames"] & {
    target?: string;
  };
}
