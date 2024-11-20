# Grammos

## Problem 
Over the past decade, our technological landscape has revealed keeping this private key secure is a tremendous limiting factor for the adoption of sovereign oriented solutions cryptography provides, where attack vectors such as wallet drainers and large scale phising campaigns constantly lurk for those less experienced or fortified from these types of exploits. Specifically, the nature of key pairs requires the owner of the keypair to keep the secret key, well secret! 

## Solution 
Grammos is a proof of concept Telegram widget, that allows instant generation, distributed storage, and access to new wallet keys. 

## How it Works

The Grammos bot can be invited into any Telegram channel. Users can prompt Grammos to create a new account. When this occurs:
1. A new key pair is generated on the users device
2. The private key is then sharded into `n` pieces, and encrypted on the users device
3. These encrypted shards are then sent to `n` databases, where they are kept for retrieval when a user desires to sign a message with this new key

## Things to consider 
- **Possible collusion of storage providers:** An inherent risk with this system, which is classified as Multi-Party-Compute, requires the trust assmption that the storage providers will not collude with each other to share the encrypted key shards with each other, making it possible to access the private key. 

## Future Goals 
- **Fully on-chain implementation:**

### Up Next 
itt's time to introduce the more robust account structure artist and Bitsong users can access, called [Bitsong Abstract Accounts](./bitsong-accounts/README)!