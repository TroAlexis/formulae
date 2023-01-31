import { MantineThemeOverride } from "@mantine/core";

export const ACTION_COLOR = "indigo";
export const PRIMARY_COLOR = ACTION_COLOR;

export const mantineThemeOverrides: MantineThemeOverride = {
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    xl: 32,
    lg: 40,
  },
  components: {
    Input: {
      styles: () => ({
        input: { lineHeight: 1.5 },
      }),
    },
    Tooltip: {
      defaultProps: {
        events: {
          hover: true,
          focus: true,
        },
      },
    },
  },
};
