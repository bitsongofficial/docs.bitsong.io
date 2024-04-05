# Deploy a Smart Contract

### **Clone cw-template**

For this example, we will use the [cw-template](https://github.com/bitsongofficial/cw-template) repo with counter example.

```bash
cargo generate --git https://github.com/bitsongofficial/cw-template.git --name my-first-contract
```

Select `false`

```bash
🔧   Destination: /home/angelo/Progetti/my-first-contract ...
🔧   Generating template ...
? 🤷   Would you like to generate the minimal template?
The full template includes some example logic in case you're new to CosmWasm smart contracts.
The minimal template assumes you already know how to write your own logic, and doesn't get in your way. ›
❯ false
  true
```

```bash
cd my-first-contract
```

### **Compile the wasm contract**

To deploy smart contracts, you must compile the code and make it an executable wasm binary file. We will compile the wasm contract with stable toolchain.

Compile using the command below:

```bash
# Set 'stable' as the default release channel:
rustup default stable
cargo wasm
```

After this compiles, it should produce a file in `target/wasm32-unknown-unknown/release/my_first_contract.wasm`. If you check the size of the file by using the `ls -lh` command, it shows around `1.9M`. This is a release build, but not stripped of all unneeded code. To produce a much smaller version, you can run this which tells the compiler to strip all unused code out:

```bash
RUSTFLAGS='-C link-arg=-s' cargo wasm
```

This produces a file about `155K`. To reduce gas costs, the binary size should be as small as possible. This will result in a less costly deployment, and lower fees on every interaction. Also, if you don’t use compilation optimization, CosmWasm smart contract will not be deployed well due to `exceeds limit` error.

### **Optimized Compilation**

You can do further optimization using [rust-optimizer](https://github.com/CosmWasm/rust-optimizer). **rust-optimizer** produces reproducible builds of CosmWasm smart contracts and does heavy optimization on the build size, using binary stripping and `wasm-opt`.

```bash
docker run --rm -v "$(pwd)":/code \
    --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
    --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
    cosmwasm/rust-optimizer:0.12.8
```

Binary file will be at `artifacts/my_first_contract.wasm` folder and its size will be about `130K`, which is more smaller than when only `RUTFLAGS` was used.

### **Store to BitSong Cosmwasm Testnet**

We have the wasm binary executable ready. Now it is time to store the code to the **BitSong Cosmwasm Testnet**.

```bash
RES=$(bitsongd tx wasm store artifacts/my_first_contract.wasm --from mywallet --gas-prices 0.1ubtsg --gas auto --gas-adjustment 1.3 -y --output json -b block)
```

* `bitsongd tx wasm store` : upload a wasm binary
* `--from` : name or address of private key with which to sign.
* `--gas-prices` : gas prices in decimal format to determine the transaction fee.
* `--gas` : gas limit to set per-transaction. set to “auto” to calculate sufficient gas automatically
* `--gas-adjustment` : adjustment factor to be multiplied against the estimate returned by the tx simulation.
* `-y` : to skip tx broadcasting prompt confirmation.
* `--output` : output format.
* `-b` : transaction broadcasting mode

Once that is complete, you can get the `CODE_ID` easily using `jq`.

`jq` is an open source that helps extract data from JSON. Install it according to your OS using the following command:

```bash
# Linux
sudo apt-get install jq

# Mac
brew install jq
```

Run the following command to set the `CODE_ID` as a variable:

```bash
# get CODE_ID
CODE_ID=$(echo $RES | jq -r '.logs[0].events[-1].attributes[1].value')
echo $CODE_ID
```

#### **Instantiate the contract**

We can now create an instance of this wasm contract. First, set the initial state of the instance in the `INIT` variable and run the `instantiate command`.

```bash
# set the initial state of the instance
INIT='{"count":100}'

# instantiate the contract
bitsongd tx wasm instantiate $CODE_ID "$INIT" \
    --from mywallet --label "my first contract" --gas-prices 0.025ubtsg --gas auto --gas-adjustment 1.3 -b block -y --no-admin
```

* `bitsongd tx wasm instantiate` : instantiate a wasm contract using **CODE\_ID** of the uploaded binary.
* `--label` : human-readable name for this contract in lists.
* `--no-admin` : you must set this explicitly if you don’t want an admin.

Get the contract address using the command following:

```bash
CONTRACT_ADDR=$(bitsongd query wasm list-contract-by-code $CODE_ID --output json | jq -r '.contracts[0]')
echo $CONTRACT_ADDR
```

#### **Query the contract**

Now, let’s see if the contract we deployed works well.

#### **Get contract’s count**

Send a `get_count` query to check the count value. The previously set `INIT` state is output as it is.: `{"data":{"count":100}}`

```bash
QUERY='{"get_count":{}}'
bitsongd query wasm contract-state smart $CONTRACT_ADshDR "$QUERY" --output json
```

The output will be

```json
{"data":{"count":100}}
```

* `bitsongd query wasm contract-state smart` : calls contract with given address with query data and prints the returned result

### **Execute the Contract**

#### **Increment contract’s count**

This time, let’s send an `increment` transaction that increases the count value by +1. Because the transaction changes the internal state of the contract, you must pay gas fees.

If you run the `get_count` query again after sending the `increment` transaction, you can see that +1 has increased from the previous count value.

```bash
TRY_INCREMENT='{"increment": {}}'
bitsongd tx wasm execute $CONTRACT_ADDR "$TRY_INCREMENT" --from mywallet --gas-prices 0.025ubtsg --gas auto --gas-adjustment 1.3 -y
```

#### **Reset contract’s count**

Lastly, let’s send a `reset` transaction. Like increment, reset transaction also changes the internal state of contract, so you must pay gas fees.

```bash
RESET='{"reset": {"count": 0}}'
bitsongd tx wasm execute $CONTRACT_ADDR "$RESET" --from mywallet --gas-prices 0.025ubtsg --gas auto --gas-adjustment 1.3 -y
```
