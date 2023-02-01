import { createStyles } from "@mantine/core";

const CONTROL_HEIGHT = 20;

export const useStyles = createStyles((theme) => ({
  nameInput: {
    color: theme.colors.dark[3],
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
