import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import {
  getRightSectionWidth,
  useStyles,
} from "components/formula/FormulasFavorites/components/Item/components/NameInput/styles";
import React, { ChangeEventHandler, FC, FormEventHandler } from "react";
import { wrapFunctionCall } from "utils/function";

interface Props {
  name?: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSave: FormEventHandler<HTMLFormElement>;
  onCancel: () => unknown;
}

export const FormulasFavoritesItemNameInput: FC<Props> = ({
  name,
  onChange,
  onSave,
  onCancel,
  className,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSave(event);
  };

  const wrapperProps = {
    component: "form",
    onSubmit: handleSubmit,
    onKeyDown: getHotkeyHandler([["Escape", onCancel]]),
  };

  const handleCancel = wrapFunctionCall(onCancel);

  const RIGHT_SECTION_WIDTH = getRightSectionWidth(theme);

  return (
    <TextInput
      variant={"unstyled"}
      size={"sm"}
      value={name}
      placeholder={"Enter formula name"}
      classNames={{ input: classes.nameInput, wrapper: classes.wrapper }}
      autoFocus
      className={className}
      wrapperProps={wrapperProps}
      onChange={onChange}
      rightSectionWidth={RIGHT_SECTION_WIDTH}
      rightSection={
        <>
          <ActionIcon
            size={"sm"}
            variant={"subtle"}
            onClick={handleCancel}
            mr={"xs"}
          >
            <IconX size={theme.spacing.sm} />
          </ActionIcon>
          <ActionIcon size={"sm"} variant={"subtle"} type={"submit"}>
            <IconDeviceFloppy size={theme.spacing.sm} />
          </ActionIcon>
        </>
      }
    />
  );
};
