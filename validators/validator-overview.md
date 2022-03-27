# Validator Overview



### Introduction <a href="#introduction" id="introduction"></a>

BitSong is based on the Tendermint consensus engine. A set of Validators is responsible for adding new blocks of transactions to the BitSong blockchain, for which they receive rewards in BTSG tokens.&#x20;

Upon joining the network, a Validator agrees to bond BTSG tokens. The BTSG can be their own, or the Validator can have BTSG delegated or staked to them by other BTSG holders. There are currently 100 Validator slots on the BitSong network.&#x20;

Therefore, the top 64 Validator candidates with the most bonded BTSG are selected at each block to participate in the next round of block production. Their likelihood of being able to produce the next block is weighted according to the amount of their bonded BTSG.&#x20;

At each block, the entire set of Validators casts votes on the validity of  each block using their private key. The vote is then broadcast to the network.&#x20;

Validators earn BTSG as a reward for their role in securing the network. BTSG rewards are a combination of newly-minted BTSG, and a share of the transaction fees paid by the network.&#x20;

Note that Validators can set commission on the fees their delegators receive as an additional incentive. Choosing the right commission level is a balance, as the Validator must be able to remain competitive enough to attract delegators to stake their BTSG.

Warning: If Validators double-sign, are frequently offline or fail to participate in governance, their staked BTSG, including BTSG delegated to them, may be slashed. The penalty depends on the severity of the violation.

Becoming a validator comes with a set of prerequisites, including hardware and software requirements.

### Hardware <a href="#hardware" id="hardware"></a>

Validators must take appropriate steps to manage the security of their validator keys. Currently, there is no appropriate cloud solution for validator key management. Therefore, you'll need a physical location for your operation, secured with restricted access. One example would be to co-locate in secure data centers.

The premises will need to be equipped with redundant power, connectivity, and storage backups. We recommend using several redundant networking boxes for fiber, firewall, and switching, along with small servers with redundant hard drive and failover.&#x20;

It's worth remembering that bandwidth, CPU and memory requirements will increase over time. Once the BitSong blockchain becomes several years old, you'll also need large hard drives for storing the blockchain history.

### Set Up a Website <a href="#set-up-a-website" id="set-up-a-website"></a>

You will need a website to establish your presence and reputation with BTSG holders who may choose to delegate their tokens to you. It's an important channel to share information and create a storefront for your operation.&#x20;

### Seek Legal Advice <a href="#seek-legal-advice" id="seek-legal-advice"></a>

Seek legal advice if you intend to become a Validator.&#x20;

### Community <a href="#community" id="community"></a>

Join our Discord channel to connect with the BitSong Validator community:

* [https://discord.gg/CJsaaBg](https://discord.gg/CJsaaBg)
