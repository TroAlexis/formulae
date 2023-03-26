import { createStyles, MantineTheme } from "@mantine/core";

const CONTROL_HEIGHT = 22;

export const getRightSectionWidth = (theme: MantineTheme) => {
  return `${theme.spacing.md} * 2 + ${theme.spacing.xs}`;
};

export const useStyles = createStyles((theme) => ({
  nameInput: {
    height: CONTROL_HEIGHT,
    minHeight: CONTROL_HEIGHT,
    lineHeight: `${CONTROL_HEIGHT}px`,
    paddingRight: `calc(${getRightSectionWidth(theme)})`,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  wrapper: {
    flex: 1,
  },
}));
