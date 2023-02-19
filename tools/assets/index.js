const pwaAssetGenerator = require("pwa-asset-generator");

const MODE = {
  SPLASH: "splash",
  SPLASH_LIGHT: "splash-light",
  SPLASH_DARK: "splash-dark",
  FAVICON: "favicon",
  ICONS: "icons",
};

const args = process.argv.slice(2);

const [mode] = args;

const checkModeIs = (value, mode) => value === undefined || value === mode;

(async () => {
  const outputFolderPath = "./public/icons";
  const logoPath = "./assets/images/logo.svg";
  const logoTinyPath = "./assets/images/logo-tiny.svg";

  const imageGenerationOptions = {
    manifest: "./public/manifest.json",
    pathOverride: "/formulae/icons",
    quality: 100,
    xhtml: true,
  };

  const shouldGenerateSplashImages = checkModeIs(mode, MODE.SPLASH);
  const shouldGenerateSplashLightImages = checkModeIs(mode, MODE.SPLASH_LIGHT);
  const shouldGenerateSplashDarkImages = checkModeIs(mode, MODE.SPLASH_DARK);

  if (
    shouldGenerateSplashImages ||
    shouldGenerateSplashLightImages ||
    shouldGenerateSplashDarkImages
  ) {
    /* Generate splash images */
    const background = shouldGenerateSplashDarkImages ? "#1A1B1E" : undefined;

    await pwaAssetGenerator.generateImages(logoPath, outputFolderPath, {
      splashOnly: true,
      background,
      darkMode: shouldGenerateSplashDarkImages,
      ...imageGenerationOptions,
    });
  }

  if (checkModeIs(mode, MODE.FAVICON)) {
    /* Generate favicon */
    await pwaAssetGenerator.generateImages(logoTinyPath, outputFolderPath, {
      favicon: true,
      iconOnly: true,
      opaque: false,
      padding: "0",
      type: "png",
      ...imageGenerationOptions,
    });
  }

  if (checkModeIs(mode, MODE.ICONS)) {
    /* Generate images */
    await pwaAssetGenerator.generateImages(logoTinyPath, outputFolderPath, {
      iconOnly: true,
      mstile: true,
      opaque: false,
      ...imageGenerationOptions,
    });
  }
})();
