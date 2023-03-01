import { Flex, FlexProps, TextInput, TextInputProps } from "@mantine/core";
import { FormulaDelete } from "components/formula/FormulaDelete";
import { FormulaExpressionCollapse } from "components/formula/FormulaExpression/components/Collapse";
import { FormulaExpressionMenu } from "components/formula/FormulaExpression/components/Menu";
import { Hoverable } from "components/ui/Hoverable";
import { useFormulaContext } from "contexts/useFormulaContext";
import { useFormulasStore } from "modules/formulas";
import { FormulaType } from "modules/formulas/enums";
import { selectEditFormula } from "modules/formulas/selectors";
import React, { FC } from "react";

import styles from "./index.module.css";
import { useStyles } from "./styles";

type Props = FlexProps;

export const FormulaExpressionControls: FC<Props> = ({
  className,
  ...props
}) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes, cx } = useStyles();
  const { formula: expression } = useFormulaContext(FormulaType.EXPRESSION);

  const inputValue = expression.name || "";

  const handleNameChange: TextInputProps["onChange"] = (event) => {
    const name = event.target.value;

    return editFormula(expression.id, { name });
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
        {({ className }) => <FormulaDelete className={className} />}
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
        {({ className }) => <FormulaExpressionCollapse className={className} />}
      </Hoverable>

      <Hoverable hoverTargetClassName={styles.wrapper}>
        {({ className }) => (
          <FormulaExpressionMenu classNames={{ target: className }} />
        )}
      </Hoverable>
    </Flex>
  );
};
