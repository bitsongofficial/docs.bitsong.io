# Install go-bitsong (cosmwasm)

This guide will explain how to install the `bitsongd` binary into your system.

On **Ubuntu** start by updating your system:

```bash
sudo apt update
sudo apt upgrade
```

#### Install pre-requisites

On Ubuntu this can be done with the following:

```
sudo apt install git build-essential ufw curl jq --yes
```

### From Binary

The easiest way to install `bitsongd` is by downloading a pre-build binary. You can find the latest binaries on the [releases page](https://github.com/bitsongofficial/go-bitsong/releases/tag/bwasmnet-1)

### From Source

#### Install Go

Install `go` by following the [official docs](https://golang.org/doc/install). On Ubuntu, you can probably use:

```bash
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.18.3
```

#### Install go-bitsong binary

Clone the `go-bitsong` repo, checkout and install \`v0.11.0\` :

```bash
cd $HOME
git clone https://github.com/bitsongofficial/go-bitsong
cd go-bitsong
git checkout bwasmnet-1
make install
```

> _NOTE_: If you still have issues at this step, please check that you have the latest stable version of GO installed.

Verify that everything is OK:

```bash
bitsongd version
```

`bitsongd` for instance should output something similar to:

```bash
bwasmnet-1
```

### Configure go-bitsong (optional)

Set the correct node address

```bash
bitsongd config node https://rpc.bwasmnet-1.bitsong.network:443
```

Change the chain-id

```bash
bitsongd config chain-id bwasmnet-1
```

Set the broadcast mode to `block`

```bash
bitsongd config broadcast-mode block
```

Set the kayring backend

```bash
bitsongd config keyring-backend test
```
