# From v0.17.0 to v0.18.0

This guide is exclusively for Validators and Node Operators, please pay **Maximum attention** and **Perform a backup before upgrading**!

### Ensure Minimum Gas Config is set

```sh
export DAEMON_HOME=$HOME/.bitsongd
sed 's/^minimum-gas-prices = .*/minimum-gas-prices = "0.01ubtsg"/' $DAEMON_HOME/config/app.toml > temp_file && mv temp_file $DAEMON_HOME/config/app.toml
```

### Stop of the node

The node will automatically stop at block height `19818776` approximately at `2024-11-29 16:52:00 UTC`. The log file will indicate that in order to continue, you must replace the `bitsongd` binary. At that point you can finish the `bitsongd` process.

```
sudo systemctl stop bitsongd
sudo systemctl disable bitsongd
```

### Backup

In the event that the update is unsuccessful, you will need to restore the previous status and install a future patch (example `v0.18.x`).

In order to perform the backup, you just need to copy the content present on the home directory of `go-bitsong`, in this case `~/.bitsongd`

**`Remember to have at least 50% free disk space`**

```
cp -Rv ~/.bitsongd ~/backup_bitsongd_0180
```

> This operation should take 5/10 minutes, however, in the event that you're using low performance servers, the process might take up to 30/40 minutes.

### Verify that you are currently running the correct version (v0.17.0) of `bitsongd`:

```sh
bitsongd version --long
# name: go-bitsong
# server_name: bitsongd
# client_name: bitsongcli
# version: 0.17.0
# commit: 6caaf5fdba8e7ce41e8a9d44654c141f85c9c38f
# build_tags: netgo,ledger
```

### Make sure your chain halts at the right block: `19818776`

```sh
perl -i -pe 's/^halt-height =.*/halt-height = 19818776/' ~/.bitsongd/config/app.toml
```

then restart your node `systemctl restart bitsongd`

### After the chain has halted, make a backup of your `.bitsongd` directory

```sh
cp -Rf ~/.bitsongd ./bitsongd_backup
```

**NOTE**: It is recommended for validators and operators to take a full data snapshot at the export height before proceeding in case the upgrade does not go as planned or if not enough voting power comes online in a sufficient and agreed upon amount of time. In such a case, the chain will fallback to continue operating `bitsong-1`.

### Update Go

```sh
wget -q -O - https://git.io/vQhTU | bash -s -- --remove
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.22.9
```

#### Option A: Install Go-Bitsong binary

```sh
cd go-bitsong && git pull && git checkout v0.18.0
make build && make install 
```

### Verify you are currently running the correct version (v0.18.0) of the `go-bitsong`:

```sh
bitsongd version --long | grep "cosmos_sdk_veresion/|commit\|version:"
# commit: 50b4082736a68cdde098cf36edd7c7a70d9fdae6
# cosmos_sdk_version: v0.47.8
# version: 0.18.0
```

#### Option B: Downloading Verified Build:

```sh
# set target platform
export PLATFORM_TARGET=amd64
 # delete if exists
rm -rf bitsongd_linux_$PLATFORM_TARGET.tar.gz
# download 
curl -L -o ~/bitsongd-linux-$PLATFORM_TARGET.tar.gz https://github.com/bitsongofficial/go-bitsong/releases/download/v0.18.0/bitsongd-linux-$PLATFORM_TARGET.tar.gz
# verify sha256sum 
sha256sum bitsongd-linux-$PLATFORM_TARGET.tar.gz
# Output: d3d0da91a01c473351dc57b2ed357aa8ea378a51672eec87112501bc9a53add6  bitsongd-linux-amd64.tar.gz
# Output: 1696cf491224603136c32bf747610c0863754f73502523347524d9f1ef5b687f  bitsongd-linux-arm64.tar.gz

# decompress 
tar -xvzf bitsongd-linux-$PLATFORM_TARGET.tar.gz 

## move binary to go bin path
sudo mv build/bitsongd-linux-$PLATFORM_TARGET /usr/local/go/bitsongd

## change file ownership, if nessesary 
sudo chmod +x /usr/local/go/bitsongd

## confirm binary executable works 
bitsongd version --long 

# build_tags: netgo,ledger
# commit: 50b4082736a68cdde098cf36edd7c7a70d9fdae6
# cosmos_sdk_version: v0.47.8
# go: go version go1.23.3 darwin/$PLATFORM_TARGET
# name: go-bitsong
# server_name: bitsongd
# version: 0.18.0
```
