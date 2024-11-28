# Bitsong's Smart Contract Accounts 

*Bitsong Accounts are built upon the Abstract Framework and is frequently being iterated, __Massive respect to the Abstract team for providing this revolutionary Open-Source-Software to the world :)__*



## Bitsong Accounts - Abstract x Bitsong 

Bitsong accounts are programmable, smart contract wallets in their core essence. These accounts hold funds for its owner and the applications that can be installed into the account. 

## Ownership Methods 

 As an owner of a Bitsong Account, one can configure the account by sending messages to the contracts. The owner of the account can be a wallet, multi-sig or any other ownership structure, allowing you to customize your ownership structure to fit your needs. 

 Below are the various forms of ownership methods currently supported:

### Monarchy
A single entity that has full control over the Account. This entity may be a wallet, DAO, or even a specific [NFT token](./guides/nft-owned-account).

### Multi-Signature 
A multi-signature owned account is one that in order to approve an action to be performed by the account, requires a subset of signatures to approve the action. This subset is specific to the multi-signature structure that owns the account, such as a cw-3 multisig.

Here are a few terms you need to know about when configuring your multisig:

- Voter weight 🏋️‍♂️: The weight that the voter has when voting on a proposal.
- Threshold 📊: The minimal % of the total weight that needs to vote YES on a proposal for it to pass.

### Sub-Accounts
Sub accounts are a Bitsong Abstract Account owned by another Bitsong Abstract account. This can be helpful to mitigate concerns of experimental apps accessing funds from the main account.

As a result of this structure, complex multi-account systems can easily be transferred between governance systems by simply changing the owner of the top-level account.

## Interchain Bitsong Accounts 
An Interchain Bitsong Account (IBA) is an Bitsong Abstract Account that is owned by another Bitsong Account which is located on a different chain. The goal of IBA's is for artist and users of Bitsong to access the benefits of the IBC protocol, without sacraficing any functionalitity, in order to mitigate the limitation that arises from the low-level implementation of the IBC protocol. 

To learn how to create your Interchain Bitsong Account, [click here](./guides/iba-creation).


## Account Modules, Adapters, and Services 
A module is a smart-contract that can be installed on an Bitsong Account to extend the account’s capabilities. There are different forms of modules: 

- **App**: Modules that add a functionality, exposing new entry-points for you or your users.
- **Adapter**: Modules that act as a standard interface between your Account and external services.
- **Standalone**: Modules that are not directly integrated with Bitsong Accounts.
- **Service**: Reference to a smart-contract or module that is externally maintained.

You can delve deeper into the module documentation [here](./modules).


## Technical Implementation (Code Infrastructure)

### Abstract Name Service 
__Purpose:__  A name service that enables chain-agnostic action execution by storing commonly retrieved data such as assets, contracts, and IBC channels.\

Further information on the Abstract Name Service can be [found here](./name-service).

### Registry 
__Purpose:__ A registry for modules and accounts. It exposes namespace claiming, module registrations, and detailed querying of modules by namespace, name, and version.

Specifics regarding use of the registry contract is [located here](./registry)

### Module Factory 
__Purpose:__ Facilitates installing Modules on an Account.\

Learn more about the Module Factory Contract [here](./modules).


## Additional Services 

### Abstract SDK
Abstract-SDK is the rust libraries to interface directly with the Bitsong Accounts contract framework from other smart contracts. A Bitsong specific library will be included in the development pipeline, so in the meantime feel free to reference the specific [rust crate library documentation](https://docs.rs/abstract-sdk/latest/abstract_sdk/).

### Abstract.js
Abstract.Js is the Typescript library for developing front-end UI compatible with the Bitsong Account framework. A Bitsong specific library will be included in the development pipeline, so in the meantime feel free to reference the specific [js package documentation](https://js.abstract.money/).

### App Template 
The App Module Template is a starting point for developing apps that enable features or transform Bitsong Accounts into standalone products. A Bitsong specific template will be included in the development pipeline, so in the meantime feel free to reference the [template located here](https://github.com/AbstractSDK/templates).

### Cw-Orchestrator 
Cw-orchestrator is a comprehensive toolset designed to streamline the development, testing, and deployment of CosmWasm smart contracts. It provides a set of advanced features and macros that enable developers to create more efficient, scalable, and maintainable smart contracts.
Think of it like a Swiss Army knife that makes it easier to write, test, and deploy smart contracts.

__Key Features__

**Automated testing:** Cw-orchestrator simplifies the testing process by providing a set of pre-built testing tools and frameworks. This enables developers to write more comprehensive tests, ensuring that their contracts behave as intended.\
**Deployment automation:** When cw-orchestration scripts are written, they are able to be used for deployment of both mock and production chain environments, making it easier to deploy smart contracts to the blockchain. This feature saves time and reduces the risk of human error during the deployment process.\
**Collaboration tools:** Cw-orchestrator enables developers to publish their libraries, making it easier for teams to collaborate on complex projects. This feature promotes code reuse, reduces duplication of effort, and facilitates knowledge sharing within the developer community.

To learn more about cw-orchestrator, checkout the [documentation here](https://orchestrator.abstract.money/).

## Interchain Applications 
Imagine you're a logistics manager for a global e-commerce company, tasked with shipping products to customers across different countries, each with its own unique customs regulations, tax laws, and delivery requirements. You'd want to design a single, unified shipping system that can adapt to each country's specific needs, without having to recreate the system from scratch for every new market.

In the context of blockchain, a similar challenge arises when building applications that need to operate across multiple blockchains, each with its own distinct characteristics, rules, and requirements. This is where the concept of an **interchain application** comes in.

__An interchain application is a decentralized application that can operate seamlessly across multiple blockchains, using Inter-Blockchain Communication (IBC) to enable communication and interaction between different chains.__ Just like the shipping system, an interchain application can be designed to adapt to the unique requirements of each blockchain, without having to rebuild the application from scratch for every new chain.

The benefits of an interchain application include:

**Interoperability:** The ability to operate across multiple blockchains, enabling seamless interaction between different chains.\
**Flexibility:** The ability to handle chain-specific logic through dependencies, making it easier to adapt to changing requirements.\
**Scalability:** The ability to deploy a single application on multiple chains, reducing the complexity and overhead of managing multiple applications.
___ 

## Sources 

This documentation is a heavily modified, direct reference to the official [Abstract Account Documentation.](https://docs.abstract.money)