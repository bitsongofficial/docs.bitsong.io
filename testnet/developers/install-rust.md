# Install rust

Rust is the main programming language used for CosmWasm smart contracts. While WASM smart contracts can theoretically be written in any programming language, CosmWasm libraries and tooling work best with Rust.

First, [**install rustup**](https://rustup.rs/).

Then run the following commands:

```bash
# 1. Set 'stable' as the default release channel:
rustup default stable
cargo version
# If this is lower than 1.50.0+, update
rustup update stable

# 2. Add WASM as the compilation target:
rustup target list --installed
rustup target add wasm32-unknown-unknown

# 3. Install the following packages to generate the contract:
cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-script
```
