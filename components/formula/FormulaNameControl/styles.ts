import { createStyles } from "@mantine/core";
import { isLightTheme } from "config/mantine/utils";

const CONTROL_HEIGHT = 20;

export const useStyles = createStyles((theme) => ({
  nameInput: {
    color: isLightTheme(theme) ? theme.colors.dark[3] : theme.colors.dark[0],
    fontWeight: 400,
    height: CONTROL_HEIGHT,
    minHeight: CONTROL_HEIGHT,
    lineHeight: `${CONTROL_HEIGHT}px`,
  },
  inputWrapper: {
    flex: 1,
  },
  iconWrapper: {
    height: CONTROL_HEIGHT,
    minHeight: CONTROL_HEIGHT,
  },
}));
