# Grammos

### Introduction

The [Grammos app](https://t.me/grammos_bot/app) can be invited into any Telegram channel. Users can prompt Grammos to create a new account. When this occurs:

1. A new key pair is generated on the users device
2. The private key is then sharded into `n` pieces, and encrypted on the users device
3. These encrypted shards are then sent to `n` databases, where they are kept for retrieval when a user desires to sign a message with this new key

{% hint style="info" %}
This shared key storage technique is called [MPC](https://www.fireblocks.com/what-is-mpc/), or multi-party-compute.
{% endhint %}

### Things to consider

* **Possible collusion of storage providers:** An inherent risk with this MPC's, requires the trust assumption that the storage providers will not collude with each other to share the encrypted key shards with each other, making it possible to access the private key.

### Future Goals

* **Fully on-chain implementation:** Implementation where users can choose their validator set to participate in the MPC setup will provide a fully on chain distributed key sharding, compatible with platforms other than Telegram.

#### Up Next  Abstract Accounts on Bitsong&#x20;
