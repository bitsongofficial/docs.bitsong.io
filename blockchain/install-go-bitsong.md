# Install go-bitsong

This guide will explain how to install the `bitsongd` binary into your system.

On **Ubuntu** start by updating your system:

```
sudo apt update
sudo apt upgrade
```

### Install pre-requisites

On Ubuntu this can be done with the following:

```
sudo apt install git build-essential ufw curl jq --yes
```

### Install Go

Install `go` by following the [official docs](https://golang.org/doc/install). On Ubuntu, you can probably use:

```
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.18.3
```

### Install go-bitsong binary

Clone the `go-bitsong` repo, checkout and install \`v0.11.0\` :

```
cd $HOME
git clone https://github.com/bitsongofficial/go-bitsong
cd go-bitsong
git checkout v0.11.0
make install
```

> _NOTE_: If you still have issues at this step, please check that you have the latest stable version of GO installed.

Verify that everything is OK:

```
bitsongd version
```

`bitsongd` for instance should output something similar to:

```
0.11.0
```
