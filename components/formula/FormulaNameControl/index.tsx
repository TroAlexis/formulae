import { Flex, FlexProps, TextInput, TextInputProps } from "@mantine/core";
import { FormulaExpressionMenu } from "components/formula/FormulaExpression/components/Menu";
import { useFormulasStore } from "modules/formulas";
import { FormulaComputable } from "modules/formulas/models";
import { selectEditFormula } from "modules/formulas/selectors";
import { FormulaIndex } from "modules/formulas/types";
import React, { FC } from "react";

import { useStyles } from "./styles";

interface Props extends FlexProps {
  index: FormulaIndex;
  computable: FormulaComputable;
}

export const FormulaNameControl: FC<Props> = ({
  computable,
  index,
  ...props
}) => {
  const editFormula = useFormulasStore(selectEditFormula);
  const { classes } = useStyles();

  const { name, id } = computable;
  const [shortId] = id.split("-");

  const inputValue = name ?? shortId;

  const handleNameChange: TextInputProps["onChange"] = (event) => {
    const name = event.target.value;

    return editFormula(index, { name });
  };

  return (
    <Flex gap={"xs"} pb={"xs"} align={"center"} {...props}>
      <TextInput
        size={"xs"}
        value={inputValue}
        variant={"unstyled"}
        placeholder={"Enter variable name"}
        classNames={{ input: classes.nameInput, root: classes.inputWrapper }}
        onChange={handleNameChange}
      />

      <FormulaExpressionMenu computable={computable} />
    </Flex>
  );
};
