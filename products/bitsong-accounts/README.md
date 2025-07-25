---
description: Accounts, owned by, account owners
---

# Bitsong Accounts

***

### Introduction

In their primitives, accounts are a unique on-chain identity, controlled by a pair of keys, one secret & one public. Public keys are safe to share to the public, **however private keys are not**, as they are used used to _**sign**_ arbitrary data, in such a manner that **generates a value mathematically provable** **to have been created by the private key**. This _**signature**_ occurs without revealing the private key itself, and is the basic principle that the foundation of cryptography is built upon.

## Types Of Accounts

Below are a few types of accounts keys can currently control on Bitsong:

### A. Base Account

This is a default account on Bitsong, controlled by a single key-pair. These accounts can perform any action possible on Bitsong by broadcasting a prepared message with a signature hash of the message, generated by the private key.

The following cryptographic key algorithms are supported by default, and can be generated using any library, not just Bitsong's:

| Key Algorithm                                                                                     | Common use                                                |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [**Secp256k1**](https://en.bitcoin.it/wiki/Secp256k1)                                             | Bitcoin, Ethereum, Cosmos                                 |
| [**Ed25519**](https://github.com/allinbits/cosmos-sdk/blob/master/crypto/keys/ed25519/ed25519.go) | Cosmos Validator Consensus Keys, Solana, Cardano, Stellar |

_More native key algorithm support coming soon. Our CosmWasm module supports creating contracts with various key-algorithm verification libraries, which are very useful for quick programmability for additional algorithm support._

### B. Multi-Signature / DAO's

These accounts are almost identical to Base Accounts, however their differences exist in how actions are authorized by the account. Unlike base accounts, where only a signature generated from the single key-pair is required to authorize actions, Multi-signature accounts require `x of n` signatures in order for actions or messages to be performed by the account.

#### Membership based

DAO's and multi-signature accounts are programmable, meaning there are infinite ways to configure what keys are accepted, and how. For example, a DAO can have a **membership based configuration,** meaning a specific list of addresses are authorized to submit their signature. Another example is having a system where only **owners of a specific token** are able to submit their signature, creating a more fluid approach to who gets to decide on when actions are performed. These tokens can be fungible, or non-fungible, and can be programmed to further customize how actions are performed on behalf of a membership-based DAO.

### C. Interchain Accounts

Interchain account allows any account on Bitsong to generate and control an account, on any other chain interoperable with the Interchain Account feature. This unlocks access to applications specific to other sovereign blockchains, without the need for any intermediary or centralized transaction processor. To learn more about Interchain Accounts, checkout the [official documentation](https://ibc.cosmos.network/main/apps/interchain-accounts/overview.html).

### D. Other - Module Accounts

Keys cannot necessarily control these accounts, unless implemented however these type of account should not be left out to highlight. Module accounts are generated, owned and used by network application.  Module's accounts do not necessarily rely on a signature hash generated by a private key for the account, but is previously programmed for what transactions it is authorized on to perform, gated by customizable logic.&#x20;

An example is the [governance module ](../../features-and-modules/governance.md)address, which is only able to authorize actions upon consensus determined through its voting workflow.

### Further Info

To learn more about accounts on Bitsong, you can reference the [accounts section in the interchain academy tutorials](https://tutorials.cosmos.network/academy/2-cosmos-concepts/2-accounts.html).

#### Up Next

With the primitives of accounts reviewed, let's go on to introduce [Grammos](grammos.md), a Telegram Bot for 1-click account creation and management.

