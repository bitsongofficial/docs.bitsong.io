---
description: >-
  This simple distribution mechanism is how Bitsong passively distribute rewards
  between validators and delegators.
---

# Distribution

The mechanism operates as follows. Collected rewards are pooled globally and divided out passively to validators and delegators. Each validator has the opportunity to charge commission to the delegators on the rewards collected on behalf of the delegators. Fees are collected directly into a global reward pool and validator proposer-reward pool. Due to the nature of passive accounting, whenever changes to parameters which affect the rate of reward distribution occurs, withdrawal of rewards must also occur.

* Whenever withdrawing, one must withdraw the maximum amount they are entitled to, leaving nothing in the pool.
* Whenever bonding, unbonding, or re-delegating tokens to an existing account, a full withdrawal of the rewards must occur (as the rules for lazy accounting change).
* Whenever a validator chooses to change the commission on rewards, all accumulated commission rewards must be simultaneously withdrawn.

#### Concepts

In Proof of Stake (PoS) blockchains, rewards gained from transaction fees are paid to validators. The fee distribution module fairly distributes the rewards to the validators' constituent delegators.&#x20;

Rewards are calculated per period. The period is updated each time a validator's delegation changes, for example, when the validator receives a new delegation. The rewards for a single validator can then be calculated by taking the total rewards for the period before the delegation started, minus the current total rewards.

The commission to the validator is paid when the validator is removed or when the validator requests a withdrawal. The commission is calculated and incremented at every `BeginBlock` operation to update accumulated fee amounts.

The rewards to a delegator are distributed when the delegation is changed or removed, or a withdrawal is requested. Before rewards are distributed, all slashes to the validator that occurred during the current delegation are applied.

### Reference Counting

In F1 fee distribution, the rewards a delegator receives are calculated when their delegation is withdrawn. This calculation must read the terms of the summation of rewards divided by the share of tokens from the period which they ended when they delegated, and the final period that was created for the withdrawal.

Additionally, as slashes change the amount of tokens a delegation will have (but we calculate this lazily, only when a delegator un-delegates), we must calculate rewards in separate periods before / after any slashes which occurred in between when a delegator delegated and when they withdrew their rewards. Thus slashes, like delegations, reference the period which was ended by the slash event.

All stored historical rewards records for periods which are no longer referenced by any delegations or any slashes can thus be safely removed, as they will never be read (future delegations and future slashes will always reference future periods). This is implemented by tracking a `ReferenceCount` along with each historical reward storage entry. Each time a new object (delegation or slash) is created which might need to reference the historical record, the reference count is incremented. Each time one object which previously needed to reference the historical record is deleted, the reference count is decremented. If the reference count hits zero, the historical record is deleted.

### Begin Block

At each `BeginBlock`, all fees received in the previous block are transferred to the distribution `ModuleAccount` account. When a delegator or validator withdraws their rewards, they are taken out of the `ModuleAccount`. During begin block, the different claims on the fees collected are updated as follows:

* The reserve community tax is charged.
* The remainder is distributed proportionally by voting power to all bonded validators

### Messages

#### MsgSetWithdrawAddress

#### MsgWithdrawDelegatorReward

#### WithdrawValidatorCommission

#### MsgUpdateParams

### Hooks

#### Create or modify delegation distribution

#### Validator Created

#### Validator removed

#### Validator is slashed

### CLI

### GRPC









***

Source: [https://github.com/cosmos/cosmos-sdk/tree/main/x/distribution](https://github.com/cosmos/cosmos-sdk/tree/main/x/distribution)&#x20;











