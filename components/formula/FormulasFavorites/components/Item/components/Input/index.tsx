import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import {
  getRightSectionWidth,
  useStyles,
} from "components/formula/FormulasFavorites/components/Item/components/Input/styles";
import React, { ChangeEventHandler, FC, FormEventHandler } from "react";
import { wrapFunctionCall } from "utils/function";

interface Props {
  value?: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSave: FormEventHandler<HTMLFormElement>;
  onCancel: () => unknown;
  placeholder?: string;
}

export const FormulasFavoritesItemInput: FC<Props> = ({
  value,
  onChange,
  onSave,
  onCancel,
  className,
  placeholder,
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
      value={value}
      classNames={{ input: classes.nameInput, wrapper: classes.wrapper }}
      autoFocus
      className={className}
      placeholder={placeholder}
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
