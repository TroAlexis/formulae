const pwaAssetGenerator = require("pwa-asset-generator");

const args = process.argv.slice(2);

const [mode] = args;

const checkModeIs = (value, mode) => value === undefined || value === mode;

(async () => {
  const outputFolderPath = "./public/icons";
  const logoPath = "./assets/images/logo.svg";
  const logoTinyPath = "./assets/images/logo-tiny.svg";

  const sharedOptions = {
    manifest: "./public/manifest.json",
    pathOverride: "/formulae/icons",
    quality: 100,
    xhtml: true,
  };

  const isSplash = checkModeIs(mode, "splash");

  if (isSplash || checkModeIs(mode, "splash-light")) {
    /* Generate splash dark mode images */
    await pwaAssetGenerator.generateImages(logoPath, outputFolderPath, {
      background: "#1A1B1E",
      darkMode: true,
      splashOnly: true,
      ...sharedOptions,
    });
  }

  if (isSplash || checkModeIs(mode, "splash-dark")) {
    /* Generate splash light mode images */
    await pwaAssetGenerator.generateImages(logoPath, outputFolderPath, {
      splashOnly: true,
      ...sharedOptions,
    });
  }

  if (checkModeIs(mode, "favicon")) {
    /* Generate favicon */
    await pwaAssetGenerator.generateImages(logoTinyPath, outputFolderPath, {
      favicon: true,
      iconOnly: true,
      opaque: false,
      padding: "0",
      type: "png",
      ...sharedOptions,
    });
  }

  if (checkModeIs(mode, "icons")) {
    /* Generate images */
    await pwaAssetGenerator.generateImages(logoPath, outputFolderPath, {
      iconOnly: true,
      mstile: true,
      opaque: false,
      ...sharedOptions,
    });
  }
})();
