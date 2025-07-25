# tokenized-account

## Creating A NFT Owned Account

### Things to Consider

* **Contract Level Admins**: The nature of CosmWasm NFTs generally consist of a single contract that contains the internal state of a collection of NFTs. If there is a contract-level admin to this contract, this may introduce a scenario where the admin of the collection may be authorized to perform actions for a specific token within the collection, such as transfer ownership of the token, or perform actions on behalf of the token owner. \
  \
  **This is a large attack surface area, and should be mitigated by keeping conscious of which collections are used, and what specific ownership features are possible.** [**BS721-Accounts**](https://github.com/permissionlessweb/bs-accounts/tree/minimal-bs-accounts) **is a NFT collection set that is built specifically designed to mitigate this risk.**\

* **Potential Unwanted Authorizations**: Another common feature of CosmWasm NFT contracts is the ability to authorize any wallet to perform an action including a specific token within a collection. This is useful in specific scenarios, however exploitative in others.\
  \
  For example, an on-chain application that consist of a smart contract and Front End UI may include an authorization message to perform specific functions required. This may introduce unwanted risk of losing account ownership if the token bound as an owner of a Bitsong account is mistakenly authorized. **Be conscious about what messages you are authorizing with you accounts!**

### Requirements

The following is required to create a NFT-based Bitsong Abstract Smart-contract System:

* &#x20;A form of authentication
* A bs721-account collection-token

