# Fan Tokens

## What are Fan Tokens?

Fan tokens are a brand new phenomenon already making waves in the sports sector. A fan token is a cryptocurrency issued for the benefit of star performers — whether that’s a world-famous rock band, or an up-and-coming solo talent — and their fans.

Why does the music industry need fan tokens? Because they allow any act or artist to create their own economy, generating new ways to monetise their music and brand, and providing a unique and innovative channel to engage with fans.

BitSong’s Fan Token module allows artists to mint their own branded tokens for any purpose. But here are a few ways that they can be used:

Create a loyalty program allowing fan token holders privileged access to exclusive content such as unreleased materials or behind-the-scenes interviews&#x20;

Crowdfund a tour or studio album and revenue-sharing with token holders&#x20;

Give fans the opportunity to vote, for example, on the song lineup for a gig or on the cities for an upcoming tour&#x20;

Accept fan tokens as payment for NFTs

The BitSong Fan Token module enables any artist to start minting their own fan tokens and list them within a few minutes, for low fees. BitSong also stands apart from other fan token platforms by offering the opportunity to link BitSong Fan Tokens to social profiles, such as Twitter.

### Abstract

This document specifies the _fantoken_ module of the BitSong chain.

The _fantoken_ module enables the BitSong chain to support fan tokens, allowing actors in the content creation industry to create their economy. In this sense, they can generate new ways to monetize their music and brand and provide a unique and innovative channel to engage with fans. Thanks to this module, players from the content creation universe can start minting their _fan tokens_ (which are **fungible tokens**) and listing them within a few minutes for low fees.

#### An example: Fan tokens in the music Industry

In the music industry, for example, _fan tokens_ enable to empower a lot of different scenarios. For instance, it is possible to use them to crowdfund a tour or an album, or even to access exclusive content. The potential of such a system is very massive and, with these few examples, you can imagine what a contribution this tool can make to a world teeming with content creators.

#### Fan tokens in BitSong

Based on the concept of the **ERC-20 Standard**, BitSong _fan tokens_ enable the user to a new way of **value exchanging**. Here, through tokens issued by a particular entity, the fans can deeply interact with their influencers or idols.

We can identify each _fan token_ through its `denom`. Moreover, even if its `denom` allow the global identification of the token, each _fan token_ is also equipped with a `name` and a `symbol`, which helps in its recognition. The `name` and the `symbol` of a _fan token_, together with a `uri` and an `authority` (i.e., the address of the wallet which is able to manage those data) are part of the `metadata` of the _fan token_.

More specifically:

* **denom** is calculated by the tendermint crypto hash function through the _block height_ of the transaction, the first _minter_, the _symbol_, and the _name_. For this reason, it is _unique_;
* **symbol** is defined by the user and can be any string matching the pattern `^[a-z0-9]{1,64}$`, so any lowercase string containing letters and digits with a length between 1 and 64 characters. _It cannot be empty_;
* **name**, on the other hand, is also defined by the user but it can be any string containing max 128 characters. _It can also be empty_.

Finally, thanks to the _fantoken_ module, users on BitSong can:

* manage _fan tokens_, issuing, minting, burning, and transferring them;
* build applications that use the _fan tokens_ API to create completely new and custom artists' economies.

Features that may be added in the future are described in Future Improvements.

### Concepts

#### Conventions

By looking at numbers, we separate the decimals by point and the thousands by comma. For instance, the number _one thousand two hundred thirty-four and fifty-six hundredths_, is written as:

