# Registry
The Registry contract acts as the registry for all modules and accounts within the Bitsong Account platform. Bitsong Accounts can use it to claim namespaces and register their modules. The Registry contract allows modules to be queried by its namespace, name, and version, returning its reference which may be a code id or address.

## Namespaces
An account’s namespace is a unique identifier that is used to provide a publishing domain for modules and a human readable name for any Bitsong Account. Namespaces are claimed by an account and can be used to publish modules. Namespaces are unique and can only be claimed once. An account can only claim one namespace.

## Propose Modules 

Developers that wish to publish modules to the Bitsong Account platform need to call ProposeModules on the Registry contract. The modules will subsequently be reviewed by the AbsBitsong Account platform for registration.


__Modules cannot be registered without their namespaces being claimed by an Account. This is to prevent malicious actors from registering modules under trusted namespaces.__


:::warning
For mainnet deployment proposed modules are reviewed by the Bitsong Abstract team. To get them approved, reach out to us on Discord. For testnet deployment there is no review process.
:::