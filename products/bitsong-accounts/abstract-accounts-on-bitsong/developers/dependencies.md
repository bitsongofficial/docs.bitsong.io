---
description: Details on crate dependencies
---

# dependencies

## Dependencies

A dependency is a package of software that a developer relies on to implement his/her own application. By relying on this external code, the developer doesn’t need to implement the dependency’s functionality themselves, reusing an building with existing features.&#x20;

{% hint style="info" %}
These can be thought of as VST plugins for the audio engineers out there ;)
{% endhint %}

Bitsongs Abstract Accounts allows you to add other smart contracts as dependencies to your module. Doing so enables you to keep your app’s complexity low and focus on the core functionality of your module while leveraging the functionality of battle-tested code.

We’ll cover how to declare your dependencies and then how to ensure you have them installed them before you try to install your own module.

### Declaring Dependencies

Declaring a dependency is a two-step process:

1. **Specify the dependency**\
   First, you specify the dependency itself using the `StaticDependency` struct. The struct contains the ID for the module you wish to depend on, as well as an array of version requirements. The formatting and assertion of these requirements are identical to [Cargo’s version requirement functionality](https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html).

```rust
use bitsong_app::std::STORAGE;
use abstract_app::std::objects::dependency::StaticDependency;

const USB_DEP: StaticDependency = StaticDependency::new(STORAGE, &[">=0.6.9"]);
```

2. **Add dependency to module**\
   Once configured, you can add the dependency to your module using the `with_dependencies` method on the `App` struct. This method takes a slice of `StaticDependency` structs and asserts that all dependencies are met when the module is instantiated.

```rust
const APP: MIPFSApp = MIPFSApp::new(STORAGE, MODULE_VERSION, None)
// ...
.with_dependencies(&[USB_DEP]);
```

You can now safely start using the APIs that should be included in any of your dependencies.

### Dependency Installation

Before you can install your own module you must install all your module’s dependencies. To do this we provide a `DependencyCreation` trait that you should implement for your module. The goal of the trait is to enable you to configure which dependencies should be installed and with which parameters.

Here’s an example using the dollar-cost-average app that depends on CronCat and a DEX adapter.

```rust
const APP: PaymentApp = PaymentApp::new(APP_ID, APP_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler)
    .with_migrate(handlers::migrate_handler)
    // Specify dependencies
    .with_dependencies(&[DEX_DEPENDENCY]);
```

With these specified, our abstract-client crate can install all your modules and their dependencies when you install your app, like so:

```rust
    let accounti: Account<MockBech32> = client.account_builder().build()?;

    // Install an app
    let app: Application<MockBech32, MockAppI<MockBech32>> =
        accounti.install_app::<MockAppI<MockBech32>>(&MockInitMsg {}, &[])?;
```

The next section goes deeper into the `abstract-client` and how you can use it create accounts, publish modules and install your modules.

### Module Dependency Assertion
