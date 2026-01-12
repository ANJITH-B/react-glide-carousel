import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    commonjs(),
    postcss(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      rootDir: "src",
    }),
  ],
};
