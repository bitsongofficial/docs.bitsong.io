# Delegator FAQ

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/delegators/delegator-faq](https://bitsong.io/en/docs/delegators/delegator-faq)
{% endhint %}

This section contains answers to some commonly-asked questions from BTSG delegators.&#x20;

### What is a delegator? <a href="#what-is-a-delegator" id="what-is-a-delegator"></a>

Delegating is an easy way for any BTSG holder to participate in securing the BitSong network and earn rewards through staking. Unlike becoming a Validator, there are low technical barriers to entry for Delegators. Delegators play an important role in safeguarding the network, by choosing Validators who behave in the best interests of the network. Delegators who stake tokens to the best-performing Validators will be best rewarded. Conversely, if a Delegator backs a Validator who misbehaves, the Validator gets slashed and the Delegator loses a share of their stake.&#x20;

Therefore, the incentives in place for Delegators help to promote a positive balance of power among BTSG holders.&#x20;

The reward structures for Validators and Delegators are slightly different due to the Validator commission. This is a percentage of revenues that the Validator takes before the rest is distributed to the Delegators in the Validator staking pool.&#x20;

Delegators can browse commission rates before staking their BTSG, and Validators can only change their commission rate under certain conditions (see [section](delegator-faq.md#choosing-a-validator) below).&#x20;

In terms of risk, a Delegator's BTSG may be slashed if their validator misbehaves. See [Risks](delegator-faq.md#risks) section for more info.

To become delegators, BTSG holders need to send a "Delegate transaction." The transaction should specify how many BTSG they want to bond and to which Validator.&#x20;

A list of Validator candidates can be found in the [BitSong Explorer.](https://explorebitsong.com/validators)&#x20;

If a Delegator wishes to unbond part or all of their stake, they should send an "Unbond transaction". There is a 21-day unbonding period, after which the bonded BTSG are released. If a Delegator simply wishes to switch their stake from one Validator to another, then they can use the "Rebond transaction" which takes effect immediately.&#x20;

### Choosing a validator <a href="#choosing-a-validator" id="choosing-a-validator"></a>

In the BitSong Explorer, Delegators can find a range of information about the Validator set, as follows:&#x20;

* **Validator's moniker**: The chosen name of the Validator candidate.
* **Validator's description**: Description provided by the validator operator.
* **Validator's website**: Link to the Validator's website if they have one.
* **Initial commission rate**: The commission rate that the Validator charges on revenues before they are distributed to Delegators&#x20;
* **Commission max change rate:** The maximum daily increase of the Validator's commission. This parameter cannot be changed by the Validator operator.
* **Maximum commission:** The maximum commission rate this Validator candidate can charge. This parameter cannot be changed by the Validator operator.
* **Minimum self-bond amount**: Minimum amount of BTSG the Validator candidate needs to have bonded at all time. If the Validator's self-bonded stake falls below this limit, their entire staking pool, including all delegated funds, will unbond automatically. This parameter acts as a safeguard for delegators. Similarly, when a Validator misbehaves, part of their total stake gets slashed. The slashing applies to the validator's self-delegated stake, as well as their delegators' stake. Therefore, Delegators can use the amount of self-bonded BTSG as a gauge of the amount of "skin in the game" on the part of a Validator. The minimum self-bond amount parameter offers a guarantee to Delegators that a Validator will always maintain their self-bonded BTSG amount above a certain level. Validators can only increase this amount, not decrease it.

### Directives of delegators <a href="#directives-of-delegators" id="directives-of-delegators"></a>

Becoming a Delegator may be technically easier than becoming a Validator, but it's not a passive job. Here are the main responsibilities of a Delegator:

* **Ensure you conduct due diligence on Validators before delegating.** A badly-behaved Validator will put your stake at risk of slashing. Therefore, due diligence is important to ensure that you can make a careful selection of Validators with the lowest risk of slashing.&#x20;
* **Actively monitor their Validator throughout the delegation period.** Delegators should continue to ensure that the Validators they've staked to have good uptime, don't double sign or become compromised, and participate in governance votes. They should also monitor the commission rate to make sure they're happy with any changes. If a Delegator is not satisfied, they can either unbond or switch to another validator (Note: Delegators do not have to wait the 21-day unbonding period to switch Validators. Rebonding to another Validator takes effect immediately).
* **Participate in governance.** Delegators should actively participate in governance. The size of their bonded stake determines the voting power. If a delegator doesn't vote, they will inherit the vote of their Validator(s). If they do vote, they override the vote of their Validator(s). Therefore, the role that Delegators can play in balancing the weight of the votes in governance cannot be overstated.&#x20;

### Revenue <a href="#revenue" id="revenue"></a>

Validators and Delegators earn rewards in exchange for their participation. Rewards are generated from two sources of revenue:

* **Block rewards:** Block rewards are generated from the inflation algorithm, creating newly-minted BTSG with each block. The algorithm is configured to encourage BTSG holders to stake. **BTSG** inflation is determined by the amount of bonded BTSG, expressed as a percentage. If the percentage of the total BTSG supply that is bonded goes up, then the inflation rate will decrease accordingly. Similarly, the reward percentage fluctuates as a function of the inflation rate and the percentage of bonded BTSG. Put simply, the formula is designed such that, in case the amount of bonded BTSG decreases, participants can earn higher rewards because the inflation parameter increases the amount of newly minted BTSG. The increased rewards will attract more bonded BTSG and in turn, increase network security. You can view the inflation rate and percentage of bonded BTSG in real time using the [**BitSong Explorer**](https://bitsong.bigdipper.live).
* **Transaction fees:** Each transaction on the BitSong network incurs fees paid in BTSG, which are distributed to Validators and Delegators according to the weight of their stake.&#x20;

### Validator Commission <a href="#validator-commission" id="validator-commission"></a>

Each Validator receives revenue paid to their Validator pool based on their total staked amount. Before the revenue is distributed to the Delegators in the pool, the Validator can apply a commission. Let's take an example.

There is a Validator who has a staking pool worth 10% of the total stake of all validators. This Validator also has a 20% self-delegated stake and applies a commission rate of 10%.&#x20;

A block comes in with the following revenue:

* 990 BTSG in block provisions
* 10 BTSG in transaction fees.

So a total of 1000 BTSG to be distributed among all staking pools.

Our Validator's staking pool represents 10% of the total stake, which means the pool receives 100 BTSG. Now let's look at how the revenue breaks down to Delegators:

* Commission = `10% * 80% * 100` BTSG = 8 BTSG
* Validator's revenue = `20% * 100` BTSG + Commission = 28 BTSG
* Delegators' total revenue = `80% * 100` BTSG - Commission = 72 BTSG

Now, each Delegator in the staking pool can claim their portion of the Delegators' total revenue.

### Risks <a href="#risks" id="risks"></a>

There are some risks of staking cryptocurrencies. While they're staked, your BTSG are locked up, and there's a 21-day unbonding period to release them.&#x20;

Furthermore, there's the risk that Validators may misbehave and incur slashing penalties. Any slashing includes the stake of their Delegators.

There is one main behavior that incurs slashing penalties, known as double-signing. If someone reports that a Validator signed two different blocks with the same chain ID at the same height, this validator will get slashed.

A Validator's track record will show their performance, including their slashing history. Therefore, it's important that Delegators perform careful due diligence on Validators before delegating. Monitoring performance is also important. If your chosen Validator is offline too often, you can simply switch to another Validator. You can also choose to offset the overall risk by staking to multiple Validators.&#x20;
