---
description: Interchain Bitsong Account
---

# interchain

## Interchain Bitsong Accounts

### Overview

Interchain Bitsong Accounts (IBA) are built with use of making of [The Interchain Thesis](https://tutorials.cosmos.network/academy/1-what-is-cosmos/), which includes the [Application Specific Network Thesis](https://maven11.substack.com/p/the-application-specific-chain-thesis).

Bitsong Abstract Account provides multiple IBC capabilities to every module. Within the framework, there are two ways to interact with other blockchains through IBC:

1. InteA2Br=ch. a. i. tsong Account IBC interaction
2. Interchain Bitsong AccounA2Bt Module IBC interaction

We start by giving an overview of these two mechanisms before diving in further on how you should use them as a developer and finally dive into the specific mechanism that makes them work.

### Interchain Applications

Imagine you're a logistics manager, tasked with shipping products to customers across different countries, each with its own unique customs regulations, tax laws, and delivery requirements. You'd want to design a single, unified shipping system that can adapt to each country's specific needs, without having to recreate the system from scratch for every new market.

In the context of blockchain, a similar challenge arises when building applications that need to operate across multiple blockchains, each with its own distinct characteristics, rules, and requirements. This is where the concept of an **interchain application** comes in.

**An interchain application is a decentralized application that can operate seamlessly across multiple blockchains, using Inter-Blockchain Communication (IBC) to enable communication and interaction between different chains.** Just like the shipping system, an interchain application can be designed to adapt to the unique requirements of each blockchain, without having to rebuild the application from scratch for every new chain.

The benefits of an interchain application include:

* **Interoperability:** The ability to operate across multiple blockchains, enabling seamless interaction between different chains.
* **Flexibility:** The ability to handle chain-specific logic through dependencies, making it easier to adapt to changing requirements.
* **Scalability:**

***

### Account IBC interaction

IBA Accounts are able to send messages to other blockchains to execute actions. This allows any A2B to create accounts on remote chains. This way, users create 1 account on their home chain and are able to execute any action on any IBC-connected chain. This kind of interaction can be likened to Cosmos’s Interchain Account (ICA) functionality. Use cases include:

* Executing actions on remote chains without having to care about the remote gas coin
* Cross-chain DCA strategies
* Cross-chain email …
* Whatever permission-less application you can think of

Limitations:

* This capability doesn’t allow modules to interact with one-another in a permissioned manner. Because all messages are sent via the account directly they could be modified by the user. - This means that the receiving module, on the other chain, can’t be sure about the source of the message.
* Account execution doesn’t allow for IBC callbacks. This means that the result of IBC message execution sent via this route can’t be used to trigger following actions directly.

Learn more about Account IBC interactions

### Module IBC interaction

Module IBC allows modules to send messages directly to any other module present on a remote chains, mitigating limitations present with Account IBC interaction. This allows permissioned execution because the receiving module can verify and trust the origin of IBC packet. Uses cases include:

* Distributed Interchain Name Service
* Cross-chain NFTs
* Cross-chain payments without cross-chain tokens
* Every IBC application can be built using Abstract !

After a message is successfully executed via IBC, callbacks can be executed on the sender module to execute code depending on the result of the original message. You can think of this mechanism as an asynchronous version of the [`reply`](https://docs.cosmwasm.com/docs/smart-contracts/message/submessage/#handling-a-reply) mechanism over IBC.

Learn more about Account IBC interactions



IBC is a key feature of this framework and, as the ecosystem grows, the capabilities continue to improve and expand.
