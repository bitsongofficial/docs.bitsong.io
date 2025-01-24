# Delegator Security

{% hint style="warning" %}
We are moving our **documentation** to the new "[**BitSong, the blockchain for music**](https://bitsong.io/en)" website. To access the most up-to-date and complete version of our guides and articles, please visit our new [**bitsong documentation**](https://bitsong.io/en/docs) website. This old documentation site will no longer be maintained or updated, so we **strongly recommend** referring to the new [**bitsong documentation**](https://bitsong.io/en/docs) website for the latest information. If you can't find what you're looking for on the new site, please be patient as we are still in the process of migrating all of our content. Thank you for your understanding!\
\
Visit the new article [https://bitsong.io/en/docs/delegators/delegator-security](https://bitsong.io/en/docs/delegators/delegator-security)
{% endhint %}

As the cryptocurrency sector has grown, it's unfortunately become a target for malicious actors, including hackers, scammers, and fraudulent operators. As such, there are some risks associated with holding crypto. However, these risks can be mitigated with some understanding of the kinds of tactics that malicious actors use, and how you can protect yourself against them.&#x20;

### Social Engineering <a href="#social-engineering" id="social-engineering"></a>

Delegating is an easy way for any BTSG holder to participate in securing the BitSong network and earn rewards through staking. Unlike becoming a Validator, there are low technical barriers to entry for Delegators. Delegators play an important role in safeguarding the network, by choosing Validators who behave in the best interests of the network. Delegators who stake tokens to the best-performing Validators will be best rewarded. Conversely, if a Delegator backs a Validator who misbehaves, the Validator gets slashed and the Delegator loses a share of their stake.&#x20;

In the context of cybersecurity, social engineering attacks are ones that exploit our human vulnerabilities to launch an attack. Anywhere you have an inbox or can be contacted socially is a potential platform for attackers to attempt to launch social engineering attacks. The most common type of social engineering attack is phishing. Typically, the attacker will contact potential victims posing as a legitimate third party, and ask questions designed to gain access to passwords, private keys, or other information that would allow them to steal funds.&#x20;

Therefore, the incentives in place for Delegators help to promote a positive balance of power among BTSG holders.&#x20;

There are literally thousands of ways that attackers attempt phishing attacks, but often they play to our base instincts – by telling someone they've won something, or telling them they're about to lose something.&#x20;

The reward structures for Validators and Delegators are slightly different due to the Validator commission. This is a percentage of revenues that the Validator takes before the rest is distributed to the Delegators in the Validator staking pool.&#x20;

Here are a few basic measures that can help keep you safe:

Delegators can browse commission rates before staking their BTSG, and Validators can only change their commission rate under certain conditions (see [section](delegator-security.md#choosing-a-validator) below).&#x20;

* **Never open attachments from people you don't know and never open links in emails from sources you don't trust. Attachments can install spyware or other kinds of malware on your c**omputers. Links can take you to compromised sites that may attempt to steal sensitive information from your computer.&#x20;
* **Make sure you always install updates to apps, browsers, and your device operating systems when they're available.** They often include important security updates designed to protect against attacks. &#x20;
* **Never buy BTSG from untrusted sources and always do your due diligence before buying BTSG from any seller or venue.**
* **If you ever receive an offer that sounds too good to be true, it usually is.** Remember that no reputable agent will ever ask you to disclose your private keys or passwords.&#x20;

In terms of risk, a Delegator's BTSG may be slashed if their validator misbehaves. See [Risks](delegator-security.md#risks) section for more info.

### Key Management <a href="#key-management" id="key-management"></a>

To become delegators, BTSG holders need to send a "Delegate transaction." The transaction should specify how many BTSG they want to bond and to which Validator.&#x20;

You will need a suitable storage solution for your BTSG tokens, along with a means of backup. The safest way to store private keys is offline, either using a crypto wallet, or on paper or a device that never connects to the internet. Ideally, you should keep multiple copies. Some crypto users also invest in a way to protect against disasters such as fire.&#x20;

A list of Validator candidates can be found in the [BitSong Explorer.](https://explorebitsong.com/validators)&#x20;

**Never, ever share your private keys with anyone**. You don't need to share your private keys to delegate your BTSG to a Validator on BitSong.&#x20;

If a Delegator wishes to unbond part or all of their stake, they should send an "Unbond transaction". There is a 21-day unbonding period, after which the bonded BTSG are released. If a Delegator simply wishes to switch their stake from one Validator to another, then they can use the "Rebond transaction" which takes effect immediately.&#x20;

### Software Vulnerabilities <a href="#software-vulnerabilities" id="software-vulnerabilities"></a>

### Choosing a validator <a href="#choosing-a-validator" id="choosing-a-validator"></a>

Always make sure you're using the latest version of any operating system, software, application, browser, or wallet. Updates often contain important security-related changes, so updating often protects you against security threats.&#x20;

In the BitSong Explorer, Delegators can find a range of information about the Validator set, as follows:&#x20;

BitSong will always release software through official project channels. Nobody from the project will ever contact you by email or chat messages asking you to download external software or programs.&#x20;

* **Validator's moniker**: The chosen name of the Validator candidate.
* **Validator's description**: Description provided by the validator operator.
* **Validator's website**: Link to the Validator's website if they have one.
* **Initial commission rate**: The commission rate that the Validator charges on revenues before they are distributed to Delegators&#x20;
* **Commission max change rate:** The maximum daily increase of the Validator's commission. This parameter cannot be changed by the Validator operator.
* **Maximum commission:** The maximum commission rate this Validator candidate can charge. This parameter cannot be changed by the Validator operator.
* **Minimum self-bond amount**: Minimum amount of BTSG the Validator candidate needs to have bonded at all time. If the Validator's self-bonded stake falls below this limit, their entire staking pool, including all delegated funds, will unbond automatically. This parameter acts as a safeguard for delegators. Similarly, when a Validator misbehaves, part of their total stake gets slashed. The slashing applies to the validator's self-delegated stake, as well as their delegators' stake. Therefore, Delegators can use the amount of self-bonded BTSG as a gauge of the amount of "skin in the game" on the part of a Validator. The minimum self-bond amount parameter offers a guarantee to Delegators that a Validator will always maintain their self-bonded BTSG amount above a certain level. Validators can only increase this amount, not decrease it.

### Verifying Transactions <a href="#verifying-transactions" id="verifying-transactions"></a>

### Directives of delegators <a href="#directives-of-delegators" id="directives-of-delegators"></a>

All Delegators should be familiar with the basic commands and transaction types needed to participate in delegation. Please use BitSong's official documentation as a guide, also to make sure that you aren't being tricked or conned when taking advice from others. Be wary of advice from people you don't know, especially those in public forums.&#x20;

Becoming a Delegator may be technically easier than becoming a Validator, but it's not a passive job. Here are the main responsibilities of a Delegator:

**Blockchain transactions are irreversible. Always verify twice or even three times before hitting send.** Wherever possible, use QR codes and copy/paste addresses rather than manually typing them to reduce the risk of errors.

* **Ensure you conduct due diligence on Validators before delegating.** A badly-behaved Validator will put your stake at risk of slashing. Therefore, due diligence is important to ensure that you can make a careful selection of Validators with the lowest risk of slashing.&#x20;
* **Actively monitor their Validator throughout the delegation period.** Delegators should continue to ensure that the Validators they've staked to have good uptime, don't double sign or become compromised, and participate in governance votes. They should also monitor the commission rate to make sure they're happy with any changes. If a Delegator is not satisfied, they can either unbond or switch to another validator (Note: Delegators do not have to wait the 21-day unbonding period to switch Validators. Rebonding to another Validator takes effect immediately).
* **Participate in governance.** Delegators should actively participate in governance. The size of their bonded stake determines the voting power. If a delegator doesn't vote, they will inherit the vote of their Validator(s). If they do vote, they override the vote of their Validator(s). Therefore, the role that Delegators can play in balancing the weight of the votes in governance cannot be overstated.&#x20;

### Account Security <a href="#account-security" id="account-security"></a>

### Revenue <a href="#revenue" id="revenue"></a>

Attackers understand the way that humans work online, and they know that we have tendencies to be lazy around things like reusing passwords. But those kind of practices mean that any account can act as a gateway allowing access to all of your most sensitive accounts, including email, bank accounts, or social media.&#x20;

Validators and Delegators earn rewards in exchange for their participation. Rewards are generated from two sources of revenue:

There are a few actions you can take to remediate this risk:

* **Block rewards:** Block rewards are generated from the inflation algorithm, creating newly-minted BTSG with each block. The algorithm is configured to encourage BTSG holders to stake. **BTSG** inflation is determined by the amount of bonded BTSG, expressed as a percentage. If the percentage of the total BTSG supply that is bonded goes up, then the inflation rate will decrease accordingly. Similarly, the reward percentage fluctuates as a function of the inflation rate and the percentage of bonded BTSG. Put simply, the formula is designed such that, in case the amount of bonded BTSG decreases, participants can earn higher rewards because the inflation parameter increases the amount of newly minted BTSG. The increased rewards will attract more bonded BTSG and in turn, increase network security. You can view the inflation rate and percentage of bonded BTSG in real time using the [**BitSong Explorer**](https://bitsong.bigdipper.live).
* **Transaction fees:** Each transaction on the BitSong network incurs fees paid in BTSG, which are distributed to Validators and Delegators according to the weight of their stake.&#x20;
* Make sure you enable 2-factor authentication everywhere you can, and to make sure that you are using a code generator or separate hardware key as a backup, rather than SMS codes
* Refrain from using SMS as a recovery method when you can't access your accounts. Instead, use an authenticator app or hardware key, particularly if you're using crypto exchanges.&#x20;

### Validator Commission <a href="#validator-commission" id="validator-commission"></a>

### Supply Chain Attacks <a href="#supply-chain-attacks" id="supply-chain-attacks"></a>

Each Validator receives revenue paid to their Validator pool based on their total staked amount. Before the revenue is distributed to the Delegators in the pool, the Validator can apply a commission. Let's take an example.

Malicious actors will also attempt to pre-emptively attack devices by penetrating the supply chain. Only ever purchase hardware or hardware wallets directly from suppliers, or from trusted third parties. Be aware that scammers may operate as suppliers on marketplaces such as Amazon.&#x20;

There is a Validator who has a staking pool worth 10% of the total stake of all validators. This Validator also has a 20% self-delegated stake and applies a commission rate of 10%.&#x20;

### Disclaimer <a href="#disclaimer" id="disclaimer"></a>

A block comes in with the following revenue:

Please note that BitSong is early-stage software and it may be that we experience issues, updates, and bugs. Some elements of using the platform require advanced technical skills and involve risks which are outside of the control of the BitSong team. Any use of BitSong licensed software is done at your own risk and on a "AS IS" basis, without warranties or conditions of any kind, and any and all liability of BitSong for damages arising in connection to the software is excluded. Please exercise extreme caution!\`

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
