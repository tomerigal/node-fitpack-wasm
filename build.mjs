// exec `run wasm-pack build --target nodejs` to generate the wasm file by nodejs
// import exec
import { exec } from "child_process";
import { promisify } from "util";
import { readFile, writeFile, rm } from "fs/promises";

await promisify(exec)("wasm-pack build --target deno");

// rename the js files
let wasmFileContent = await readFile("pkg/node_fitpack_wasm.js", "utf8");
wasmFileContent = `import fs from 'fs/promises';\n${wasmFileContent}`;
wasmFileContent = wasmFileContent.replace("Deno.readFile", "fs.readFile");
await writeFile("pkg/node-esm.js", wasmFileContent, "utf8");
await rm("pkg/node_fitpack_wasm.js");

// create package.json
const cargoToml = await readFile("Cargo.toml", "utf8");
const version = cargoToml.match(/version = "(.*?)"/)[1];
const name = cargoToml.match(/name = "(.*?)"/)[1];
const description = cargoToml.match(/description = "(.*?)"/)[1];
const author = JSON.parse(cargoToml.match(/authors = \[(.*?)\]/)[1]);
const license = cargoToml.match(/license = "(.*?)"/)[1];
const repository = cargoToml.match(/repository = "(.*?)"/)[1];
const keywords = JSON.parse(`[${cargoToml.match(/keywords = \[(.*?)\]/)[1]}]`);

const packageJson = {
  name: name,
  version: version,
  description: description,
  main: "node-esm.js",
  module: "node-esm.js",
  types: "node_fitpack_wasm.d.ts",
  author: author,
  license: license,
  repository: repository,
  keywords: keywords,
  type: "module",
  exports: {
    ".": "./node-esm.js",
  },
  files: [
    "node_fitpack_wasm.d.ts",
    "node_fitpack_wasm_bg.wasm.d.ts",
    "node_fitpack_wasm_bg.wasm",
    "node-esm.js",
  ],
};

await writeFile(
  "pkg/package.json",
  JSON.stringify(packageJson, null, 2),
  "utf8"
);
