# Join the Mainnet

Make sure to have the [latest go-bitsong version installed](install-go-bitsong.md). First, initialize the node.

```
bitsongd init <your_custom_moniker>
```

**Note** Monikers can contain only ASCII characters. Using Unicode characters is not supported and renders your node unreachable.

By default, the `init` command creates your `~/.bitsongd` directory with subfolders `config` and `data`. In the `config` directory, the most important files for configuration are `app.toml` and `config.toml`.

You can edit the `moniker` in the `~/.bitsongd/config/config.toml` file:

```
# A custom human readable name for this node
moniker = "<your_custom_moniker>"
```

For optimized node performance, edit the `~/.bitsongd/config/app.toml` file to enable the anti-spam mechanism and reject incoming transactions with less than the minimum gas prices:

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

Your full node has been initialized!

### Genesis & Seeds

#### Copy the Genesis File

Fetch the mainnet's `genesis.json` file into `bitsongd`'s config directory.

```
wget -O ~/.bitsongd/config/genesis.json https://raw.githubusercontent.com/bitsongofficial/networks/master/bitsong-2b/genesis.json
```

#### **Set persistent peers**

Your node needs to know how to find peers. You'll need to add healthy seed nodes to `$HOME/.bitsongd/config/config.toml`

```
export PEERS="e2b9971222adf71f7199c670b7e85471c447e926@157.90.255.143:26656,120740c15a8a19c232b1aa4d80b20de248b33db3@135.181.129.94:26656,d741773bc5eecbefb7b14fcca5e3e0fedd49d5a3@157.90.95.104:26656,6e93a30587671e2cecacbcbb27092809bb20249f@95.217.203.59:31656,adfe1cf240780cf8d58266171ced72fb4e9a7a6d@23.226.14.168:26656,f36d3a926ae0583e60f00e7bc54711f3cb7fe769@195.201.58.166:26656,9c9f030298bdda9ca69de7db8e9a3aef33972fba@135.181.16.236:31656,9806602afb65ba45d1048d65285d5c6e50285088@178.18.242.242:26656,4fdd438ea70927003022ecc308e36bc1924ec598@51.210.104.207:26656,3cf3effd3ecb33bdbb5c5e6528c88fde4869b97c@116.202.139.113:26656,075cf589e44c74687ef3a4df3a583f482bce57e0@46.166.143.79:26656,f9d318eaf38988ce2b65b795068d86b214866c91@141.94.170.26:26256,fa932748b327fdde6d235b28a9850f8b8bd3326a@95.217.119.101:31656,d52f6e4fe1819133474e977d7e1d73124d1f4af5@95.217.156.76:26656,5ebab02914638005773dac8026f441e06c115a44@74.207.226.176:26656,e5428ce29ccd26434828a577906ac9c413ca6a48@80.71.57.42:26656,2afc435e2246ff3f16ade85b52264367945d12b5@176.58.124.226:26656,2cd6bb75fc9279c62c0ef3af82fbe08632743472@bitsong-peer.panthea.eu:31656"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.bitsongd/config/config.toml
```

### Synchronise the Node<a href="#download-chain-data" id="synchronise-the-wallet"></a>

Now we have to syncronise the node with the current state of the blockchain. The fastest way to achieve this is by using [state sync](https://medium.com/tendermint/tendermint-core-state-sync-for-developers-70a96ba3ee35), which we will use for this purpose.
```
sudo systemctl stop bitsong

SNAP_RPC="https://rpc.bitsong.forbole.com:443"
SNAP_RPC2="https://bitsong.stakesystems.io:2053"

LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

peers="e2b9971222adf71f7199c670b7e85471c447e926@157.90.255.143:26656,120740c15a8a19c232b1aa4d80b20de248b33db3@135.181.129.94:26656,bbfb37b3c44c8148b6af7adfa016ec8fabff69d1@121.78.247.243:16656,d741773bc5eecbefb7b14fcca5e3e0fedd49d5a3@157.90.95.104:26656,6e93a30587671e2cecacbcbb27092809bb20249f@95.217.203.59:31656,adfe1cf240780cf8d58266171ced72fb4e9a7a6d@23.226.14.168:26656,f36d3a926ae0583e60f00e7bc54711f3cb7fe769@195.201.58.166:26656,9c9f030298bdda9ca69de7db8e9a3aef33972fba@135.181.16.236:31656,9806602afb65ba45d1048d65285d5c6e50285088@178.18.242.242:26656,4fdd438ea70927003022ecc308e36bc1924ec598@51.210.104.207:26656,3cf3effd3ecb33bdbb5c5e6528c88fde4869b97c@116.202.139.113:26656,2cd6bb75fc9279c62c0ef3af82fbe08632743472@bitsong-peer.panthea.eu:31656"

sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" $HOME/.bitsongd/config/config.toml

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC2\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" $HOME/.bitsongd/config/config.toml

cp $HOME/.bitsongd/data/priv_validator_state.json $HOME/.bitsongd/priv_validator_state.json.backup

bitsongd tendermint unsafe-reset-all --keep-addr-book --home "$HOME/.bitsongd"

mv $HOME/.bitsongd/priv_validator_state.json.backup $HOME/.bitsongd/data/priv_validator_state.json

sudo systemctl start bitsong

sudo journalctl -u bitsong -f
```

### Enable the REST API <a href="#enable-the-rest-api" id="enable-the-rest-api"></a>

By default, the REST API is disabled. To enable the REST API, edit the `~/.bitsongd/config/app.toml` file, and set `enable` to `true` in the `[api]` section.


```
###############################################################################
###                           API Configuration                             ###
###############################################################################

[api]

# Enable defines if the API server should be enabled.
enable = false

# Swagger defines if swagger documentation should automatically be registered.
swagger = false

# Address defines the API server to listen on.
address = "tcp://0.0.0.0:1317"
```

Optionally, you can activate swagger by setting `swagger` to `true` or change the port of the REST API in the parameter `address`. After restarting your application, you can access the REST API on `YOURNODEIP:1317`.

### GRPC Configuration <a href="#grpc-configuration" id="grpc-configuration"></a>

By default, gRPC is enabled on port `9090`. In the `~/.bitsongd/config/app.toml` file, you can make changes in the gRPC section. To disable the gRPC endpoint, set `enable` to `false`. To change the port, use the `address` parameter.

```
###############################################################################
###                           gRPC Configuration                            ###
###############################################################################

[grpc]

# Enable defines if the gRPC server should be enabled.
enable = true

# Address defines the gRPC server address to bind to.
address = "0.0.0.0:9090"
```

### Background Process <a href="#background-process" id="background-process"></a>

To run the node in a background process with automatic restarts, you can use a service manager like `systemd`. To set this up run the following:

```
sudo tee /etc/systemd/system/bitsongd.service > /dev/null <<EOF  
[Unit]
Description=BitSong Network Daemon
After=network-online.target

[Service]
User=$USER
ExecStart=$(which bitsongd) start
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

```

Then setup the daemon

```
sudo -S systemctl daemon-reload
sudo -S systemctl enable bitsongd
```

We can then start the process and confirm that it is running

```
sudo -S systemctl start bitsongd

sudo service bitsongd status
```
