# cw-orchestrator

## Speed up your development with cw-orchestrator

### Introduction

cw-orchestrator is the most advanced scripting, testing, and deployment framework for CosmWasm smart-contracts. It makes it easy to write cross-environment compatible code for cw-multi-test, Osmosis Test Tube, Starship (alpha), and live networks, significantly reducing code duplication and test-writing time.

Get ready to change the way you interact with contracts. The following steps will allow you to write clean code such as:

```rust
counter.upload()?;
counter.instantiate(&InstantiateMsg { count: 0 }, None, &[])?;

counter.increment()?;

let count = counter.get_count()?;
assert_eq!(count.count, 1);
```

In this quick-start guide, we will review the necessary steps in order to integrate `cw-orch` into a simple contract crate. We review integration of rust-workspaces (multiple contracts) at the end of this page.

> **NOTE**: _Additional content_
>
> If you're moving quicker than everybody else, we suggest looking at [a before-after review of this example integration](https://github.com/AbstractSDK/cw-orch-counter-example/compare/e0a54b074ca1a894bb6e58276944cf2013d152f2..main). This will help you catch the additions you need to make to your contract to be able to interact with it using cw-orchestrator.

**Video Workshop**

If you prefer watching a video, you can follow the workshop below:

{% embed url="https://youtu.be/IZ5_r9JEoUs" %}

### Summary

* Speed up your development with cw-orchestrator
  * Introduction
  * Summary
  * Single Contract Integration
    * Adding `cw-orch` to your `Cargo.toml` file
    * Creating an Interface
    * Interaction helpers
    * Using the integration
  * Integration in a workspace
    * Handling dependencies
    * Creating an interface crate
    * Integrating single contracts
  * More examples and scripts

### Single Contract Integration

#### Adding `cw-orch` to your `Cargo.toml` file

To use cw-orchestrator, you need to add `cw-orch` to your contract's TOML file. Run the command below in your contract's directory:

```shell
cargo add cw-orch
```

Alternatively, you can add it manually in your `Cargo.toml` file as shown below:

```toml
[dependencies]
cw-orch = {version = "0.27.0" } # Latest version at time of writing
```

> **NOTE**: Even if you include `cw-orch` in your dependencies here, it won't be included in your `wasm` contract.

#### Creating an Interface

When using a single contract, we advise creating an `interface.rs` file inside your contract's directory. You then need to add this module to your `lib.rs` file. This file should not be included inside you final wasm. In order to do that, you need to add `#[cfg(not(target_arch = "wasm32"))]` when importing the file.

```rust
#[cfg(not(target_arch = "wasm32"))]
mod interface;
```

Then, inside that `interface.rs` file, you can define the interface for your contract:

```rust
use cw_orch::{interface, prelude::*};

use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};

pub const CONTRACT_ID: &str = "counter_contract";

#[interface(InstantiateMsg, ExecuteMsg, QueryMsg, MigrateMsg, id = CONTRACT_ID)]
pub struct CounterContract;

impl<Chain> Uploadable for CounterContract<Chain> {
    /// Return the path to the wasm file corresponding to the contract
    fn wasm(_chain: &ChainInfoOwned) -> WasmPath {
        artifacts_dir_from_workspace!()
            .find_wasm_path("counter_contract")
            .unwrap()
    }
    /// Returns a CosmWasm contract wrapper
    fn wrapper() -> Box<dyn MockContract<Empty>> {
        Box::new(
            ContractWrapper::new_with_empty(
                crate::contract::execute,
                crate::contract::instantiate,
                crate::contract::query,
            )
            .with_migrate(crate::contract::migrate),
        )
    }
}
```

