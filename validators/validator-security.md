# Validator Security

## Validator Security <a href="#validator-security" id="validator-security"></a>

BitSong encourages Validators to run their operations independently to ensure diverse setups to increase network resilience. However, these are some general guidelines and information.&#x20;

### Key Management - HSM <a href="#key-management-hsm" id="key-management-hsm"></a>

Validator key security is absolutely paramount. If a Validator's key becomes compromised, their entire staked pool, including delegated BTSG, is at risk. Hardware security modules are hardware-based key management solutions that help to offset the risk of a breach.&#x20;

HSM modules must support `ed25519` signatures for the BitSong blockchain. The YubiHSM2 supports `ed25519` and [this yubikey library is available (opens new window)](https://github.com/iqlusioninc/yubihsm.rs). Please note that the YubiHSM can protect a private key but cannot ensure in a secure setting that it won't sign the same block twice.

We are also working on extending our Ledger Nano S application to support validator signing. This app can store recent blocks and mitigate double signing attacks.

We will update this page when more key storage solutions become available.

### Sentry Nodes (DDoS Protection) <a href="#sentry-nodes-ddos-protection" id="sentry-nodes-ddos-protection"></a>

Validators have a responsibility to ensure that the network can withstand denial of service (DoS) attacks.

Validators can mitigate these risks by carefully structuring their network topology in a so-called sentry node architecture.

Validator nodes should only connect to full nodes they trust - either because they operate the nodes themselves or because the nodes are run by other validators they know socially.&#x20;

A validator node typically runs in a data center, most of which are linked directly to the networks of major cloud providers. The validator can use those links to connect to sentry nodes, which run in the cloud.&#x20;

This setup shifts the responsibility of denial-of-service from the validator's node directly to its sentry nodes. It may require new sentry nodes to be set up to mitigate attacks on existing ones.

It's possible to spin up sentry nodes or change their IP addresses relatively quickly. Because the links to the sentry nodes exist in private IP space, an internet-based DoS attack does not affect them directly. Thus, this setup will ensure that validator block proposals and votes are always transmissible to the rest of the network.

Follow these steps to set up your sentry node architecture:&#x20;

Validators nodes should edit their config.toml:

\# Comma separated list of nodes to keep persistent connections to&#x20;

\# Do not add private peers to this list if you don't want them advertised persistent\_peers =\[list of sentry nodes]&#x20;

\# Set true to enable the peer-exchange reactor pex = false

Sentry Nodes should edit their config.toml:

\# Comma separated list of peer IDs to keep private (will not be gossiped to other peers)&#x20;

\# Example ID: 3e16af0cead27979e1fc3dac57d03df3c7a77acc@3.87.179.235:26656 private\_peer\_ids = "node\_ids\_of\_private\_peers"

### Environment Variables <a href="#environment-variables" id="environment-variables"></a>

&#x20;
