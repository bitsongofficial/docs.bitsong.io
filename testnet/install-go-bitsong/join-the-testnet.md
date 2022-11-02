# Join the Testnet

### Background Process <a href="#background-process" id="background-process"></a>

To run the node in a background process with automatic restarts, you can use a service manager like `systemd`. To set this up run the following:

```bash
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

```bash
sudo -S systemctl daemon-reload
sudo -S systemctl enable bitsongd
```

### Initialize the node

First of all you need to initialize the node

```bash
bitsongd init <custom_moniker> --chain-id bwasmnet-1
```

### Genesis & Seeds

#### Copy the Genesis File

Fetch the mainnet's `genesis.json` file into `bitsongd`'s config directory.

```bash
wget -O ~/.bitsongd/config/genesis.json https://raw.githubusercontent.com/bitsongofficial/networks/master/testnet/bwasmnet-1/genesis.json
```

#### **Set persistent peers**

Your node needs to know how to find peers. You'll need to add healthy seed nodes to `$HOME/.bitsongd/config/config.toml`

```bash
export PEERS="74eae250ed45e99e91ca49119ae46b27fb3a0037@78.47.117.150:26656"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.bitsongd/config/config.toml
```

### Start the Node <a href="#synchronise-the-wallet" id="synchronise-the-wallet"></a>

Now we have to syncronise the node with the current state of the blockchain.&#x20;

```bash
sudo service bitsongd start

journalctl -u bitsongd -f
```
