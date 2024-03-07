# From v0.14.x to v0.15.0

This guide is exclusively for Validators and Node Operators, please pay **Maximum attention** and **Perform a backup before upgrading**!

### Stop of the node

The node will automatically stop at block height `15947000` approximately at `2024-03-15 15:30:00 UTC`. The log file will indicate that in order to continue, you must replace the `bitsongd` binary. At that point you can finish the `bitsongd` process.

```
sudo systemctl stop bitsongd
sudo systemctl disable bitsongd
```

### Backup

In the event that the update is unsuccessful, you will need to restore the previous status and install a future patch (example `v0.15.x`).

In order to perform the backup, you just need to copy the content present on the home directory of `go-bitsong`, in this case `~/.bitsongd`

**`Remember to have at least 50% free disk space`**

```
cp -Rv ~/.bitsongd ~/backup_bitsongd_0140
```

> This operation should take 5/10 minutes, however, in the event that you're using low performance servers, the process might take up to 30/40 minutes.

### Install `golang 1.19.x`

```
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.19.5
```

### Replace `bitsongd`

First of all we need to make sure we're using the `v0.14.x` version

```
bitsongd version
# 0.14.x
```

We should get the `0.1x.x` version

At this point we have to download and compile the new binary `bitsongd 0.15.0`

```
cd ~
rm -rf go-bitsong # (only in the event that a previous directory is already present)
git clone https://github.com/bitsongofficial/go-bitsong.git
cd go-bitsong
git checkout v0.15.0
make install
```

The `make install` command will compile and install the new binary.

Let's check if the binary was properly updated

```
bitsongd version
# 0.15.0
```

If we get the answer `0.15.0` the process was successffully executed and we can proceed to restart the node.

### Start `bitsongd`

```
sudo systemctl enable bitsongd
sudo systemctl start bitsongd
```

At this point the node will start performing the update of all the existing modules. Keep into consideration that the operation might take up to 10 minutes.

To view the logs:

```
sudo journalctl -u bitsongd -f
```
