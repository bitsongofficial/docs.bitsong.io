# modules

## Account Modules

### Module Factory

The Module Factory is a contract that allows Account owners to install and manage Account Modules for their Bitsong Account.

### Module-IDs

Every module is uniquely identified by a module ID. This ID is a string that follows the following format:

```rust
<namespace>:<name>
```

The namespace is a string that resembles the publishing domain of a module developer, while the name is the name of the module itself. For example, the `bitsong:usb` module is an App module developed by Bitsong where `bitsong` is the namespace and `usb` is the name of the module.

Additionally each module has a SEMVER version number that can be used to uniquely identify a specific version of a module, or just get the latest version. Module IDs and their versions are used to install modules on an Bitsong Account.

### Apps

An App module adds or alters the functionality of an Bitsong Account, exposing new functions to you and/or your users.

**Each App module instance is exclusive to a single Bitsong Account, meaning the instance is created and owned by the Account.** This level of control extends to the management of upgrades, maintenance, and any customization that might be required for the specific use case of the application.

Because each Account has its own instance of an App, App modules can be tightly integrated with the Account’s existing infrastructure. This includes the ability to interact directly with other modules (including Apps) installed on the same account, enabling powerful synergies and cross-module functionality.

#### Adapters

Adapters serve as standard interfaces that facilitate communication between your Bitsong Account and various external services.

#### Standalone

A Standalone module is any contract that is not directly integrated with Bitsong Accounts. These contracts don’t have to conform to the expected APIs of other module types.

#### Service

A Service module is not a module type per se, but rather a way to categorize a smart-contract that provide a service to the Bitsong Account ecosystem.