![formula](https://render.githubusercontent.com/render/math?math=%5Ccolor%7Bgray%7D1,234.56)

#### Fan token

Fan tokens, conceptually based on the [ERC-20 Standard](https://ethereum.org/it/developers/docs/standards/tokens/erc-20), are **fungible tokens** issued for fan communities. They borns to create new connections between fans and any content creator, like star performers, actors, designers, musicians, photographers, writers, models, influencers, etc. They enable the growth of a private and (most importantly) custom economy creating new channels for fans' engagement. _Fan tokens_ have enormous potential. By using them, you can build myriad applications allowing fans a deeper interaction in the artistic life of their top performers.

To provide you with some examples, you can think that it is possible to use them for creating loyalty programs to provide privileged access to exclusive content. To allow your fan to crowdfund a tour or studio album and share part of the revenue with your fans. To enable your fans with the opportunity to vote on the cities for an upcoming tour. Or even to accept _fan tokens_ as payment for NFTs.

In the design of the _fan token_ functionalities, big part of the reasonings were based on the [OpenZeppelin standard](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20). For example, the concept of _burning_ the tokens lowering the `totalSupply` directly derives from the standard [documentation](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-\_burn-address-uint256-).

A **fan token** is characterized by:

| Attribute   | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| denom       | `string`         | It is an hash calculated on the first `Minter`, the `Symbol`, the `Name` and the `Block Height` of the issuing transaction of the _fan token_. It is the hash identifying the _fan token_ and is used to prevent the creation of identical tokens. Moreover, to fastly identify a _fan token_ from its `denom`, it starts with the prefix `ft`.                                                                                                                                                                                                     |
| max\_supply | `sdk.Int`        | It is chosen once by the user. It is the maximum supply value of mintable tokens from its definition. It is expressed in micro unit (![formula](https://render.githubusercontent.com/render/math?math=%5Ccolor%7Bgray%7D%5Cmu=10%5E%7B-6%7D)). For this reason, to indicate a maximum supply of ![formula](https://render.githubusercontent.com/render/math?math=%5Ccolor%7Bgray%7D456) tokens, this value must be equal to ![formula](https://render.githubusercontent.com/render/math?math=%5Ccolor%7Bgray%7D456%5Ccdot10%5E%7B6%7D=456,000,000). |
| Minter      | `sdk.AccAddress` | It is the address of the minter for the _fan token_. It can be changed to trasfer the minting ability of the token during the time.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata    | `Metadata`       | It is generated once and it is made up of `Name`, `Symbol`, `URI` and `Authority` (i.e., is the address of the wallet which is able to perform edits on the `URI`). More specifically, the URI contains a link to a resource with a set of information linked to the _fan token_.                                                                                                                                                                                                                                                                   |

**Metadata** are characterized by:

| Attribute | Type             | Description                                                                                                                                                                                                                                                                                                                                  |
| --------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name      | `string`         | It is chosen once by the user. It should correspond to the long name the user want to associate to the symbol (e.g., Dollar, Euro, BitSong). It can also be empty and its max length is of 128 characters.                                                                                                                                   |
| symbol    | `string`         | It is chosen once by the user and can be any string matching the pattern `^[a-z0-9]{1,64}$`, i.e., any lowercase string containing letters and digits with a length between 1 and 64 characters. It should follow the ISO standard for the [alphabetic code](https://www.iso.org/iso-4217-currency-codes.html) (e.g., USD, EUR, BTSG, etc.). |
| uri       | `string`         | It is a link to a resource which contains a set of information linked to the _fan token_. It can also be empty and its max length is of 512 characters.                                                                                                                                                                                      |
| authority | `sdk.AccAddress` | It is the address of the authority for the _fan token_ `metadata` managment. It can be changed to trasfer the ability of changing the metadata the token during the time.                                                                                                                                                                    |

#### Lifecycle of a fan token

It is possible to entirely represent the lifecycle of a fan token through Finite State Machine (FSM) diagrams. We will present two representations:

* the first refers to the fan token **object**. We can compare such a definition with that of currency (e.g., Euro, Dollar, BitSong);
* the second, instead, is referred to the lifecycle of the fan token **instance**. Such definition is comparable with that of coin/money (e.g., the specific 1 Euro coin you could have in your pocket at a particular moment in time).

We can describe the lifecycle of a fan token **object** through two states.

Referring to the figure above, as detailed in the documentation, to "create" the fan token, we need to **issue it**. This operation leads to the birth of the object and thus to its first state, state _1_. Here, the token is related to a `minter`, who is able to mint the token to different wallets, and an `authority`, that is responsible for managing the `metadata`. It is important to recall that some operations are reversible, while some others are not. For example, reaching the max-supply through minting operations, can be reverted by burning tokens. While, for example, the selection of an empty address for the minter (which strictly means **disable minting** operations) is a **irreversible** operation.

Referring to the lifecycle of a fan token **instance**, it is possible to identify two states.

Concerning to the figure above, when the fan token object is issued, we can **mint** it. Minting leads to the birth of a new instance, moving the fan token instance to state _1_. In this state, the token can be:

* **traded**, which produces the changing of the owner of the instance, without modifying the landing state. To make it clearer, it can be considered as the simple exchange of money between two users. This does not modify the landing state;
* **burned**, which produces a state change to the state _2_, where the authority cannot operate on the fan token instance anymore.

#### Uniqueness of the denom

The _denom_ is calculated on first `Minter`, `Symbol`, `Name` and `Block Height` of the issuing transaction of the fan token.

```go
func GetFantokenDenom(height int64, minter sdk.AccAddress, symbol, name string) string {
	bz := []byte(fmt.Sprintf("%d%s%s%s", height, minter.String(), symbol, name))
	return "ft" + tmcrypto.AddressHash(bz).String()
}
```

The _denom_ of every fan token starts with the prefix `ft`. Follows a **hash** of `Block Height`, first `Minter`, `Symbol` and `Name` of the _fan token_. This _denom_ is used as base denom for the fan token, and, for this reason, it should be **unique**. In this sense, since the hash depends both on the first `Minter` and the `Block Height`, multiple fan tokens with the same name and symbol can co-exist even created by the same address but they must be created from transactions in different blocks.

## State

The `fantoken` module keeps track of **parameters** and **fan tokens**.

```
Params:			types.Params
FanTokens:		[]types.FanToken
```

### Params

In the state definition, we can find the **Params**. This section corresponds to a module-wide configuration structure that stores system parameters. In particular, it defines the overall fantoken module functioning and contains the **issueFee**, **mintFee** and **burnFee** for the _fan token_. Such an implementation allows governance to decide the issue fee, but also the mint and burn fees the users have to pay to perform these operations with the tokens, in an arbitrary way - since proposals can modify it.

```go
type Params struct {
	IssueFee	sdk.Coin
	MintFee		sdk.Coin
	BurnFee		sdk.Coin
}
```

### Fantoken

The state contains a list of **Fantokens**. They are fan tokens (fungible tokens deriving by the ERC-20 Standard), and their state information is:

* **Denom**, that corresponds to the identifier of the fan token. It is a `string`, automatically calculated on the first `Minter`, `Symbol`, `Name` and `Block Height` of the issuing transaction of the _fan token_ as explained in concepts, and _cannot change_ for the whole life of the token;
* **MaxSupply**, that represents the upper limit for the total supply of the tokens. More specifically, it is an `integer number`, expressed in micro unit (![formula](https://render.githubusercontent.com/render/math?math=%5Ccolor%7Bgray%7D%5Cmu=10%5E%7B-6%7D)) as explained in concepts, that _cannot change_ for the whole life of the token and which corresponds to the maximum number the supply can reach in any moment;
* **Minter**, which corresponds to the address of the current `minter` for the token. It is an address and _can change_ during the token lifecycle thanks to the **minting ability transfer**. When the `minter` address is set to an empty value, the token can be minted no more;
* **MetaData**, which contains metadata for the _fan token_ and is made up of the `Name`, the `Symbol`, a `URI` and an `Authority` as described in concepts.

More specifically, the `metadata` _can change_ during the life of the token according to:

* **URI** can be changed by the `authority`. It can be changed until when the authority is available;
* **Authority** which can be transferred by the current authority until when the `authority` itself is not set to an empty value.

```go
type FanToken struct {
	Denom		string
	MaxSupply	sdk.Int
	Minter		string
	MetaData	types.Metadata
}

type Metadata struct {
	Name		string
	Symbol      string
	URI         string
	Authority	string
}
```

## Messages

Messages (`msg`s) are objects that trigger state transitions. Messages are wrapped in transactions (`tx`s) that clients submit to the network. The BitSong SDK wraps and unwraps `fantoken` module messages from transactions.

### MsgIssue

The `MsgIssue` message is used to issue a new _fan token_. It takes as input `Symbol`, `Name`, `MaxSupply` (expressed in micro unit (![formula](https://render.githubusercontent.com/render/math?math=%5Ccolor%7Bgray%7D%5Cmu=10%5E%7B-6%7D)) as explained in concepts), `Authority` (i.e., the address of the wallet which is able to modify the `metadata` of the _fan token_), `URI` (which is a link to the `fan token` metadata) and the `Minter` (i.e., the address of the wallet which is able to mint the _fan token_). Thanks to these values, the module can verify if the `Authority` and the `Minter` are valid addresses for the issue of a new token (they are not a blocked addresses or module accounts) and also verifies the values for the `name` (which can be any strings with max 128 characters, even the empty one), the `symbol` (that must match the regex `^[a-z0-9]{1,64}$`) and the `uri` (which can be any strings with less than 513 characters, even the empty one). At this point, it proceeds with token issuing and emitting of corresponding events. More specifically, the **module deduct the `issuing fee` from the `minter` wallet**, calculates the `denom`, generates the `metadata`, and finally creates the _fan token_. At this point, an `EventIssue` event is emitted.

```go
type MsgIssue struct {
	Symbol			string
	Name			string
	MaxSupply		sdk.Int
	Authority		string
	URI				string
	Minter			string
}
```

### MsgDisableMint

The `MsgDisableMint` message is used to **irreversibly** disable the minting ability for an existing _fan token_. It takes as input `Denom` and `Minter` (described in fan token definition). Thanks to these values, the module can verify whether the modifications are lawful (i.e., requested by the `Minter` and in accord with the state transition definition). The message permits to change the "_mintability_" of the _fan token_. In particular, at the issuing, the _fan token_ can be minted (in fact the `Minter` address is a value different from an empty one). Later on, during the lifecycle of the _fan token_, the `minter` can disable the possibility to mint new tokens (check the relative docs for more details). In such a scenario, it is possible to disable the mintability, by set an empty value as the address for the new `minter`) and, this operation, causes the `MaxSupply` of the token to be updated at the current value of the supply. At this point, an `EventDisableMint` event is emitted.

```go
type MsgDisableMint struct {
	Denom			string
	Minter			string
}
```

### MsgMint

The `MsgMint` message is used to mint an existing _fan token_. It takes as input `Recipient`, `Coin`, and `Minter` (all described in fan token definition except the `Coin`, which is an object made up of the `denom` of the _fan token_ to mint and its quantity, expressed in micro unit). In such a message, the `Recipient` is not required and its default value is the same of `Minter`. Thanks to these values, the module can verify whether the minting operation is lawful (i.e., requested: by the minter, on a mintable _fan token_, and for a quantity that allow to do not overcome the maximum supply), recalling that only the minter for of the _fan token_ can mint the token to any specified account. At this point, the token is minted, the supply is increased, the coins are sent to the recipient, the **module deduct the `mint fee` from the `minter` wallet** and an `EventMint` event is emitted.

```go
type MsgMint struct {
	Recipient		string
	Coin			sdk.Coin
	Minter			string
}
```

### MsgBurn

The `MsgBurn` message is used to burn _fan token_. It takes as input `Coin`, and `Sender` (as above, the `Coin` is an object made up of the `denom` of the _fan token_ to burn and its quantity, expressed in micro unit, while `Sender` must be equal to the user who want to burn the tokens). The module can verify whether the burning operation is lawful (i.e., the sender has a sufficient amount of token, in other words check if `sender balance` > `amount to burn`). At this point, the token is burned, the supply is lowered, the **module deduct the `burn fee` from the `owner` wallet** and an `EventBurn` event is emitted. In such a way, that specific token ends its lifecycle, as shown in the relative docs.

```go
type MsgBurn struct {
	Coin	sdk.Coin
	Sender	string
}
```

### MsgSetAuthority

The `MsgSetAuthority` message is used to transfer or disable the ability to change the metadata of a _fan token_. It takes as input `Denom`, `oldAuthority`, and `newAuthority` (`Denom` is described in fan token definition, `old` and `new` `Authorities` are respectively the actual and the new addresses of the wallet who are able to change the metadata of the token). When the `newAuthority` is an empty address, the capability to change the metadata is **irreversibly** disabled. The module can verify whether the operation is lawful (i.e., the requesting account is actually the authority for the _fan token_, the _fan token_ metadata can be changed and the destination account is neither blocked nor a module account). At this point, if the `newAuthority` is a _not empty_ address, it becomes the new token authority. On the other hand, the _fan token_ metadata cannot be changed anymore. Anyway, an `EventSetAuthority` event is emitted. This operation enable the **authority transfer** transition described in the lifecycle of a fan token.

```go
type MsgTransferAuthority struct {
	Denom		string
	oldAuthority	string
	newAuthority	string
}
```

### MsgSetMinter

The `MsgSetMinter` message is used to transfer the ability to mint a _fan token_. It takes as input `Denom`, `oldMinter`, and `newMinter` (`Denom` is described in fan token definition, `old` and `new` `Minters` are respectively the actual and the new addresses of the wallet who are able to mint the token). When the `newMinter` is an empty address, it works as the `MsgDisableMint`. The module can verify whether the operation is lawful (i.e., the requesting account is actually the minter for the _fan token_, the _fan token_ can be minted and the destination account is neither blocked nor a module account). At this point, if the `newMinter` is a _not empty_ address, it becomes the new token minter. On the other hand, the _fan token_ cannot be minted anymore. Anyway, an `EventSetMinter` event is emitted. This operation enable the **minter transfer** transition described in the lifecycle of a fan token.

```go
type MsgSetMinter struct {
	Denom		string
	oldMinter	string
	newMinter	string
}
```

### MsgSetUri

The `MsgSetMinter` message is used to modify the URI in the _fan token_ metadata. It takes as input `Denom`, new `URI`, and `Authority` (`Denom` and `URI` are described in fan token definition, `Authority` is the actual address of the wallet who is able to modify the _fan token_ metadata). The module can verify whether the operation is lawful (i.e., the requesting account is actually the authority for the _fan token_, the _fan token_ metadata can be changed and the new uri is a valid one, as described in Fan Token parameters definition). At this point, an `EventSetUri` event is emitted.

```go
type MsgSetUri struct {
	Denom		string
	URI		string
	Authority	string
}
```

## Events

The fantoken module emits the following events:

### EventIssue

| Type                                | Attribute Key | Attribute Value                      |
| ----------------------------------- | ------------- | ------------------------------------ |
| message                             | action        | `/bitsong.fantoken.v1beta1.MsgIssue` |
| bitsong.fantoken.v1beta1.EventIssue | denom         | {denom}                              |

### EventDisableMint

| Type                                      | Attribute Key | Attribute Value                            |
| ----------------------------------------- | ------------- | ------------------------------------------ |
| message                                   | action        | `/bitsong.fantoken.v1beta1.MsgDisableMint` |
| bitsong.fantoken.v1beta1.EventDisableMint | denom         | {denom}                                    |

### EventMint

| Type                               | Attribute Key | Attribute Value                     |
| ---------------------------------- | ------------- | ----------------------------------- |
| message                            | action        | `/bitsong.fantoken.v1beta1.MsgMint` |
| bitsong.fantoken.v1beta1.EventMint | recipient     | {recipient}                         |
| bitsong.fantoken.v1beta1.EventMint | coin          | {coin}                              |

### EventBurn

| Type                               | Attribute Key | Attribute Value                     |
| ---------------------------------- | ------------- | ----------------------------------- |
| message                            | action        | `/bitsong.fantoken.v1beta1.MsgBurn` |
| bitsong.fantoken.v1beta1.EventBurn | sender        | {sender}                            |
| bitsong.fantoken.v1beta1.EventBurn | coin          | {coin}                              |

### EventSetAuthority

| Type                                            | Attribute Key  | Attribute Value                             |
| ----------------------------------------------- | -------------- | ------------------------------------------- |
| message                                         | action         | `/bitsong.fantoken.v1beta1.MsgSetAuthority` |
| bitsong.fantoken.v1beta1.EventTransferAuthority | denom          | {denom}                                     |
| bitsong.fantoken.v1beta1.EventTransferAuthority | old\_authority | {old\_authority}                            |
| bitsong.fantoken.v1beta1.EventTransferAuthority | new\_authority | {new\_authority}                            |

### EventSetMinter

| Type                                         | Attribute Key  | Attribute Value                          |
| -------------------------------------------- | -------------- | ---------------------------------------- |
| message                                      | action         | `/bitsong.fantoken.v1beta1.MsgSetMinter` |
| bitsong.fantoken.v1beta1.EventTransferMinter | denom          | {denom}                                  |
| bitsong.fantoken.v1beta1.EventTransferMinter | old\_minter    | {old\_minter}                            |
| bitsong.fantoken.v1beta1.EventTransferMinter | new\_authority | {new\_minter}                            |

### EventSetUri

| Type                                 | Attribute Key | Attribute Value                       |
| ------------------------------------ | ------------- | ------------------------------------- |
| message                              | action        | `/bitsong.fantoken.v1beta1.MsgSetUri` |
| bitsong.fantoken.v1beta1.EventSetUri | denom         | denom}                                |

## Parameters

Fantoken module parameters.

| Key      | Type     | Value                                   |
| -------- | -------- | --------------------------------------- |
| IssueFee | sdk.Coin | {"denom": "ubtsg", "amount": "1000000"} |
| MintFee  | sdk.Coin | {"denom": "ubtsg", "amount": "0"}       |
| BurnFee  | sdk.Coin | {"denom": "ubtsg", "amount": "0"}       |

## Client

### Transactions

The `transactions` commands allow users to `issue`, `mint`, `burn`, `disable minting`, `transfer minting and editing capabilities` for _fan tokens_.

```
bitsongd tx fantoken --help
```

#### issue

```
bitsongd tx fantoken issue \
    --name "fantoken name" \
    --symbol "bitangel" \
    --max-supply 100000000000 \
    --uri "ipfs://...." \
    --from <key-name> -b block --chain-id <chain-id> --fees <fee>
```

#### mint

```
bitsongd tx fantoken mint [amount][denom] \
    --recipient <address> \
    --from <key-name> -b block --chain-id <chain-id> --fees <fee>
```

#### burn

```
bitsongd tx fantoken burn [amount][denom] \
    --from <key-name> -b block --chain-id <chain-id> --fees <fee>
```

#### set-authority

```
bitsongd tx fantoken set-authority [denom] \
    --new-authority <address> \
    --from <key-name> -b block --chain-id <chain-id> --fees <fee>
```

#### set-minter

```
bitsongd tx fantoken set-minter [denom] \
    --new-minter <address> \
    --from <key-name> -b block --chain-id <chain-id> --fees <fee>
```

#### set-uri

```
bitsongd tx fantoken set-uri [denom] \
    --uri <uri> \
    --from <key-name> -b block --chain-id <chain-id> --fees <fee>
```

#### disable-mint

```
bitsongd tx fantoken disable-mint [denom] \
    --from <key-name> -b block --chain-id <chain-id> --fees <fee>
```

### Query

The `query` commands allow users to query the `fantoken` module.

```
bitsongd q fantoken --help
```

#### denom

```
bitsongd q fantoken denom <denom>
```

#### authority

```
bitsongd q fantoken authority <address>
```

#### params

```
bitsongd q fantoken params
```
