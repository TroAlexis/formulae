import { Flex, FlexProps, TextInput, TextInputProps } from "@mantine/core";
import { FormulaDelete } from "components/formula/FormulaDelete";
import { FormulaExpressionMenu } from "components/formula/FormulaExpression/components/Menu";
import { getFormulaName } from "components/formula/FormulasFavorites/components/Item/utils";
import { Hoverable } from "components/ui/Hoverable";
import { useFormulasStore } from "modules/formulas";
import { FormulaComputable } from "modules/formulas/models";
import { selectEditFormula } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";

import styles from "./index.module.css";
import { useStyles } from "./styles";

interface Props extends FlexProps {
  index: FormulaIndex;
  computable: FormulaComputable;
}

export const FormulaNameControl: FC<Props> = ({
  computable,
  index,
  className,
  ...props
}) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes, cx } = useStyles();

  const inputValue = getFormulaName(computable);

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
          <FormulaExpressionMenu
            classNames={{ target: className }}
            computable={computable}
          />
        )}
      </Hoverable>
    </Flex>
  );
};
