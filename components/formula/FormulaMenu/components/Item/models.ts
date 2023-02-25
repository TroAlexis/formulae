import { MenuItemProps } from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export interface FormulaMenuItemProps
  extends Omit<MenuItemProps, "icon">,
    Omit<ButtonProps, keyof MenuItemProps> {
  icon?: Icon;
  disabled?: boolean;
}
