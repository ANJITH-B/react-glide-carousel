import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

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
  external: ["react"],
  plugins: [
    resolve(),
    commonjs(),
    {
      // CSS is generated separately by @tailwindcss/cli; strip imports from the JS bundle
      name: "strip-css",
      transform(_, id) {
        if (id.endsWith(".css")) return { code: "", map: null };
      },
    },
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      rootDir: "src",
    }),
  ],
};
