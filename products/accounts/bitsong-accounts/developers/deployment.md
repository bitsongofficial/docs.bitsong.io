# Module Deployment 

Deploying your module is an easy 3-step process: Module Uploading, Registration and Schema Linking. Let’s go over each step in detail.

## Module Uploading 
Uploading your module involves first compiling your module as a WASM binary and then uploading it to the network(s) you want your module to be available on. This will yield you a code_id that is a unique identifier for your module on the network.

### Compiling your module
Once you have confirmed that your module works as expected you can spin up a local node and deploy Abstract + your app onto the chain. You need Docker installed for this step.

You can compile your module by running the following command:
```sh
$ just wasm
> Compiling to WASM...
```

:::info 
The WASM optimizer uses a docker container to compile your module. If you don’t have docker installed you can install it from [here](https://docs.docker.com/get-started/get-docker/).
:::

This should result in an `artifacts` directory being created in your project root. Inside you will find a `my_module.wasm` file that is your module’s binary.

### Publish your module
Before attempting to publish your app you need to add your mnemonic to the `.env` file. Permissionless publishing of modules may only take place on testnet. Make sure this account has funds. If you don’t, the deployment will fail. 

#### Publish to testnet 
```sh
$ just publish bobnet-1
> Deploying module...
```
This will use the module’s `examples/publish.rs` script to deploy the module to the uni-1 network.  The script will also attempt to register the module on the Abstract Registry, hence the mnemonic used in the script should be the same as the one you used to create the account and register the namespace.
#### Publish to mainnet
```sh
# todo: script to propose to register module on the Abstract Registry
```
The resulting code-id of your contract should now be in the `state.json` file created for you.

## JSON Schema Linking
To improve the user-experience for developers using your module we recommend linking your module’s JSON schema to the Bitsong Registry.

:::warning

You need to install [github cli](https://cli.github.com/) for this step.

Follow [these install instructions](https://github.com/cli/cli#installation) as per your operating system needs.

:::

To link your module’s schema you can run the following command:
```sh
$ just publish-schemas <namespace> <name> <version>
> Publishing schemas...
```
Where you fill the <namespace>, <name> and <version> with the same values you used to register your module on the Bitsong Registry.


## Module Installation