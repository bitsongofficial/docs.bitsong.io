# Create Validator

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/blockchain/create-validator](https://bitsong.io/en/docs/blockchain/create-validator)
{% endhint %}

### Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* You have completed [how to run a full BitSong node](join-the-mainnet.md), which outlines how to install, connect, and configure a node.
* You are familiar with `bitsongd`.
* you have read through [the validator FAQ](../validators/validator-faq.md)

### Create a new validator <a href="#id-2-create-a-new-validator" id="id-2-create-a-new-validator"></a>

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
    --min-self-delegation="1"
```

{% hint style="info" %}
When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage-point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.
{% endhint %}

### Confirm your validator is active <a href="#id-3-confirm-your-validator-is-active" id="id-3-confirm-your-validator-is-active"></a>

If running the following command returns something, the validator is active.

```
bitsongd query tendermint-validator-set | grep "$(bitsongd tendermint show-validator)"
```

You are looking for the `bech32` encoded `address` in the `~/.bitsongd/config/priv_validator.json` file.

{% hint style="info" %}
Note:

Only the top **64** validators in voting power are included in the active validator set.
{% endhint %}
