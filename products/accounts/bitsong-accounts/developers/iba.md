# Interchain Bitsong Accounts 

## Setting Up An IBA

Users must install the `ibc-client` contract on their account to enable IBC. To do so they can call the `ExecuteMsg::InstallModules` endpoint with the `abstract:ibc-client` module ID.

### (Optional) Create an account on the remote chain
After the initialization step, the account is ready to send messages across IBC. However, if you wish, you can customize the remote account metadata before sending any messages. The following message is executed on the `account` contract:

```rs 
pub enum AccountExecuteMsg {
    ExecuteOnModule {
        module_id: "abstract:ibc-client",
        exec_msg: IbcClientExecuteMsg {
            Register {
                host_chain: "destination-chain",
                // Customizable parameters
                base_asset: None,
                namespace: None,
                install_modules: vec![],
            },
            ...,
        }
    }
    ...,
}
```

:::info
Remember that this step is optional as accounts are created automatically when sending the first message across IBC.
:::

## Account ID structure

The remote Interchain Bitsong Account will have the same account sequence but will have a different trace. Let’s take an example. A account on Bitsong with account sequence 69 wants to create accounts on Osmosis and Stargaze.

- Their account ID on Bitsong is `local-69`.
- Their account ID on Osmosis is `bitsong-69`.
- Their account ID on Stargaze is `bitsong-69` as well!

Remote accounts can create other remote accounts, and their traces will be chained. For instance, the `bitsong-42` account on Osmosis can create an account on Stargaze which will have the ID `bitsong>osmosis-69`. This gives the ability to trace ICAAs back to their origin chain. 

*For a even more complex example, an account that was created on Bitsong to Osmosis to Stargaze to Neutron to Juno, the account id on Juno would be `bitsong>osmosis>stargaze>neutron>-69`.*


## Sending messages on remote accounts
With or without a pre-existing remote Account, Abstract Accounts are able to send messages on remote Accounts. The `account_msgs` will be executed in order on the remote account.

```rs
pub enum AccountExecuteMsg {
    ExecuteOnModule {
        module_id: "abstract:ibc-client",
        exec_msg: IbcClientExecuteMsg {
            RemoteAction{
                host_chain: "destination-chain",
                action: HostAction{
                    Dispatch{
                        account_msgs: Vec<AccountExecuteMsg { ... }>
                    },
                    ...,
                }
            },
            ...,
        }
    }
    ...,
}
```

Note that the two instances of the `AccountExecuteMsg` enum are the exact same type. This allows you to send multi-hop IBC messages. However, multi-hop transactions (of these kind) are not really something you would use often, unless you’re using another chain as a routing chain.


## Specification of Interchain Bitsong Accounts

