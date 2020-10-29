import copy from "rollup-plugin-copy";
import babel from "@rollup/plugin-babel";

const config = {
  input: "src/js/main.js",
  external: ["conf/config", "conf/template"],
  output: [
    {
      file: "build/js/overlay-bundle.js",
      format: "iife",
      name: "overlay",
      globals: {
        "conf/config": "overlayConfig",
        "conf/template": "overlayTemplate",
      },
    },
  ],
  plugins: [
    babel({ babelHelpers: "bundled" }),
    copy({
      targets: [{ src: "src/*", dest: "build" }],
      //targets: [{ src: ["src/*", "!src/js"], dest: "build" }],
    }),
  ],
};

export default config;
