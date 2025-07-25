# name-service

## Abstract Name Services

The Abstract Name Service is an on-chain data store of the most important address space related data of the blockchain it is deployed on.

The ANS is a smart contract that stores the following data:

* **Assets**: The most relevant assets on the local blockchain.
* **Contracts**: Contracts related to certain protocols or applications that could be dynamically resolved. _**This could be used to store the address for an asset-pair for a DEX.**_ \
  _For example, `bitsong/akt,btsg` could be resolved to the address of a bitsong pool that allows you to swap bitsong for akash._
* **Channels**: IBC channel data to map a protocol + destination chain to a channel id. This allows for dynamic IBC transfers without having to know the channel id beforehand.

### Resolving Entries

The information provided by the ANS is great to have. However, directly calling CosmWasm smart queries on the ANS contract can make your code messy and significantly raise gas usage. For this reason, we offer three methods to efficiently and dependably execute low-gas queries on the ANS contract.

There are three ways to resolve your entry into its matching value.

#### `AbstractNameService Trait (Recommended)`

Both App and Adapter objects implement the AbstractNameService trait which allows you to resolve entries.

```rs
let btsg_name = AssetEntry::new("btsg");
let btsg_asset_info = my_app.name_service(deps).query(&btsg_name)?;
```

#### `Resolve Trait`

Entries that are resolvable by the Abstract Name Service implement the `Resolve` trait which gives them the ability to be resolved by ANS explicitly.

```rs
let ans_host = my_app.ans_host(deps)?;
let btsg_name = AssetEntry::new("btsg");
let btsg_asset_info = btsg_name.resolve(&deps.querier, &ans_host)?;
```

#### `AnsHost Object`

You can also load or create an `AnsHost` struct. This struct is a simple wrapper around an Addr and implements methods that perform raw queries on the wrapped address.

```rs
let ans_host = AnsHost {address: "btsg1...."};
let btsg_name = AssetEntry::new("btsg");
let btsg_asset_info = ans_host.query_asset(deps, &btsg_name)?;
```
