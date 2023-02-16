import { Flex, FlexProps, TextInput, TextInputProps } from "@mantine/core";
import { FormulaDelete } from "components/formula/FormulaDelete";
import { FormulaExpressionCollapse } from "components/formula/FormulaExpression/components/Collapse";
import { FormulaExpressionMenu } from "components/formula/FormulaExpression/components/Menu";
import { Hoverable } from "components/ui/Hoverable";
import { useFormulasStore } from "modules/formulas";
import { FormulaExpression } from "modules/formulas/models";
import { selectEditFormula } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";

import styles from "./index.module.css";
import { useStyles } from "./styles";

interface Props extends FlexProps {
  index: FormulaIndex;
  expression: FormulaExpression;
}

export const FormulaExpressionControls: FC<Props> = ({
  expression,
  index,
  className,
  ...props
}) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes, cx } = useStyles();

  const inputValue = expression.name;

  const handleNameChange: TextInputProps["onChange"] = (event) => {
    const name = event.target.value;

    return editFormula(index, { name });
  };

  return (
    <Flex
      gap={"xs"}
      pb={"xs"}
      align={"center"}
      className={cx(className, styles.wrapper)}
      {...props}
    >
      <Hoverable hoverTargetClassName={styles.wrapper}>
        {({ className }) => (
          <FormulaDelete className={className} index={index} />
        )}
      </Hoverable>

      <TextInput
        size={"xs"}
        value={inputValue}
        variant={"unstyled"}
        placeholder={"Enter variable name"}
        classNames={{ input: classes.nameInput, root: classes.inputWrapper }}
        onChange={handleNameChange}
      />
      <Hoverable hoverTargetClassName={styles.wrapper}>
        {({ className }) => (
          <FormulaExpressionCollapse
            className={className}
            expression={expression}
            index={index}
          />
        )}
      </Hoverable>

      <Hoverable hoverTargetClassName={styles.wrapper}>
        {({ className }) => (
          <FormulaExpressionMenu
            classNames={{ target: className }}
            expression={expression}
            index={index}
          />
        )}
      </Hoverable>
    </Flex>
  );
};
