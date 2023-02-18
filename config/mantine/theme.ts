import { MantineThemeOverride } from "@mantine/core";
import { montserrat, noto } from "config/fonts";

export const ACTION_COLOR = "indigo";

export const mantineThemeOverrides: MantineThemeOverride = {
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    xl: 32,
    lg: 40,
  },
  headings: {
    fontFamily: noto.style.fontFamily,
  },
  fontFamily: montserrat.style.fontFamily,
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
