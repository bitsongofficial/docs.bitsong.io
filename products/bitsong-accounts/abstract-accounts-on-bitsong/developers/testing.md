# testing

## Testing Your Module

### Integration Testing

Integration testing your contract with the account contracts involves deploying your contract and any of its dependencies to a mock bitsong environment, and any other environment where you want to test actions with. To make this as easy as possible, an `abstract-client` package is available that you can use to deploy on any of your modules to a mock environment. We will cover this client in the next section.

### Local Daemon Testing

Once you have confirmed that your module works as expected you can spin up a local node and deploy  A2B + your app onto the chain. You can do this by running the `local_daemon` example, which uses a locally running Bitsong daemon to deploy to. At this point you can also test your front-end with the contracts.

{% hint style="info" %}
Testing your application on a local daemon is difficult if it depends on other protocols, and those protocols don’t make use of `cw-orchestrator` as there is no easy way to deploy them to the local daemon, except manually.&#x20;
{% endhint %}

### Unit-testing

The lowest level of testing is unit testing. Unit tests allow you to easily test complex, self-contained logic. Because unit tests should be self-contained, any queries made to other contracts need to be mocked. These mocks act as “query catchers”, allowing you to specify a response for a specific query.

Sadly constructing these mock queries is time-consuming and involves a lot of boilerplate. Additionally, there are queries that your module should always support as they are part of its base implementation. For those reasons we created an `abstract-testing` package.

The `abstract-testing` provides you with some small abstractions that allow you to mock Smart and Raw queries with ease.

#### Mock Querier

The abstract-testing package contains a [MockQuerierBuilder](https://docs.rs/abstract-testing/latest/abstract_testing/struct.MockQuerierBuilder.html). It uses the common builder pattern to allow for efficient mock construction. Let’s see how!

**Mocking Raw Queries**

Instead of manually mapping the key-value relation and it’s types, we can use the available contract storage types. Using the storage types ensures that the mock and its data operations are the same as in the actual implementation. It also saves us a lot of work related to key serialization.

**Items and Maps**

The MockQuerierBuilder also provides a `with_items` and `with_maps` function. These functions allow you to easily mock `Item` and `Map` datastores.

This approach allow you to easily map `Item` and `Map` datastores.

```rust
let contract_address = api.addr_make("bitsong1...");
let querier = MockQuerierBuilder::default()
    .with_raw_handler(&contract_address, |key: &str| {
        // Example: Let's say, in the raw storage, the key "KEY" maps to the value "VALUE"
        match key {
            "KEY" => to_json_binary("VALUE").map_err(|e| e.to_string()),
            _ => to_json_binary("").map_err(|e| e.to_string()),
        }
    })
    .build();
```

**Abstract Querier**

The easiest and best way to start using the querier is to use the `AbstractMockQuerierBuilder::mocked_account_querier_builder()` method. This method sets up a mock querier with an initial Bitsong Abstract Account.

## IBC Application Testing

One of the hardest steps in building an interchain application is testing. Due to the complexity of IBC and Cosmos SDK chains there are some trade-offs to consider in your approach to testing.

### Testing Tools

This section aims to provide you with a high-level overview of the available testing tools and how to use them. That way you can make an informed decision on which tool is best for your application’s needs.

#### Mock IBC Testing

he easiest way to test your CosmWasm IBC application is by using [cw-orchestrator’s mock IBC environment](https://orchestrator.abstract.money/interchain/integrations/mock.html). This testing environment allows you to connect multiple `Mock` instances over a virtual IBC connection. Relaying is simulated and you can test your application’s IBC logic without needing to deploy it to a live chain.

**Type: `MockBech32Interchain`**

**Advantages:**

* Easy to set up and use.
* Very fast to execute.
* Easily configurable.

**Disadvantages:**

* Does not support custom Cosmos SDK modules.
* Not end-to-end.
* Can’t make use of existing on-chain infrastructure.

#### Starship

[Starship](https://docs.cosmology.zone/starship) is a kubernetes-based Cosmos SDK environment spawner. It allows you to spin up multiple Cosmos SDK blockchain networks and connect them together. It includes a relayer, faucet and block explorer. Allowing you to test your application in a more realistic environment.

**Type: `Starship`**

**Advantages:**

* Access to Cosmos SDK modules from your smart contract.
* End-to-end testing.
* Can be made available for front-end testing.

**Disadvantages:**

* Slow to execute.
* Requires more setup and knowledge to use.
* Can only run for limited time due to resource constraints.

#### Testnet

The final option is to deploy your application to a testnet. Doing this will ensure your application is tested in a real-world environment and makes it possible to start sharing what you’ve built with others. However, this approach is the most time-consuming and requires the most setup.

**Advantages:**

* Real-world testing.
* Can be shared with others.
* Can be used for marketing purposes.

**Disadvantages:**

* Slow to execute.
* Requires running your own relayer (or partnering with a relayer service).
* Testnets are often unstable.

## Testing Bitsong Apps

### Local & Mock Environments

For local and mock environments, the `AbstractInterchainClient::deploy_on` function exists. This function can take a `MockBech32Interchain` or `Starship` argument and it will deploy the Bitsong Abstract contracts to the environment and set up the necessary IBC connections.

```rust
let interchain = MockBech32InterchainEnv::new(
        vec![("bobnet-1", "bitsong"), ("uni-5", "juno")],
    );
let abstract_interchain = AbstractInterchainClient::deploy_on(&interchain);
// single-chain client
let bitsong_abstract: AbstractClient = abstract_interchain.client("bobnet-1");
```

### Testnet/Mainnet Environments

Abstract maintains deployments for a few testnets and for most mainnets, as well as Bitsong. Instead of re-deploying Bitsong Abstract to these networks you can make use of the `load_from` function on `AbstractInterchainClient`. To do this, first construct an `InterchainDaemon` object with the chains you’d like to use.

```rust
let interchain = DaemonInterchain::new(vec![
        (LOCAL_JUNO, None),
        (LOCAL_BITSONG, None)
    ], &ChannelCreationValidator)?;

let abstract_interchain = AbstractInterchainClient::load_from(&interchain);
// single-chain client
let bitsong_abstract: AbstractClient = abstract_interchain.client("bobnet-1");
```
