# Abstract Client 

As previously mentioned you can use the abstract-client package to interact with any instance of Abstract, including Bitsong's implementation. For this example we’ll use the `Mock` environment for simplicity. However, the same functions can be used for any `CwEnv`.

:::info
You can read the [`abstract-client` documentation](https://docs.rs/abstract-client/latest/abstract_client/) for more information.
:::

### Example 

```rs
    // Create environment
    let env: MockBech32 = MockBech32::new("mock");
    let sender: Addr = env.sender_addr();

    // Build the client
    let client: AbstractClient<MockBech32> = AbstractClient::builder(env.clone()).build_mock()?;
```

These three lines:

1. Created a mock environment to deploy to.
2. Deployed `Abstract` to that environment and returned a client.
You can then start using the client to do all sorts of things. For example, you can set and query balances easily.

```rs
    let coins = &[Coin::new(50u128, "btsg"), Coin::new(20u128, "btc")];

    // Set a balance
    client.set_balance(&sender, coins)?;

    // Add to an address's balance
    client.add_balance(&sender, &[Coin::new(50u128, "btsg")])?;

    // Query an address's balance
    let btsg_balance = client.query_balance(&sender, "btsg")?;

    assert_eq!(btsg_balance.u128(), btsg);
```
Then, you can use the client to create a `Publisher` to publish an App to the platform.
```rs
    // Create a publisher
    let publisher: Publisher<MockBech32> = client
        .account_builder()
        .namespace(Namespace::from_id(TEST_MODULE_ID)?)
        .build()?
        .publisher()?;

    // Publish an app
    publisher.publish_app::<MockAppI<MockBech32>>()?;
```
Now that the App is published anyone can create an `Account` and install it!

```rs
    let accounti: Account<MockBech32> = client.account_builder().build()?;

    // Install an app
    let app: Application<MockBech32, MockAppI<MockBech32>> =
        accounti.install_app::<MockAppI<MockBech32>>(&MockInitMsg {}, &[])?;
```
Et voila! You’ve just deployed `Abstract` and an App to a mock environment. You can now start testing your module.

The `Account` object also has some useful helper methods:

```rs
    // Get account info
    let account_info: AccountInfo = accounti.info()?;
    // Get the owner
    let owner: Addr = accounti.owner()?;
    // Add or set balance
    accounti.add_balance(&[Coin::new(100u128, "btsg")])?;
    // ...
```

You can explore more of its functions in the [type’s documentation](https://docs.rs/abstract-client/latest/abstract_client/struct.Account.html).