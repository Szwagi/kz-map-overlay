import fs from "fs";
import path from "path";

import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";

import { stringify } from "javascript-stringify";

const loader = {
  input: "src/js/app.js",
  output: {
    file: "build/js/app.js",
    format: "iife",
  },
  plugins: [
    json(),
    replace({
      "process.env.ROLLUP_WATCH": process.env.ROLLUP_WATCH,
    }),
    generateConfig(),
    babel({ babelHelpers: "bundled" }),
    copy({
      targets: [{ src: ["src/js/app.js"], dest: "build/js" }],
    }),
  ],
};

const bundle = {
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
    json(),
    babel({ babelHelpers: "bundled" }),
    copy({
      targets: [{ src: ["src/*", "!src/js", "!src/data"], dest: "build" }],
    }),
  ],
};

function generateConfig() {
  return {
    name: "generate-config",
    load() {
      const file = path.resolve("./src/data/config.json");
      this.addWatchFile(file);
    },

    generateBundle() {
      const configPath = path.resolve("./src/data/config.json");

      const configData = fs.readFileSync(configPath);
      const config = JSON.parse(configData);

      // Grab only variables supposed to be serialized
      const serializable = config.filter((c) => c.serialize ?? true);

      const stringified = serializable.reduce((str, obj) => {
        const val = stringify(obj.defaultValue);
        const desc = obj.description ?? "No description";
        return (str += `\n  // ${desc}\n  ${obj.name}: ${val},\n`);
      }, "");

      const output = `const overlayConfig = {${stringified}};`;

      const destPath = path.resolve("./build/conf/config.js");
      const destDir = path.dirname(destPath);

      fs.mkdirSync(destDir, { recursive: true });
      fs.writeFileSync(destPath, output);
    },
  };
}

export default [loader, bundle];
