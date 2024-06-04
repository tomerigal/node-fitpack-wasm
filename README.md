# WebAssembly wrapper for the [rusty-fitpack](https://github.com/mitric-lab/Rusty-FITPACK) crate.

This library provides a WebAssembly wrapper for the [rusty-fitpack](https://github.com/mitric-lab/Rusty-FITPACK) crate. It is intended to be used in the node.js environment.

## Installation

```bash
npm install node-fitpack-wasm
```

## Usage

```javascript
import { splrep } from "node-fitpack-wasm";

const x = [0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
const y = [
  0.0, 1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0, 81.0, 100.0, 121.0,
];

const { t, c, k } = splrep(x, y);
```

## Building

```bash
node build.mjs
```

## Testing

```bash
node --test
```

## API

[https://docs.rs/rusty-fitpack/0.1.2/rusty_fitpack](https://docs.rs/rusty-fitpack/0.1.2/rusty_fitpack)

## References

- [Rusty-FITPACK](https://github.com/mitric-lab/Rusty-FITPACK)
