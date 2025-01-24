# CLI Guide

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/blockchain/cli-guide](https://bitsong.io/en/docs/blockchain/cli-guide)
{% endhint %}

This section describes the commands available from `bitsongd`, the command line interface that connects a running `bitsongd` process.

### `add-genesis-account` <a href="#add-genesis-account" id="add-genesis-account"></a>

Adds a genesis account to `genesis.json`.

#### Syntax

```
bitsongd add-genesis-account <address-or-key-name> '<amount><coin-denominator>,<amount><coin-denominator>'
```

#### Example

```
bitsongd add-genesis-account acc1 '200000000ubtsg'
```

### `collect-gentxs` <a href="#add-genesis-account" id="add-genesis-account"></a>

Collects genesis transactions and outputs them to `genesis.json`.

#### Syntax

```
bitsongd collect-gentxs
```

Coming soon....
