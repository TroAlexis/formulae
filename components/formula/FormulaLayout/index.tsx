import { Flex } from "@mantine/core";
import { FormulaDelete } from "components/formula/FormulaDelete";
import { FormulaLayoutProps } from "components/formula/FormulaLayout/models";
import { Hoverable } from "components/ui/Hoverable";
import { FC } from "react";

import styles from "./index.module.css";

export const FormulaLayout: FC<FormulaLayoutProps> = ({
  children,
  menu: MenuComponent,
  ...props
}) => {
  return (
    <Flex direction={"column"} className={styles.wrapper} {...props}>
      <Flex gap={"xs"} align={"center"}>
        <Hoverable hoverTargetClassName={styles.wrapper}>
          {({ className }) => <FormulaDelete className={className} />}
        </Hoverable>

        {children}

        {MenuComponent && (
          <Hoverable hoverTargetClassName={styles.wrapper}>
            {(hoverableProps) => <MenuComponent {...hoverableProps} />}
          </Hoverable>
        )}
      </Flex>
    </Flex>
  );
};
