---
description: >-
  Programmable contracts owned and verifiable by accounts, with full IBC
  support.
---

# modules

## Interchain Module Communication

Imagine an Bitsong Account module “X” on a chain. This module wants to send a message to another module “Y” on a remote chain. The module on the remote chain wants to ensure that the message was sent by module X.

In order to do so, the developer could attempt to send his message through the user’s Account using the Account IBC infrastructure. However, using this method it is impossible for module Y to verify that the content of the message was indeed sent by the origin module X. Executing actions through the Account is great for permissionless actions (like depositing assets into a protocol) but is unsuited for permissioned entry-points. So what now?

### Secure Interchain Module Communication

To allow modules to send messages securely to other modules across IBC, Interchain Module Communication is used. IMC allows developers to send messages from a module directly to another module on a different chain. The module that receives the IBC message can then access the source module details. This way IMC allows interoperable permissioned actions between all Abstract modules.

### Sending a message

In order to send a message, a module needs to interact with the `ibc-client` module. You can use the [`IbcClient API` ](https://docs.rs/abstract-sdk/latest/abstract_sdk/struct.IbcClient.html)to interact with the `ibc-client`. The example below shows how the ping-pong app sends a message to an instance of itself on another chain.

```rust
    // a. define the module to send the ibc msg
    let self_module_info = module.module_info()?;
    // b. access the ibc-client 
    let ibc_client: IbcClient<_> = module.ibc_client(deps.as_ref());
    // c. define the modules ibc action as a cosmos msg 
    let ibc_action: CosmosMsg = ibc_client.module_ibc_action(
        opponent_chain.clone(),
        self_module_info,
        // Start by playing a Ping
        &PingPongIbcMsg {
            hand: PingOrPong::Ping,
        },
        Some(Callback::new(&PingPongCallbackMsg::Pinged {
            opponent_chain,
        })?),
    )?;
```

* `opponent_chain` is the `TruncatedChainId` of the destination chain where the app is expected to be installed.
* `target_module` describes the module on which the message will be executed on the remote chain. In this case, it is another instance of the ping-pong app.
* `msg` is the message that will be executed on the remote module via a custom endpoint. We explain in the section about receiving a message how this message is used by the targeted module.
* `callback_info` is used to request a callback once the packet has been received and acknowledged. We explain more about this behavior in the acks and callbacks section

### Receiving a message

In order for a module to receive a message coming from a remote Module, it needs to implement the `module-ibc` endpoint. The function signature for this endpoint is:

```rust
pub fn module_ibc(
deps: DepsMut, 
env: Env, 
module: Module, 
source_module: ModuleIbcInfo, 
msg: Binary) -> Result<Response, Error>;
```

The `deps`, `env` and `module` variables are identical to the execute endpoint and should be clear to you by now. If not here are some links to more documentation:

* `deps` and `env` are described in the [`CosmWasm documentation`](https://docs.cosmwasm.com/)
* `module` (or `App` or `Adapter` usually) are described in the [Account SDK section](../sdk.md) of the docs

The `msg` variable contains the msg constructed by the module on the source chain. In this case the `PingPongIbcMsg`.

The `source_module` variable contains information about the module that sent the message, as well as the source chain information. This information can be used to assert the source of a message, like so:

```rust
pub fn receive_module_ibc(
    deps: DepsMut,
    env: Env,
    module: App,
    source_module: ModuleIbcInfo,
    msg: Binary,
) -> AppResult<Response> {
    let this_module_info = module.module_info()?;
    ensure_eq!(
        source_module.module,
        this_module_info,
        AppError::NotPingPong {
            source_module: source_module.module.clone()
        }
    );
    let ping_msg: PingPongIbcMsg = from_json(msg)?;
}
```

For example, the above code will return an error if the source module doesn’t match the receiving module. This way only other ping-pong apps can call this ping-pong app!

### Callbacks

As mentioned callbacks can be added to the IBC flow progress or revert your contract’s state depending on the packets execution result.

#### Callback Execution

If a callback was requested when sending a module IBC message, the callback will be executed wether the execution was successful or not. A callback message will be executed on the ̀ibc\_callback endpoint of the calling module. The function signature for this endpoint is:

```rust
pub fn ibc_callback(deps: DepsMut, env: Env, module: Module, callback: Callback, result: IbcResult,) -> Result<Response, Error>;
```

The callback variable contains a `msg: Binary` that is the encoded callback message that was provided to the callback on construction. In the ping-pong case this was `PingPongCallbackMsg::Pinged`.

The `result` contains the result data from the IBC packet execution. You can match against this result to assert that the remote execution was successful and roll back state if it was not.
