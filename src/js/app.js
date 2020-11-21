import configSchema from "../data/config.json";

const developmentConfig = {
  debugMode: true,
  defaultMapName: "bkz_apricity_v3",

  wsEndpoint: "",
  apiClientCacheLifetime: 86400,
};

const loadScript = async (scriptPath) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.setAttribute("defer", "");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptPath);

    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const loadComponent = async (component) => {
  return loadScript(`conf/components/${component}`);
};

(async function () {
  const defaultConfig = configSchema.reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: item.defaultValue,
    };
  }, {});

  Object.assign(overlayConfig, {
    ...defaultConfig,
    ...overlayConfig,
  });

  if (process.env.ROLLUP_WATCH) {
    Object.assign(overlayConfig, {
      ...overlayConfig,
      ...developmentConfig,
    });
  }

  await Promise.all(overlayConfig.componentsToLoad.map(loadComponent));
  await loadScript("js/overlay-bundle.js");
})();
