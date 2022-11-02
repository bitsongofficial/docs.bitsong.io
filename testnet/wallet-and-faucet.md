# Wallet and Faucet

### **Create your testnet wallet**

create a wallet with the following command:

```bash
bitsongd keys add mywallet
```

when you run the commands above, `bitsongd` will prompt you all the information related to that wallet

```bash
- name: mywallet
  type: local
  address: bitsong1a695qts2n3hx0gnqwysau2mf9nj6y6524wmz33
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A7s8GHBMD6FAIbTKu4JiimHpey6++/zY7lPa9Th41TWt"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

parent seat survey cook culture pen green ripple advance increase exile curtain carpet orient teach pizza eager large forest author husband mouse lucky extend
```

### **Get testnet faucet tokens**

You can request tokens from the official [BitSong Discord](https://discord.bitsong.io/) server by sending the following message on the `#testnet-faucet` channel:

```
!faucet <address>
```

<figure><img src="../.gitbook/assets/06244eeb-376a-4e13-a08f-28ab39d633c1_585x227.webp" alt=""><figcaption></figcaption></figure>

Then you can check that your balance fo your wallet account by typing the command:

```
bitsongd query bank balances $(bitsongd keys show -a mywallet)
```