It is recommended to review the technical specification for the Abstract Account framework [here](https://docs.abstract.money/ibc/account-ibc.html#specification-of-interchain-abstract-accounts). We will review the primary components in these documentation.

### General mechanism
IBC capabilities for accounts are allowed by the `ibc-client<->ibc-host` pair.  The `ibc-client` is responsible for authenticating the sender and sending packets across IBC to the `ibc-host`. The `ibc-host` is responsible for receiving packets and routing the packet to the corresponding contract on the remote chain. Under the hood, the `client-host` connection is handled by a [Polytone](https://github.com/DA0-DA0/polytone/wiki) channel. This allows Bitsonng Accounts to be interoperable with other protocols, more resilient to IBC constraints.

You see that an Bitsong Interchain connection is uni-directional. You need 2 connections to be able to interact bi-directionnally with an account. Up until today however, only a local account can act on a distant account and not the other way around. Here is an examples using AccountId between bitsong and osmosis:

- `local-69` on bitsong CAN control `bitsong-69` on osmosis via IBC
- `bitsong-69` on osmosis CAN’T control `local-69` on bitsong

### Account creation
Interchain Bitsong Accounts are traditional Bitsong Accounts controlled by the `ibc-host`. The `ibc-host` is the admin of the account and routes any packet sent by a remote account on the corresponding local account. When creating an bitsong account, it is simply registered by the `ibc-host` using the [account-factory](../guides/account-creation) just like any other account.

When an action is triggered by a remote account, the `ibc-host` does the following verifications:

- If an local account already exists on-chain for the remote account, it just dispatches the message to the account.
- If no account exists, it creates one with default metadata and THEN dispatches the messages to this new account.

The Account creation process is therefore not mandatory when interacting with Interchain Bitsong Accounts. This is why when you create an Bitsong Abstract Account, you automatically have an account on every connected chains!

### Data Structures 
Interchain Bitsong Account communication is done via a single message structure:
```rs
pub enum IbcHostExecuteMsg{
    /// Allows for remote execution from the Polytone implementation
    #[cw_orch(fn_name("ibc_execute"))]
    Execute {
        account_id: AccountId,
        /// The address of the calling account id. This is used purely for the send-all-back method.
        /// We include it in all messages none-the-less to simplify the users life
        account_address: String,
        action: HostAction,
    },
    ...,
}
```
- `account-id` is the id of the local account calling the action.
- `account_address` is the address of the local account calling the action.
- `action` is the action that should be executed by the ibc-host on the remote account:
```rs
/// Callable actions on a remote host
#[cosmwasm_schema::cw_serde]
pub enum HostAction {
    /// Dispatch messages to a remote Account.
    /// Will create a new Account if required.
    Dispatch {
        account_msgs: Vec<account::ExecuteMsg>,
    },
    /// Can't be called by an account directly. These are permissioned messages that only the IBC Client is allowed to call by itself.
    Internal(InternalAction),
    /// Some helpers that allow calling dispatch messages faster (for actions that are called regularly)
    Helpers(HelperAction),
}

#[cosmwasm_schema::cw_serde]
#[non_exhaustive]
pub enum InternalAction {
    /// Registers a new account from a remote chain
    Register {
        name: Option<String>,
        description: Option<String>,
        link: Option<String>,
        namespace: Option<String>,
        install_modules: Vec<ModuleInstallConfig>,
    },
}

#[cosmwasm_schema::cw_serde]
#[non_exhaustive]
pub enum HelperAction {
    SendAllBack,
}
```

## Acknowledgement and Callback

IBC works with 4 steps:

1. Sending a packet (Source chain)
2. Receiving a packet (Destination chain)
3. Sending an acknowledgement (Destination chain)
4. Receiving an acknowledgement (Source chain)

We have already covered the 2 first steps with the sections above. We cover the 2 lasts steps in this section.

Step 3 (sending an ack), is handled by Polytone. They catch any error that could happen during contract execution and send back an acknowledgement reflecting the state of the contract execution on the remote chain. This is handled through the [Callback](https://docs.rs/polytone/latest/polytone/callbacks/enum.Callback.html) struct.

For Step 4, Polytone allows for sending a message to the initial sender of the IBC interaction after the packet was successfully received in the remote chain. Abstract DOESN’T use this feature for user actions, so callbacks are not possible when using Interchain Abstract Accounts. If you are a module developer, check out the [Module Ibc](./ibm) section that allows for callbacks.

## Cross chain trace

Because accounts created across chains using the IBA protocol are controlled by an account located on a remote chain, the account that is calling the action needs to be related to the account on the remote chain. This is done through the [AccountId](https://docs.rs/abstract-std/latest/abstract_std/objects/account/struct.AccountId.html) struct.  The IBC-host module leverages the `AccountId::trace` field of this struct. An account is either `AccountTrace::Local` or `AccountTrace::Remote`. When a `PacketMsg` is sent across an IBC channel, the account id is transformed on the receiving chain in the following manner:

- If it was `AccountTrace::Local` before transfer, it turns into an `AccountTrace::Remote` account with one chain in the associated vector being the chain calling the `PacketMsg` `(PacketMsg::client_chain)`
- If it was `AccountTrace::Remote` before transfer, it stays remote and the client_chain field is pushed to the associated vector.

This allows full traceability of the account creations and calls.