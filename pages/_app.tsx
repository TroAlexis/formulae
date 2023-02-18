import "../styles/globals.css";

import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Meta } from "components/app/Meta";
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

        <Meta />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={themeOverrides}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default App;
