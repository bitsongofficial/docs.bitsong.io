# Install go-bitsong

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/blockchain/install-go-bitsong](https://bitsong.io/en/docs/blockchain/install-go-bitsong)
{% endhint %}

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
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.19.5
```

### Install go-bitsong binary

Clone the `go-bitsong` repo, checkout and install `v0.15.0` :

```
cd $HOME
git clone https://github.com/bitsongofficial/go-bitsong
cd go-bitsong
git checkout v0.15.0
make install
```

> _NOTE_: If you still have issues at this step, please check that you have the latest stable version of GO installed.

Verify that everything is OK:

```
bitsongd version
```

`bitsongd` for instance should output something similar to:

```
0.15.0
```
