---
description: Abstract getting messages from A to B.
---

# Abstract Accounts on Bitsong

_Bitsong Accounts are the Abstract Framework and is frequently being iterated, thanks to the_ [_**Abstract**_](https://abstract.money/en-US) _**team efforts!**_

### Problem

Over the past decade, our technological landscape has revealed keeping this private key secure is a tremendous limiting factor for the adoption of sovereign oriented solutions cryptography provides, where attack vectors such as wallet drainers and large scale phishing campaigns constantly lurk. Specifically, the nature of key pairs requires the owner of the key-pair to keep the secret key... well, secret.

### Solution Ideas

* A programmable ecosystem with libraries compatible with Bitsong and other cryptographic authentication libraries
* An environment of applications for users to interact with these tooling to improve the limitations and tradeoffs that come with sovereign key management

## &#x20;A2B - Abstract Accounts on Bitsong

These accounts are programmable, on chain wallets. These wallets hold funds that its owner has access to, the applications that can be installed into the account, and programmed in a way that unlocks creating a better UX for cross chain interacting with Bitsong.

### Ownership Methods

As an owner of a A2B (Abstract Account on Bitsong), one can configure the account by sending messages to the contracts. The owner of the account can be a wallet, multi-sig or any other ownership structure, allowing you to customize your ownership structure to fit your needs. An account has an initial owner upon its creation. Below are the various forms of ownership methods currently supported:

#### Monarchy

A single entity that has full control over the Account. This entity may be a wallet, DAO, or even a specific NFT token.

#### Multi-Signature

A multi-signature owned account is one that in order to approve an action to be performed by the account, requires a subset of signatures to approve the action. This subset is specific to the multi-signature structure that owns the account, such as a cw-3 multisig.

Here are a few terms you need to know about when configuring your multi-sig:

* **Voter weight** 🏋️‍♂️: The weight that the voter has when voting on a proposal.
* **Threshold** 📊: The minimal % of the total weight that needs to vote YES on a proposal for it to pass.

#### Sub-Accounts

A Sub account is an A2B that is owned by another A2B. This can be helpful to mitigate concerns of experimental apps accessing funds from the main account.

As a result of this structure, complex multi-account systems can easily be transferred between governance systems by simply changing the owner of the top-level account.

### Interchain Bitsong Accounts

An Interchain Bitsong Account (IBA) is an A2B that is owned by another A2B which is located on a different chain. The goal of IBA's is for any user making use of Bitsong to access the benefits of the IBC protocol, without sacrificing any functionality, in order to mitigate the limitation that arises from the low-level implementation of the IBC protocol.

To learn how to create your IBA, [click here.](guides/create-an-iba.md)

### Account Modules, Adapters, and Services

A module is a smart-contract that can be installed on an A2B to extend the account’s capabilities. There are different forms of modules:

* **App**: Modules that add a functionality, exposing new entry-points for you or your users.
* **Adapter**: Modules that act as a standard interface between your Account and external services.
* **Standalone**: Modules that are not directly integrated with an A2B.
* **Service**: Reference to a smart-contract or module that is externally maintained.

You can delve deeper into the [module documentation here](developers/iba/modules.md).

### Technical Implementation (Code Infrastructure)

#### [Abstract Name Service](https://github.com/AbstractSDK/abstract/tree/main/framework/contracts/native/ans-host)

**Purpose:** A name service that enables chain-agnostic action execution by storing commonly retrieved data such as assets, contracts, and IBC channels.

Further information on the Abstract Name Service can be [found here.](infrastructure/name-service.md)

#### [Registry](https://github.com/AbstractSDK/abstract/tree/main/framework/contracts/native/registry)

**Purpose:** A registry for modules and accounts. It exposes namespace claiming, module registrations, and detailed querying of modules by namespace, name, and version.

Specifics regarding use of the registry contract is[ located here](./#registry)

#### [Module Factory](https://github.com/AbstractSDK/abstract/tree/main/framework/contracts/native/module-factory)

**Purpose:** Facilitates installing modules on an Account.

Learn more about the Module Factory contract [here.](infrastructure/modules.md#module-factory)

### Additional Services

#### Abstract SDK

Abstract-SDK is the rust libraries to interface directly with the A2B contract framework from other smart contracts. An Abstract specific library will be included in the development pipeline, so in the meantime feel free to reference the specific [rust crate library documentation](https://docs.rs/abstract-sdk/latest/abstract_sdk/).

#### Abstract.js

Abstract.Js is the Typescript library for developing front-end UI compatible with the Bitsong Account framework. A A2B specific library will be included in the development pipeline, so in the meantime feel free to reference the specific [js package documentation](https://js.abstract.money/).

#### [App Template](https://github.com/AbstractSDK/templates)

The App Module Template is a starting point for developing apps that enable features or transform A2B into standalone products. An A2B specific template will be included in the development pipeline, so in the meantime feel free to reference the [template located here](https://github.com/AbstractSDK/templates).

#### [Cw-Orchestrator](https://orchestrator.abstract.money/quick_start.html)

Cw-orchestrator is a comprehensive toolset designed to streamline the development, testing, and deployment of CosmWasm smart contracts. It provides a set of advanced features and macros that enable developers to create more efficient, scalable, and maintainable smart contracts. Think of it like a Swiss Army knife that makes it easier to write, test, and deploy smart contracts.

**Key Features**

**Automated testing:** Cw-orchestrator simplifies the testing process by providing a set of pre-built testing tools and frameworks. This enables developers to write more comprehensive tests, ensuring that their contracts behave as intended.\
\
**Deployment automation:** When cw-orchestration scripts are written, they are able to be used for deployment of both mock and production chain environments, making it easier to deploy smart contracts to the blockchain. This feature saves time and reduces the risk of human error during the deployment process.\
\
**Collaboration tools:** Cw-orchestrator enables developers to publish their libraries, making it easier for teams to collaborate on complex projects. This feature promotes code reuse, reduces duplication of effort, and facilitates knowledge sharing within the developer community.



To learn more about cw-orchestrator, checkout the [documentation here](https://orchestrator.abstract.money/).

***

### Sources

This documentation is a heavily modified, direct reference to the official [Abstract Account Documentation.](https://docs.abstract.money)
