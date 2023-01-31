import { ActionIcon, ActionIconProps, Group, GroupProps } from "@mantine/core";
import { IconCalculator, IconHash } from "@tabler/icons-react";
import { useStyles } from "components/formula/FormulaCreator/Controls/styles";
import { useFormulasStore } from "modules/formulas";
import { FormulaOperatorType } from "modules/formulas/enums";
import {
  selectAddFormula,
  selectCloseExpression,
  selectIsComputableAddable,
  selectIsExpressionCloseable,
  selectIsExpressionOpenable,
  selectIsOperatorAddable,
  selectOpenExpression,
} from "modules/formulas/selectors";
import {
  createFormulaOperator,
  getBasicFormulaValue,
} from "modules/formulas/utils";
import React, { ComponentProps, FC } from "react";

interface Props extends GroupProps {}

type ButtonProps = ActionIconProps &
  Pick<ComponentProps<"button">, "onClick" | "id">;

const FormulaCreatorControls: FC<Props> = (props) => {
  const addFormula = useFormulasStore(selectAddFormula);
  const openExpression = useFormulasStore(selectOpenExpression);
  const closeExpression = useFormulasStore(selectCloseExpression);

  const isOperatorAddable = useFormulasStore(selectIsOperatorAddable);
  const isComputableAddable = useFormulasStore(selectIsComputableAddable);
  const isExpressionOpenable = useFormulasStore(selectIsExpressionOpenable);
  const isExpressionCloseable = useFormulasStore(selectIsExpressionCloseable);

  const addPlus = () =>
    addFormula(createFormulaOperator({ value: FormulaOperatorType.ADDITION }));

  const addValue = () => addFormula(getBasicFormulaValue());

  const { classes } = useStyles();

  const buttons: ButtonProps[] = [
    {
      onClick: addValue,
      disabled: !isComputableAddable,
      children: <IconHash />,
      id: "value",
    },
    {
      onClick: addPlus,
      disabled: !isOperatorAddable,
      children: <IconCalculator />,
      id: "operator",
    },
    {
      onClick: openExpression,
      disabled: !isExpressionOpenable,
      children: "(",
      id: "open-expression",
    },
    {
      onClick: closeExpression,
      disabled: !isExpressionCloseable,
      children: ")",
      id: "close-expression",
    },
  ];

  return (
    <Group grow spacing={0} {...props}>
      {buttons.map(({ id, ...button }) => (
        <ActionIcon
          key={id}
          className={classes.control}
          size={"lg"}
          p={4}
          radius={0}
          variant={"light"}
          {...button}
        />
      ))}
    </Group>
  );
};

export default FormulaCreatorControls;
