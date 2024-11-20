# Account SDK

This rust crate account is an abstraction programming toolbox that allows you to easily control an Bitsong Abstract Account’s interactions, as well as create your own APIs that can be used by other developers to interact with your unique application. Composability galore!

## APIs
Abstract API objects are Rust structs that expose some smart contract functionality. Such an API object can only be constructed if a contract implements the traits that are required for that API. Access to an API is automatically provided if the trait constraints for the API are met by the contract.

## How It Works
As you’re aware, `abstract-sdk` crate is a toolbox for developers to create composable smart contract APIs. It does this through a combination of supertraits and blanket implementations, two concepts that are native to the Rust language.

:::info

Supertraits are Rust traits that have one or multiple trait bounds while a blanket implementation is a Rust trait implementation that is automatically implemented for every object that meets that trait’s trait bounds. The Abstract SDK uses both to achieve its modular design.

For more information about traits, supertraits and blanket implementations, check out the Rust documentation:

- [Traits](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [Supertraits](https://doc.rust-lang.org/book/ch10-02-traits.html#traits-as-parameters)
- [Blanket Implementations](https://doc.rust-lang.org/book/ch10-02-traits.html#implementing-a-trait-on-a-type)

:::

## Usage
Add `abstract-sdk` to your `Cargo.toml` by running:

```sh
cargo add abstract-sdk
```
Then import the prelude in your contract. This will ensure that you have access to all the traits which should help your IDE with auto-completion.
```rs
use abstract_sdk::prelude::*;
```
## Creating Your Own API 

## Appendix

### Available API Objects
The following API objects are available in the Abstract SDK:
- [Bank](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.Bank.html)
- [Executor](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.Executor.html)
- [Apps](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.Apps.html)
- [Adapters](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.Adapters.html)
- [IbcClient](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.IbcClient.html)
- [ModuleRegistry](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.ModuleRegistry.html)
- [Modules](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.Modules.html)
- [AccountRegistry](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.AccountRegistry.html)