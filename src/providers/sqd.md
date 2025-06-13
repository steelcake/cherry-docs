# SQD

SQD Network is a decentralized query engine optimized for batch extraction of large volumes of data. It currently serves historical on-chain data ingested from 100+ EVM and Substrate networks, as well as Solana (in beta), Tron, Starknet and Fuel. The data is comprehensive: for example, on EVM it includes event logs, transaction receipts, traces and per-transaction state diffs.

SQD currently supports [100+ EVM Chains](https://docs.sqd.ai/subsquid-network/reference/networks/)

SQD has beta support for [Solana](https://docs.sqd.ai/solana-indexing/).

Warning: Data starts from block slot `317617480` when using solana with sqd.

Read more at the [official documentation](https://docs.sqd.ai/).


## Example ProviderConfig

```python
from cherry_core import ingest

provider = ingest.ProviderConfig(
    kind=ingest.ProviderKind.HYPERSYNC,
    url="https://portal.sqd.dev/datasets/solana-beta",
)
```

You can change `solana-beta` with any dataset name from the [supported networks page](https://docs.sqd.ai/subsquid-network/reference/networks/).

For example you can use `https://portal.sqd.dev/datasets/arbitrum-nova` to get arbitrum-nova data.

## Deploying portals

Access to SQD portal API is free but slightly limited at the moment.

You can deploy a portal to have unlimited access. You can contact us [in telegram](https://t.me/cherry_etl) for help with deploying and maintaining portal instances. 


## Soldexer

<img src="soldexer_logo_purple.png" alt="Soldexer Logo" width="200"/>

Soldexer is SQD's Typescript Solana indexer and an alternative to Cherry specifically designed for Solana's historical and real-time data.

SQD Network by SQD provides the decentralized infrastructure that powers both Cherry and Soldexer. The network's 2,900+ worker nodes ensure reliable data processing and transparent architecture.

Learn more at [soldexer.dev](https://www.soldexer.dev/) and check out the [GitHub repository](https://github.com/subsquid-labs/soldexer) which contains example for a [DEx swaps on Solana](https://github.com/subsquid-labs/soldexer/blob/main/src/indexers/swaps.ts), [Metaplex NFT metada](https://github.com/subsquid-labs/soldexer/blob/main/src/indexers/metaplex.ts) or [pump.fun tokens](https://github.com/subsquid-labs/soldexer/blob/main/src/indexers/pumpfun.ts).
