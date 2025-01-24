# Pruning of State

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/blockchain/pruning-of-state](https://bitsong.io/en/docs/blockchain/pruning-of-state)
{% endhint %}

There are four strategies for pruning state. These strategies apply only to state and do not apply to block storage. To set pruning, adjust the `pruning` parameter in the `~/.bitsongd/config/app.toml` file. The following pruning state settings are available:

1. `everything`: Prune all saved states other than the current state.
2. `nothing`: Save all states and delete nothing.
3. `default`: Save the last 100 states and the state of every 10,000th block.
4. `custom`: Specify pruning settings with the `pruning-keep-recent`, `pruning-keep-every`, and `pruning-interval` parameters.

By default, every node is in `default` mode which is the recommended setting for most environments. If you would like to change your nodes pruning strategy then you must do so when the node is initialized. Passing a flag when starting `bitsongd` will always override settings in the `app.toml` file, if you would like to change your node to the `everything` mode then you can pass the `---pruning everything` flag when you call `bitsongd start`.

> Note: When you are pruning state you will not be able to query the heights that are not in your store.