Learn more about the content of the interface creation specifics in the official [`cw-orch`documentation](https://orchestrator.abstract.money/contracts/interfaces.html#creating-an-interface)

> **NOTE**: It can be useful to re-export this struct to simplify usage (in `lib.rs`):
>
> ```rust,ignore
> #[cfg(not(target_arch = "wasm32"))]
> pub use crate::interface::CounterContract;
> ```

#### Interaction helpers

cw-orchestrator provides a additional macros that simplify contract calls and queries. The macro implements functions on the interface for each variant of the contract's `ExecuteMsg` and `QueryMsg`.

Enabling this functionality is very straightforward. Find your `ExecuteMsg` and `QueryMsg` definitions (in `msg.rs` in our example) and add the `ExecuteFns` and `QueryFns` derive macros to them like below:

```rust
#[cw_serde]
#[derive(cw_orch::ExecuteFns)] // Function generation
/// Execute methods for counter
pub enum ExecuteMsg {
    /// Increment count by one
    Increment {},
    /// Reset count
    Reset {
        /// Count value after reset
        count: i32,
    },
}

#[cw_serde]
#[derive(cw_orch::QueryFns)] // Function generation
#[derive(QueryResponses)]
/// Query methods for counter
pub enum QueryMsg {
    /// GetCount returns the current count as a json-encoded number
    #[returns(GetCountResponse)]
    GetCount {},
}

// Custom response for the query
#[cw_serde]
/// Response from get_count query
pub struct GetCountResponse {
    /// Current count in the state
    pub count: i32,
}
```

Make sure to derive the `#[derive(cosmwasm_schema::QueryResponses)]` macro on your query messages !

Find out more about the interaction helpers in the official [`cw-orch`documentation](https://orchestrator.abstract.money/contracts/interfaces.html#entry-point-function-generation)

> **NOTE**: Again, it can be useful to re-export these generated traits to simplify usage (in `lib.rs`):
>
> ```rust,ignore
> pub use crate::msg::{ExecuteMsgFns as CounterExecuteMsgFns, QueryMsgFns as CounterQueryMsgFns};
> ```

#### Using the integration

Now that all the setup is done, you can use your contract in tests, integration-tests or scripts.

Start by importing your crate, in your `[dev-dependencies]` for instance:

```toml
counter-contract = { path = "../counter-contract"}
```

You can now use:

```rust
use counter_contract::{
    msg::InstantiateMsg, CounterContract, CounterExecuteMsgFns, CounterQueryMsgFns,
};
use cw_orch::{anyhow, prelude::*};

// From https://github.com/CosmosContracts/juno/blob/32568dba828ff7783aea8cb5bb4b8b5832888255/docker/test-user.env#L2
const LOCAL_MNEMONIC: &str = "clip hire initial neck maid actor venue client foam budget lock catalog sweet steak waste crater broccoli pipe steak sister coyote moment obvious choose";
pub fn main() -> anyhow::Result<()> {
    std::env::set_var("LOCAL_MNEMONIC", LOCAL_MNEMONIC);
    dotenv::dotenv().ok(); // Used to load the `.env` file if any
    pretty_env_logger::init(); // Used to log contract and chain interactions

    let network = networks::LOCAL_JUNO;
    let chain = DaemonBuilder::new(network).build()?;

    let counter = CounterContract::new(chain);

    counter.upload()?;
    counter.instantiate(&InstantiateMsg { count: 0 }, None, &[])?;

    counter.increment()?;

    let count = counter.get_count()?;
    assert_eq!(count.count, 1);

    Ok(())
}
```

### Integration in a workspace

In this paragraph, we will use the `cw-plus` repository as an example. You can review:

* [The full integration code](https://github.com/AbstractSDK/cw-plus) with `cw-orch` added
* [The complete diff](https://github.com/cosmwasm/cw-plus/compare/main...abstractsdk:main) that shows you all integration spots (if you want to go fast)

#### Handling dependencies

When using workspaces, you need to add `cw-orch` as a dependency on all crates that include `ExecuteMsg` and `QueryMsg` used in your contracts. You then add the `#[derive(ExecuteFns)]` and `#[derive(QueryFns)]` macros to those messages.

Refer above to Adding `cw-orch` to your `Cargo.toml` file for more details on how to do that.

For instance, for the `cw20_base` contract, you need to execute those 2 steps on the `cw20-base` contract (where the `QueryMsg` are defined) as well as on the `cw20` package (where the `ExecuteMsg` are defined).

#### Creating an interface crate

When using workspace, we advise you to create a new crate inside your workspace for defining your contract's interfaces. In order to do that, use:

```shell
cargo new interface --lib
cargo add cw-orch --package interface 
```

Add the interface package to your workspace `Cargo.toml` file

```toml
[workspace]
members = ["packages/*", "contracts/*", "interface"]
```

Inside this `interface` crate, we advise to integrate all your contracts 1 by 1 in separate files. Here is the structure of the `cw-plus` integration for reference:

```path
interface (interface collection)
├── Cargo.toml
└── src
    ├── cw1_subkeys.rs
    ├── cw1_whitelist.rs
    ├── cw20_base.rs
    ├── cw20_ics20.rs
    └── ..
```

When importing your crates to get the messages types, you can use the following command in the interface folder.

```shell
cargo add cw20-base --path ../contracts/cw20-base/
cargo add cw20 --path ../packages/cw20
```

#### Integrating single contracts

Now that you workspace is setup, you can integrate with single contracts using the above section

### More examples and scripts

You can find more example interactions on the `counter-contract` example directly in the `cw-orchestrator` repo:

* Some examples [showcase interacting with live chains](https://github.com/AbstractSDK/cw-orchestrator/blob/main/contracts/counter/examples/deploy.rs).
* Some other examples show [how to use the library for testing your contracts](https://github.com/AbstractSDK/cw-orchestrator/tree/main/contracts/counter/tests).

> **FINAL ADVICE**: Learn more and explore our [full `cw-orch`documentation](https://orchestrator.abstract.money/contracts/interfaces.html#entry-point-function-generation).
