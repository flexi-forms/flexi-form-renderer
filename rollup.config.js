/** @format */

import styles from "rollup-plugin-styles";
import autoprefixer from "autoprefixer";
import babel from "@rollup/plugin-babel";
import sourcemaps from "rollup-plugin-sourcemaps";
import image from "rollup-plugin-img";
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const input = "./index.js";

var MODE = [
  {
    fomart: "cjs",
  },
  {
    fomart: "esm",
  },
  {
    fomart: "umd",
  },
];

var config = [];

MODE.map((m) => {
  var conf = {
    input: input,
    output: {
      name: "flexi-forms-renderer",
      file: `dist/index.${m.fomart}.js`,
      format: m.fomart,
      exports: "auto",
      interop: "auto",
    },
    external: ["react", /@babel\/runtime/],
    plugins: [
      peerDepsExternal(),
      image({
        limit: 10000,
      }),
      babel({
        exclude: "node_modules/**",
        plugins: ["@babel/transform-runtime"],
        babelHelpers: "runtime",
      }),
      sourcemaps(),
      styles({
        postcss: {
          plugins: [autoprefixer()],
        },
      }),
      resolve(),
			terser(),
    ],
  };
  config.push(conf);
});

export default [...config];