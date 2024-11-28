# Setting up the environment 
Before you get started with the Bitsong Abstract SDK, you will need to set up your development environment. This guide will walk you through the process of doing just that.

## Rust
To work with the SDK you will need a Rust toolchain installed on your machine. If you don’t have it installed, you can find installation instructions on the [official Rust website](https://www.rust-lang.org/tools/install).

## WASM
Additionally, you will need the WASM compile target installed to build WASM binaries. You will need `rustup`, which you got when installing Rust on the previous step. To install it the WASM compile target, run:

```sh
$ rustup target add wasm32-unknown-unknown
> installing wasm32-unknown-unknown
```

## Docker

[Docker](https://www.docker.com/) is used to create a containerized environment for facilitating reproducible builds. Specifically we’ll be using [Cosmwasm Optimizer](https://github.com/CosmWasm/optimizer).

## Git
You will also need `git` installed to clone our template repository. You can find instructions for installing `git` on your operative system [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Using the Template
Now we’ll get you set up with the Bitsong Abstract App template which contains:

- A scaffold app module with:
    - A basic contract
    - `cw-orchestrator` interface and deployment script
- Integration tests
    - A set of just commands that will help you in your development.

## Contract file structure

The template contains a scaffold contract that you can use as a starting point for your own contract. The contract is located in the `src` directory and is structured as follows:

- `contract.rs`: Top-level file for your module. It contains the type definition of you module and the const builder that constructs your contract. It also contains a macro that exports your contract’s entry points. You can also specify the contract’s dependencies here.
- `error.rs`: Error types that your contract can return.
- `msg.rs`: Custom message types that your contract can receive. These messages also have `cw-orchestrator` macros attached to them which comes in useful when you are writing your integration tests.
- `state.rs`: State types that your contract will use to store state to the blockchain.
- `interface.rs`: Interface that your contract will use to interact with the `cw-orchestrator` library.
- `replies/`: Reply handlers that your contract will use to handle replies.
- `handlers/`: Message handlers that your contract will use to handle the different messages it can receive.

## Tools used in the template