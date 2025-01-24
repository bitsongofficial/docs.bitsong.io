# Export the state

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/blockchain/export-the-state](https://bitsong.io/en/docs/blockchain/export-the-state)
{% endhint %}

go-bitsong can dump the entire application state into a JSON file. This application state dump is useful for manual analysis and can also be used as the genesis file of a new network.

Export state with:

```
bitsongd export 2> [filename].json
```

You can also export state from a particular height (at the end of processing the block of that height):

```
bitsongd export --height [height] 2> [filename].json
```

If you plan to start a new network from the exported state, export with the `--for-zero-height` flag:

```
bitsongd export --height [height] --for-zero-height 2> [filename].json
```
