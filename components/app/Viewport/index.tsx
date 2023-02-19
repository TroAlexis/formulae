import { useHydrated } from "hooks/useHydrated";
import Head from "next/head";
import React, { FC } from "react";
import { checkIsIOS } from "utils/window";

interface Props {}

export const Viewport: FC<Props> = ({}) => {
  const [hydrated] = useHydrated();

  if (!hydrated) {
    return null;
  }

  const isIOS = checkIsIOS();

  return (
    <Head>
      <meta
        name="viewport"
        // Prevent iOS from zooming in on input focus
        content={`width=device-width${isIOS ? ", maximum-scale=1" : ""}`}
      />
    </Head>
  );
};
