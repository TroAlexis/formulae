import { MantineThemeOverride, rem } from "@mantine/core";
import { montserrat, noto } from "config/fonts";

export const ACTION_COLOR = "indigo";

export const mantineThemeOverrides: MantineThemeOverride = {
  spacing: {
    xs: rem(8),
    sm: rem(16),
    md: rem(24),
    xl: rem(32),
    lg: rem(40),
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
