import defaultConfig from "../data/config_defaults.json";

(async function () {
  function loadScript(scriptToLoad) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("defer", "");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", scriptToLoad);

      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  Object.assign(overlayConfig, {
    ...defaultConfig,
    ...overlayConfig,
  });

  await Promise.all(
    overlayConfig.componentsToLoad.map((c) =>
      loadScript(`conf/components/${c}`)
    )
  );

  await loadScript("js/overlay-bundle.js");
})();
