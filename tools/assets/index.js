const pwaAssetGenerator = require("pwa-asset-generator");

(async () => {
  const outputFolderPath = "./public/icons";
  const logoPath = "./assets/images/logo.svg";
  const logoTinyPath = "./assets/images/logo-tiny.svg";

  const sharedOptions = {
    manifest: "./public/manifest.json",
    pathOverride: "/icons",
    quality: 100,
    xhtml: true,
  };

  /* Generate splash dark mode images */
  await pwaAssetGenerator.generateImages(logoPath, outputFolderPath, {
    background: "#1A1B1E",
    darkMode: true,
    splashOnly: true,
    ...sharedOptions,
  });

  /* Generate splash light mode images */
  await pwaAssetGenerator.generateImages(logoPath, outputFolderPath, {
    splashOnly: true,
    ...sharedOptions,
  });

  /* Generate favicon */
  await pwaAssetGenerator.generateImages(logoTinyPath, outputFolderPath, {
    favicon: true,
    iconOnly: true,
    opaque: false,
    type: "png",
    ...sharedOptions,
  });

  /* Generate images */
  await pwaAssetGenerator.generateImages(logoPath, outputFolderPath, {
    iconOnly: true,
    mstile: true,
    opaque: false,
    ...sharedOptions,
  });
})();
