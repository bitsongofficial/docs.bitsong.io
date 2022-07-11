# Merkledrop

### Abstract

This document specifies the _merkledrop_ module of the BitSong chain.

The _merkledrop_ module enables the BitSong chain to support the ability to simply create custom token airdrops on chain. In this sense, any user can realize a custom airdrop for his community.

Fantokens owners can use this module to airdrop their new minted fantokens to their fans. Similarly, also tokenholders are enabled to create airdrop for any occasion (e.g., as the result of a competition).

### Merkledrop

Based on the _Merkle Tree_ data structure, the merkledrops are very performant airdrops for the BitSong community.

It is possible to identify each _merkledrop_ through its `id` and the module allows the users involved to autonomously claim tokens in the temporal window between the `StartHeight` and the `EndHeight` blocks.

Thanks to the _merkledrop_ module, users on BitSong can:

* manage _merkledrop_, create and claim them;
* build applications that use the _merkledrops_ API to create completely new custom airdrops.

Features that may be added in the future are described in Future Improvements.

## Concepts

### Merkledrop

Merkledrops are basically airdrop (i.e., [crypto projects sending free tokens to the communities in a bid to encourage adoption](https://www.coindesk.com/learn/what-is-a-crypto-airdrop/)). They are based on the usage of the `Merkle Tree`. Thanks to the features of these data structure (i.e., a binary tree where each _non-leaf_ node is the hash of its childs) they are particularly efficient in space usage and during the verification process (as explained in the Verification process).

A **merkledrop** is characterized by:

| Attribute     | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | `uint64` | It is an integer that identify the drop. It is assigned automatically by the module.                                                                                                                                                                                                                                                                                                                                                                          |
| merkle\_root  | `string` | It should correspond to the _hash root_ of the merkledrop.                                                                                                                                                                                                                                                                                                                                                                                                    |
| start\_height | `int64`  | It is the block height value at which the drop allows the user to claim the tokens. It should be greater or equal to the current block height (the one where the transaction is included) and, if the user pass (as parameter) a value lower than the minimum available, it will be automatically set to the current block height. Moreover, there exists an upper bound for this value, that corresponds to the value of the `actual block height + 100000`. |
| end\_height   | `int64`  | It is the block height value where the _merkledrop_ is considered expired and an automatic withdrawal is executed if part of the tokens were not claimed. This value must be greater than the `start_height` and lower than a maximum value of `start_height + 5000000`.                                                                                                                                                                                      |
| denom         | `string` | It corresponds to the `denom` of the token to drop.                                                                                                                                                                                                                                                                                                                                                                                                           |
| amount        | `string` | It is the total `amount` of token to drop.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| claimed       | `string` | It corresponds to the value of claimed tokens from the users. At the beginning it is 0 and is increased at each claim.                                                                                                                                                                                                                                                                                                                                        |
| owner         | `string` | It is to the address of the wallet which is creating the _merkledrop_.                                                                                                                                                                                                                                                                                                                                                                                        |

### Merkle Tree

The Merkle Tree is a data structure discovered by Ralph Merkle in 1979. In such a tree, every node (aka **leaf**) is labelled with the hash of a data block, and every _non-leaf_ node is labelled with the hash of the of its child nodes. A simple example is depicted in the figure below, while more information can be found on [wikipedia](https://en.wikipedia.org/wiki/Merkle\_tree).

### Verification process

The verification process corresponds to check if the proofs received are valid. In this sense, since it is used a merkle tree, it is possible to check whether the proof belongs to the _merkledrop_ without having to deal with all the data that make up the tree. An exmaple of verification process is depicted in the figure below.

More specifically, in this example, _G_ block of data is provided and, its hash can be simply calculated. Starting from this, it is possible to verify the correctness of the data by only using _4 proofs_, since thanks to these hash values it is possible to calculate the _merkle root_ and compare it with the value saved on the blockchain. In particular, by calculating HG, together with HH, it is possible to calculate HGH. This value can be used to calculate, together with the proof HEF, the value of HEFGH. This value allows, together with HABCD to calculate HABCDEFGH that, with HIJKLMNOP, allows to determine the merkle root. This value can be compared with the one saved on the blockchain to verify if the user can claim the tokens he says to own. Thanks to this approach, it is possible to save **only the merkle root value on the blockchain** and receive the **proofs by the user**.

This approach works thanks to the features of the hashing functions (in this implementation it is used the [sha-256](https://it.wikipedia.org/wiki/Secure\_Hash\_Algorithm)). In particular, it plays an important role the avalanche effect (i.e., a small change to the message should correspond to an high change in the hash result).

## State

The `merkledrop` module keeps track of **LastMerkledropId**, **Merkledrops**, **Indexes** and **Parameters**.

```
LastMerkledropId: Uint64,
Merkledrops:      []types.Merkledrop,
Indexes:          []*types.Indexes,
Params:           types.Params
```

### LastMerkledropId

This value is an integer that corresponds to the number of _merkledrops_ already created. It is used at the creation of a new merkledrop as its id.

### Merkledrops

The state contains a list of **Merkledrops**. They are airdrop configuration, and their state information is:

* **Id** that corresponds to the identifier of the _merkledrop_. It is an `uint64`, automatically incremented everytime a new merkledrop is created;
* **MerkleRoot**, that represent the root hash (in hex format) of the _merkle tree_ containing the data of the airdrop;
* **StartHeight**, that is the block height value at which the drop allows the user to claim the tokens;
* **EndHeight**, which corresponds to the block height value where the _merkledrop_ is considered expired and an automatic withdrawal is executed if part of the tokens were not claimed;
* **Denom**, which corresponds to the `denom` of the token to drop;
* **Amount**, that is the total `amount` of token to drop;
* **Claimed** which corresponds to the value of claimed tokens from the users. At the beginning it is 0 and is increased at each claim;
* **Owner** which is to the address of the wallet which is creating the _merkledrop_.

```go
type Merkledrop struct {
	Id 		uint64
	MerkleRoot 	string
	StartHeight 	int64
	EndHeight 	int64
	Denom 		string
	Amount 		sdk.Int
	Claimed 	sdk.Int
	Owner 		string
}
```

### Indexes

To perform the check operations, a list of index is also stored in the state for each merkledrop.

```go
type Indexes struct {
	MerkledropId uint64
	Index        []uint64
}
```

### Params

In the state definition, we can find the **Params**. This section corresponds to a module-wide configuration structure that stores system parameters. In particular, it defines the overall merkledrop module functioning and contains the **creationFee** for the _merkledrop_. Such an implementation allows governance to decide the creation fee, in an arbitrary way - since proposals can modify it.

```go
type Params struct {
	CreationFee	sdk.Coin
}
```

## Messages

Messages (`msg`s) are objects that trigger state transitions. Messages are wrapped in transactions (`tx`s) that clients submit to the network. The BitSong SDK wraps and unwraps `merkledrop` module messages from transactions.

### MsgCreate

The `MsgCreate` message is used to create a new _merkledrop_. It takes as input `Owner`, `MerkleRoot`, `StartHeight`, `EndHeight`, and `Coin`. The value of the block height at which the drop become available (the **starting** block) must be greater or equal to the block height where the transaction is included. For this reason, if the users select **0** as `StartHeight` it will be automatically set to the current block height (the one where the transaction is included). Moreover, there exists an upper bound for this value, that corresponds to the value of the `actual block height + 100000`. This choice derives from a design pattern that avoid the generation of _spam_ _merkledrop_. At the same time, the `EndHeight` value, which corresponds to the block height where the _merkledrop_ can be considered expired and the withdrawal is executed if part of the tokens were not claimed. This value must be greater than the `StartHeight` and lower than a maximum value of `StartHeight + 5000000`. The `Coin` is made up of the `denom` of the token to distribute and the `amount`, which corresponds to the sum of all the tokens to drop. Once the module has verified that the `owner` address is valid and that the `merkletree root` is a hexadecimal character string, it **deduct the `creation fee` from the owner wallet** and send the `coin` (the amount of token to drop), from the owner address to the module. At this point, the `LastMerkleDropId` is increased and the _merkledrop_ is created, by assigning **zero to the claimed value** (since at the creation time, no one claimed any token). They are added three indexes:

* on the `merkledrop_id`;
* on the `owner`;
* on the `end_height`.

These indexes improve the query operations and some process described in the end\_block operations. An event of type `EventCreate` is emitted at the end of the creation process.

```go
type MsgCreate struct {
	Owner			string
	MerkleRoot		string
	StartHeight		int64
	EndHeight		int64
	Coin			sdk.Coin
}
```

### MsgClaim

The `MsgClaim` message is used to claim tokens from an active _merkledrop_. It takes as input `Sender`, `MerkledropId`, `Index`, the `Amount` to claim, and a list of `Proofs`. In such a scenario, verified the validity of the `sender` address and the existence of the _merkledrop_ by the ID, if the airdrop is currently active (i.e., its `start block height` is lower than the current block height and its `end block height` is greater than the current one), the module verifies if the `sender` already claimed his tokens (by querying at an index). In case he didn't, the module proceeds retriving the merkletree root for the _merkledrop_ from the chain and verifies the proofs (as described in the verification process). After tese verifications, the module only checks if the coin the `sender` wants to claim are available, and send those tokens from the module to the `sender` wallet. At this point, the claim is stored through its index, the claimed tokens are added to the actually claimed amount and, if all the drops are claimed with this operation, the merkledrop is cleaned by the state. An event of type `EventClaim` is emitted at the end of the claim process.

```go
type MsgClaim struct {
	Sender			string
	MerkledropId	uint64
	Index			uint64
	Amount			sdk.Int 
	Proofs			[]string
}
```

## End-Block

Each abci end block call, the operations to update the pending _merkledrops_ are specified to execute. More specifically, since each _merkledrop_ is characterized by an `EndHeight` (i.e., the block height at which the airdrop expires), the module can verify at each block if there is any expired _merkledrop_ at that particular time. To perform the operations, the module is able to retrive the the _merkledrops_ ids by the `EndHeight` and to process those drops. In particular, for each retrived _merkledrop_ they are executed the `withdraw` of the unclaimed tokens and then, the _merkledrop_ is cleaned by the state.

### Withdraw

If at the the `EndHeight` block the _merkledrop_ is still in the store, it means that not all the tokens were claimed. For this reason, the module automatically performs a **withdraw** of the unclaimed tokens to the owner wallet. In particular, the module verifies if the `total amount` is lower than the `claimed amount`, calculates the balance as the unclaimed tokens (i.e., the `total amount` - the `claimed` one). This amount is sent to the owner wallet and a corresponding event of type `EventWithdraw` is emitted.

### Delete completed merkledrop

Once the _merkledrop_ ended and its unclaimed tokens have been withdrawn, it is possible to clean indexes and store from the drop. More specifically, it is removed by the list of _merkledrop_ per `owner`, all the indexes linked to its `id` are deleted together with the `merkledrop` object in the store.

## Events

The merkledrop module emits the following events:

### EventCreate

| Type                                   | Attribute Key  | Attribute Value                         |
| -------------------------------------- | -------------- | --------------------------------------- |
| message                                | action         | `/bitsong.merkledrop.v1beta1.MsgCreate` |
| bitsong.merkledrop.v1beta1.EventCreate | owner          | {owner}                                 |
| bitsong.merkledrop.v1beta1.EventCreate | merkledrop\_id | {merkledrop\_id}                        |

### EventClaim

| Type                                  | Attribute Key  | Attribute Value                        |
| ------------------------------------- | -------------- | -------------------------------------- |
| message                               | action         | `/bitsong.merkledrop.v1beta1.MsgClaim` |
| bitsong.merkledrop.v1beta1.EventClaim | merkledrop\_id | {merkledrop\_id}                       |
| bitsong.merkledrop.v1beta1.EventClaim | index          | {index}                                |
| bitsong.merkledrop.v1beta1.EventClaim | coin           | {coin}                                 |

### EventWithdraw

| Type                                     | Attribute Key  | Attribute Value  |
| ---------------------------------------- | -------------- | ---------------- |
| bitsong.merkledrop.v1beta1.EventWithdraw | merkledrop\_id | {merkledrop\_id} |
| bitsong.merkledrop.v1beta1.EventWithdraw | coin           | {coin}           |

## Parameters

Merkledrop module parameters.

| Key         | Type             | Value                                     |
| ----------- | ---------------- | ----------------------------------------- |
| CreationFee | sdk.NewInt64Coin | {"denom": "ubtsg", "amount": "100000000"} |

## Client

### Transactions

The `transactions` commands allow users to `create` and `claim` for _merkledrops_.

```
bitsongd tx merkledrop --help
```

#### create

```
bitsongd tx merkledrop create [account-file] [output-file] \
	--denom=ubtsg \
	--start-height=1 \
	--end-height=10 \
	--from=<key-name> -b block --chain-id <chain-id>
```

#### claim

```
bitsongd tx merkledrop claim [merkledrop-id] \
	--proofs=[proofs-list] \
	--amount=[amount-to-claim] \
	--index=[level-index]
	--from=<key-name> -b block --chain-id <chain-id>
```

### Query

The `query` commands allow users to query the _merkledrop_ module.

```
bitsongd q merkledrop --help
```

#### detail by id

```
bitsongd q merkledrop detail [id]
```

#### if index and id have been claimed

```
bitsongd q merkledrop index-claimed [id] [index]
```

#### params

```
bitsongd q merkledrop params
```
