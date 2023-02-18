import { PRIMARY_COLOR } from "config/mantine/theme";
import { addBasePath } from "next/dist/client/add-base-path";
import React, { FC } from "react";

export const Meta: FC = ({}) => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      {/* Description */}
      <meta name="description" content="Variable formulae creator" />
      <meta name="keywords" content="calculator formula" />

      {/* Android */}
      <meta name="theme-color" content={PRIMARY_COLOR} />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content="Formulae" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Windows  */}
      <meta name="msapplication-navbutton-color" content={PRIMARY_COLOR} />
      <meta name="msapplication-TileColor" content={PRIMARY_COLOR} />
      <meta
        name="msapplication-TileImage"
        content={addBasePath("ms-icon-144x144.png")}
      />
      <meta
        name="msapplication-config"
        content={addBasePath("browserconfig.xml")}
      />

      {/* Pinned Sites  */}
      <meta name="application-name" content="Formulae" />
      <meta name="msapplication-tooltip" content="Variable formulae creator" />
      <meta name="msapplication-starturl" content="/formulae" />

      {/* Tap highlighting  */}
      <meta name="msapplication-tap-highlight" content="no" />

      {/* UC Mobile Browser  */}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />

      {/* Layout mode */}
      <meta name="layoutmode" content="fitscreen/standard" />

      {/* imagemode - show image even in text only mode  */}
      <meta name="imagemode" content="force" />

      {/* Orientation  */}
      <meta name="screen-orientation" content="portrait" />

      {/*  Android  */}
      <link
        href={addBasePath("icons/icon-192x192.png")}
        rel="icon"
        sizes="192x192"
      />

      {/*  Others */}
      <link
        href={addBasePath("favicon.ico")}
        rel="shortcut icon"
        type="image/x-icon"
      />

      {/*  Manifest.json  */}
      <link href={addBasePath("manifest.json")} rel="manifest" />
    </>
  );
};
