# Create Validator

### Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* You have completed [how to run a full BitSong node](join-the-mainnet.md), which outlines how to install, connect, and configure a node.
* You are familiar with `bitsongd`.
* you have read through [the validator FAQ](../validators/validator-faq.md)

### Create a new validator <a href="#_2-create-a-new-validator" id="_2-create-a-new-validator"></a>

To create the validator and initialize it with a self-delegation, run the following command. `key-name` is the name of the private key that is used to sign transactions.

```
bitsongd tx staking create-validator \
    --amount=5000000ubtsg \
    --pubkey=$(bitsongd tendermint show-validator) \
    --moniker="<your-moniker>" \
    --chain-id=<chain_id> \
    --from=<key-name> \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --gas="auto" \
    --gas-prices="0.1ubtsg"
    --min-self-delegation="1"
```

{% hint style="info" %}
When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage-point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.
{% endhint %}

### Confirm your validator is active <a href="#_3-confirm-your-validator-is-active" id="_3-confirm-your-validator-is-active"></a>

If running the following command returns something, the validator is active.

```
bitsongd query tendermint-validator-set | grep "$(bitsongd tendermint show-validator)"
```

You are looking for the `bech32` encoded `address` in the `~/.bitsongd/config/priv_validator.json` file.

{% hint style="info" %}
Note:

Only the top **100** validators in voting power are included in the active validator set.
{% endhint %}
