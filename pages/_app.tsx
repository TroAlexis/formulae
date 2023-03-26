import "../styles/globals.css";

import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Meta } from "components/app/Meta";
import { Viewport } from "components/app/Viewport";
import { mantineThemeOverrides } from "config/mantine/theme";
import { useThemeStore } from "modules/theme";
import { selectTheme } from "modules/theme/selectors";
import { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";

function App({ Component, pageProps }: AppProps) {
  const theme = useThemeStore(selectTheme);

  const themeOverrides = useMemo<MantineThemeOverride>(
    () => ({
      colorScheme: theme,
      ...mantineThemeOverrides,
    }),
    [theme]
  );

  return (
    <>
      <Head>
        <title>Formulae</title>
      </Head>

      <Meta />
      <Viewport />

      <MantineProvider withGlobalStyles withNormalizeCSS theme={themeOverrides}>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default App;
