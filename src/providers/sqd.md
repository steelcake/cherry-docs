# SQD

SQD Network is a decentralized query engine optimized for batch extraction of large volumes of data. It currently serves historical on-chain data ingested from 100+ EVM and Substrate networks, as well as Solana (in beta), Tron, Starknet and Fuel. The data is comprehensive: for example, on EVM it includes event logs, transaction receipts, traces and per-transaction state diffs.

SQD currently supports [100+ EVM Chains](https://docs.sqd.ai/subsquid-network/reference/networks/)

SQD has beta support for [Solana](https://docs.sqd.ai/solana-indexing/).

Warning: Data starts from block slot `317617480` when using solana with sqd.

Read more at the [official documentation](https://docs.sqd.ai/).


# Example ProviderConfig

```python
from cherry_core import ingest

provider = ingest.ProviderConfig(
    kind=ingest.ProviderKind.HYPERSYNC,
    url="https://portal.sqd.dev/datasets/solana-beta",
)
```

You can change `solana-beta` with any dataset name from the [supported networks page](https://docs.sqd.ai/subsquid-network/reference/networks/).

For example you can use `https://portal.sqd.dev/datasets/arbitrum-nova` to get arbitrum-nova data.

# Deploying portals

Access to SQD portal API is free but slightly limited at the moment.

You can deploy a portal to have unlimited access. You can contact us [in telegram](https://t.me/cherry_etl) for help with deploying and maintaining portal instances. 

