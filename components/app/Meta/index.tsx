import { useMantineTheme } from "@mantine/core";
import { isLightTheme } from "config/mantine/utils";
import { useThemeStore } from "modules/theme";
import { selectTheme } from "modules/theme/selectors";
import { addBasePath } from "next/dist/client/add-base-path";
import Head from "next/head";
import React, { FC } from "react";

export const Meta: FC = ({}) => {
  const theme = useMantineTheme();
  const userTheme = useThemeStore(selectTheme);

  const THEME_COLOR = isLightTheme(userTheme)
    ? theme.white
    : theme.colors.dark[7];

  return (
    <Head>
      {/*  Manifest.json  */}
      <link href={addBasePath("/manifest.json")} rel="manifest" />

      {/* iOS light mode startup images */}
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2048-2732.jpg")}
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2732-2048.jpg")}
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1668-2388.jpg")}
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2388-1668.jpg")}
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1536-2048.jpg")}
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2048-1536.jpg")}
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1668-2224.jpg")}
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2224-1668.jpg")}
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1620-2160.jpg")}
        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2160-1620.jpg")}
        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1290-2796.jpg")}
        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2796-1290.jpg")}
        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1179-2556.jpg")}
        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2556-1179.jpg")}
        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1284-2778.jpg")}
        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2778-1284.jpg")}
        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1170-2532.jpg")}
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2532-1170.jpg")}
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1125-2436.jpg")}
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2436-1125.jpg")}
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1242-2688.jpg")}
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2688-1242.jpg")}
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-828-1792.jpg")}
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1792-828.jpg")}
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1242-2208.jpg")}
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-2208-1242.jpg")}
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-750-1334.jpg")}
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1334-750.jpg")}
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-640-1136.jpg")}
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-1136-640.jpg")}
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />

      {/* iOS dark mode startup images */}
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2048-2732.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2732-2048.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1668-2388.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2388-1668.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1536-2048.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2048-1536.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1668-2224.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2224-1668.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1620-2160.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2160-1620.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1290-2796.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2796-1290.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1179-2556.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2556-1179.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1284-2778.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2778-1284.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1170-2532.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2532-1170.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1125-2436.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2436-1125.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1242-2688.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2688-1242.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-828-1792.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1792-828.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1242-2208.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-2208-1242.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-750-1334.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1334-750.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-640-1136.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href={addBasePath("/icons/apple-splash-dark-1136-640.jpg")}
        media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />

      {/*  Favicon */}
      <link
        rel="icon"
        type="image/png"
        sizes="196x196"
        href={addBasePath("/icons/favicon-196.png")}
      />

      {/*  Apple favicon */}
      <link
        rel="apple-touch-icon"
        href={addBasePath("/icons/apple-icon-180.png")}
      />

      {/* Description */}
      <meta name="description" content="Formulas creator" />
      <meta name="keywords" content="calculator formula" />

      {/* Android */}
      <meta name="theme-color" content={THEME_COLOR} />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content="Formulae" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* Windows  */}
      <meta name="msapplication-navbutton-color" content={THEME_COLOR} />
      <meta name="msapplication-TileColor" content={THEME_COLOR} />

      <meta name="msapplication-tooltip" content="Formulas creator" />
      <meta name="msapplication-starturl" content="/formulae" />

      <meta
        name="msapplication-square70x70logo"
        content={addBasePath("/icons/mstile-icon-128.png")}
      />
      <meta
        name="msapplication-square150x150logo"
        content={addBasePath("/icons/mstile-icon-270.png")}
      />
      <meta
        name="msapplication-square310x310logo"
        content={addBasePath("/icons/mstile-icon-558.png")}
      />
      <meta
        name="msapplication-wide310x150logo"
        content={addBasePath("/icons/mstile-icon-558-270.png")}
      />

      {/* Pinned Sites  */}
      <meta name="application-name" content="Formulae" />

      {/* Tap highlighting  */}
      <meta name="msapplication-tap-highlight" content="no" />

      {/* UC Mobile Browser  */}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />

      {/* Layout mode */}
      <meta name="layoutmode" content="fitscreen/standard" />

      {/* Orientation  */}
      <meta name="screen-orientation" content="portrait" />
    </Head>
  );
};
