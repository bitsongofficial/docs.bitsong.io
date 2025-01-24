# Gas and Fees

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/blockchain/gas-and-fees](https://bitsong.io/en/docs/blockchain/gas-and-fees)
{% endhint %}

On BitSong mainnet, the accepted denom is `ubtsg`, where `1btsg = 1.000.000ubtsg`

Transactions on the BitSong network need to include a transaction fee in order to be processed. This fee pays for the gas required to run the transaction. The formula is the following:

$$
fees = ceil(gas * gasPrices)
$$

The `gas` is dependent on the transaction. Different transaction require different amount of `gas`. The `gas` amount for a transaction is calculated as it is being processed, but there is a way to estimate it beforehand by using the `auto` value for the `gas` flag. Of course, this only gives an estimate. You can adjust this estimate with the flag `--gas-adjustment` (default `1.0`) if you want to be sure you provide enough `gas` for the transaction.

The `gasPrice` is the price of each unit of `gas`. Each validator sets a `min-gas-price` value, and will only include transactions that have a `gasPrice` greater than their `min-gas-price`.

The transaction `fees` are the product of `gas` and `gasPrice`. As a user, you have to input 2 out of 3. The higher the `gasPrice`/`fees`, the higher the chance that your transaction will get included in a block.

For mainnet, the recommended `gas-prices` is `0.0025ubtsg`.

### Set `minimum-gas-prices` <a href="#set-minimum-gas-prices" id="set-minimum-gas-prices"></a>

Your full-node keeps unconfirmed transactions in its mempool. In order to protect it from spam, it is better to set a `minimum-gas-prices` that the transaction must meet in order to be accepted in your node's mempool. This parameter can be set in the following file `~/.bitsongd/config/app.toml`.

The initial recommended `min-gas-prices` is `0.0025ubtsg`, but you might want to change it later.

```
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

###############################################################################
###                           Base Configuration                            ###
###############################################################################

# The minimum gas prices a validator is willing to accept for processing a
# transaction. A transaction's fees must meet the minimum of any denomination
# specified in this config (e.g. 0.25token1;0.0001token2).

minimum-gas-prices = "0.0025ubtsg"
```
