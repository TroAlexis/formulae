import { Flex } from "@mantine/core";
import { FormulaDelete } from "components/formula/FormulaDelete";
import { FormulaLayoutProps } from "components/formula/FormulaLayout/models";
import { FormulaMenu } from "components/formula/FormulaMenu";
import { Hoverable } from "components/ui/Hoverable";
import { FC } from "react";

import styles from "./index.module.css";

export const FormulaLayout: FC<FormulaLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex direction={"column"} className={styles.wrapper} {...props}>
      <Flex gap={"xs"} align={"center"}>
        <Hoverable hoverTargetClassName={styles.wrapper}>
          {({ className }) => <FormulaDelete className={className} />}
        </Hoverable>

        {children}

        <Hoverable hoverTargetClassName={styles.wrapper}>
          {({ className }) => (
            <FormulaMenu classNames={{ target: className }} />
          )}
        </Hoverable>
      </Flex>
    </Flex>
  );
};
