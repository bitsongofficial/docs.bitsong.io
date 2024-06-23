# Bitsong Profile Account Life Cycle

## Smart Contract Infrastructure

Powering the smart contract account profiles for the Bitsong ecosystem is an infused fork of two main components:
- [Abstract's Account Abstraction Framework](https://github.com/AbstractSDK/abstract/tree/main/framework)
- [Stargaze's Names Contracts](https://github.com/public-awesome/names)

*Please review the [documentation of Abstract Accounts](https://docs.abstract.money/) for precise, detailed specifications.*

## Accounts
Accounts consists of two main contracts, the **manager** & the **proxy**. Accounts are created via the **account factory** contrct, and make use of various internal contracts to power account **modules**, verification, and other internal framework utilities.

#### Governance Structures 
Accounts are able to be configured with various governance structures:

- **Monarchy**: A single address is admin.
- **Sub Account**: Used when the account is a sub-account of another account.
- **NFT**: Any owner of a nft token specified is admin.
- **Renounced**: This account no longer has an owner and cannot be used.
- **External**: External source of verification.  


### Creation of an Account
Accounts are created via the account factory, and expect `GovernanceDetails` to be provided, [along with other parameters](./contracts/native/account-factory/src/commands.rs#L43).

## Smart Contracts

## Manager 
The manager contract can be described as both a circuit board for broadcasting msgs from an account, as well as the recordkeeper of various internal states for an account. The manager contract can create sub-accounts, keeps record of proposed & installed module states,and can have its ownership transfered. This contract address is always called when sending msgs as an account. 

[Here](https://docs.abstract.money/3_framework/3_architecture.html#manager-contract) explains the modules primary functions. 

## Proxy 
The proxy contract is the contract which functions as an internal treasury for accounts to handle native & ibc asset ownership for accounts, as well as responsible for broadcasting any messages passed to it by the account owner. The proxy contract expects a list of addresses to pass messages to run.

[Here](https://docs.abstract.money/3_framework/3_architecture.html#proxy-contract) explains the modules primary functions.

## Version Control 
The version control contracts acts as an on-chain registry for all modules and account-id within an instance of a deployed framework. 

## Account Factory
The account factory contract is used to create and manage on-chain accounts. This also serves as the escrow account for bids on ownership of accounts.

## Module Factory
The module factory contract powers installation and management of modules for accounts.

### Modules 
Modules are smart contracts that can be installed on an Account to extend the accounts capabilities. Modules can be installed, removed, and configured by the accounts owner.

## Interchain Abstract Accounts (IBC Host & IBC Client)
Interchain Abstract Accounts are traditional Abstract Accounts controlled by the `ibc-host`. Two contracts named `ibc-client` & `ibc-host`  provide IBC features for accounts. These contracts make use of a [Polytone channel](https://github.com/AbstractSDK/polytone).

The `ibc-client` lives on the source chain, and is responsible for:
- authenticating the sender
- sending packets across IBC to `ibc-host`

The `ibc-host` lives on the remote chain, and is responsible for: 
- recieving packets from `ibc-client` through polytone channel
- routing packets to corresponding contract on remote chain. 

<!-- **You need 2 connections to be able to interact bi-directionaly with an IBC account.**  -->

When ibc actions are sent from an account to run on a remote chain, the `ibc-host` does the following:
 - If an local account already exist (on remote chain), dispatch msg to account `manager`
 - If no account exist, create default one, then dispatch msg to account `manager`

**This makes the remote account creation process not mandatory.**


### Polytone x Bitsong Accounts
Polytone gives every smart contract an account on every IBC-connected blockchain. There are 3 contracts:
- **note:** says what to say
- **voice:** says it
- **proxy:** does whatever voice says for the note writer (sender)

The workflow involving polytone with the framework:
- 1. `ibc-client` passes all msgs to the registered polytone `note`
- 2. `note` to pass msgs via ibc to `voice` on the remote chain
- 3. `voice` to then pass msgs to the proper `proxy` contract (based on msg.sender)
- 4. `proxy` finally pass msg to `ibc-host`

### Creating IBC Compatability
When the account framework is being deployed, the `ibc-client` & `ibc-host`are let known the `version_control_address`, and then are proposed & registered to the `version_control_address` contract, via `propose_module` entry point.


### Account ID's 
AccountID's are internal, deterministic monikers for accounts, generated when the account is created. AccountID's are useful to derive various details of an account, such as its location, contracts, and type of account. 

A quick & easy way to remeber how account id's are derived: 
- if account is on the local chain: `local-2`
- if account is on any other chain: `bitsong-2`

## ANS Host
The `ans-host` contract handles internal state of various ibc related data, such as local ibc-channels, dexes, pools, and asset addresses. 

## Profile NFT & Marketplace 
Alongside the account contracts are the marketplace and nft collection contracts for bitsong profile tokens.

### Bs721-Profile
The bs721-profile is a custom cw721-base collection for Bitsong Profiles. The owner of a profile token can be queried by its token_id, and any associated profile token can be queried for a given address. Each token has an internal `Metadata` state, which contain `TextRecords` to power additional contract verifications. 

#### Tokenized Account Ownership 
 Any nft collection compatible with cw721 entry points may be specificed as the token which grants ownership powers to an account, using `GovernanceDetails::NFT`.
 Upon any transfer of owership the new owner will be able to sign and pass messages through the account.

### Profile Marketplace
An owner of a profile token may accept bids made by others on their profile token. Bids are made by sending tokens to escrow via the marketplace contract, and are kept track by the bidder address internally. An internal renewal workflow can be implemented to require reocurring payments to maintain ownership of a profile account. 

### Sending Messages as an Account

#### Default Method
The default workflow for sending messages as an account involves call the account manager's `exec_on_module` entry point, passing the msgs to the proxy contract entry point `module_action`. 

**The manager module can pass a vector of base64 encoded stargate json messages**
```rs
 let msg = abstract_std::proxy::ExecuteMsg::ModuleAction {
        msgs: vec![CosmosMsg::Bank(cosmwasm_std::BankMsg::Burn {
            amount: burn_amount,
        })],
    };

    chain.execute(
        &abstract_std::manager::ExecuteMsg::ExecOnModule {
            module_id: PROXY.to_string(),
            exec_msg: to_json_binary(&msg)?,
        },
        &[],
        &Addr::unchecked(manager.clone()),
    )?;
```

# Full Framework Deployment Directions

## 1. Deploy Abstract To Chain A & B

## 2. Deploy Polytone To Chain A & B 

## 3. Create Abstract Framework 
## 4. Connect Polytone For Chain A to B
## 5. Configure Abstract Framework 
    - register `polytone-note` & remote `ibc-host` to the local `ibc-client`
    - register remote `polytone-proxy` addr to remote `ibc-host`
    - register `ibc-host` to create accounts

## Cw-Orch
CW-Orch provides us will a full integration deployment framework. To deploy to a local instance bitsong, a script run with cargo can be found [here]()

