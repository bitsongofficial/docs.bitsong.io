use abstract_interface::Abstract;
use abstract_std::objects::gov_type::GovernanceDetails;
use cw_orch::{contract::Deploy, environment::ChainInfoOwned};
// ANCHOR: full_counter_example
use cw_orch_daemon::DaemonBuilder;
use tokio::runtime::Runtime;

// From https://github.com/CosmosContracts/juno/blob/32568dba828ff7783aea8cb5bb4b8b5832888255/docker/test-user.env#L2
const MAIN_MNEMONIC: &str = "syrup assault report bid rug measure parent nothing clutch answer chunk pear derive wage install diary decade width bamboo creek black follow shallow toss";

use cw_orch_core::environment::{ChainInfo, ChainKind, NetworkInfo};

pub const BITSONG_NETWORK: NetworkInfo = NetworkInfo {
    chain_name: "juno",
    pub_address_prefix: "juno",
    coin_type: 118u32,
};

pub const BITSONG_1: ChainInfo = ChainInfo {
    kind: ChainKind::Mainnet,
    chain_id: "juno-1",
    gas_denom: "ujuno",
    gas_price: 0.075,
    grpc_urls: &["http://juno-grpc.polkachu.com:12690"],
    network_info: BITSONG_NETWORK,
    lcd_url: None,
    fcd_url: None,
};

pub const BOBNET: ChainInfo = ChainInfo {
    kind: ChainKind::Testnet,
    chain_id: "osmo-test-5",
    gas_denom: "uosmo",
    gas_price: 0.025,
    grpc_urls: &["https://grpc.osmotest5.osmosis.zone:443"],
    network_info: BITSONG_NETWORK,
    lcd_url: None,
    fcd_url: None,
};

pub const LOCAL_BITSONG: ChainInfo = ChainInfo {
    kind: ChainKind::Local,
    chain_id: "120u-1",
    gas_denom: "ubtsg",
    gas_price: 0.0026,
    grpc_urls: &["http://127.0.0.1:9090"],
    network_info: BITSONG_NETWORK,
    lcd_url: None,
    fcd_url: None,
};

fn manual_deploy(network: ChainInfoOwned) -> anyhow::Result<()> {
    let _rt = Runtime::new()?;
    let daemon = DaemonBuilder::default().chain(network).build()?;
    let wallet = daemon.wallet().address()?;
    // rt.block_on(assert_wallet_balance(vec![network.clone()]));

    let abs = Abstract::deploy_on(daemon.clone(), wallet.to_string())?;
    let account = abs
        .account_factory
        .create_default_account(GovernanceDetails::NFT { collection_addr: "juno1nt99rlwn2ue92r7x84g3lqgjhdfk3mr3f3rmy56ruf463krsc4nq7lnyw5".to_string(), token_id: "account-token-1".to_string() })?;

    println!("{:?}", account.to_string());
    Ok(())
}

pub fn main() -> anyhow::Result<()> {
    env_logger::init();
    std::env::set_var("MAIN_MNEMONIC", MAIN_MNEMONIC);

    if let Err(ref err) = manual_deploy(BITSONG_1.into()) {
        log::error!("{}", err);
        err.chain()
            .skip(1)
            .for_each(|cause| log::error!("because: {}", cause));
        ::std::process::exit(1);
    }

    Ok(())
}
