---
title: Datasets
description: Pre-built, high-level abstractions for extracting common blockchain data
---

# Datasets

Datasets are pre-built, high-level abstractions that make it easy to extract common blockchain data. They are implemented as helper functions that construct complete `Pipeline` objects with predefined schemas and transformations.

## Available Datasets

### Ethereum (EVM) Datasets

| Dataset | Description | Use Cases |
|---------|-------------|-----------|
| [Blocks](/datasets/evm/blocks) | Extract block headers and metadata | Block analysis, network statistics, gas analysis |
| [Address Appearances](/datasets/evm/address_appearances) | Track all address appearances in traces | Contract interactions, address relationships, contract creation tracking |
| [All Contracts](/datasets/evm/all_contracts) | Information about all contracts | Contract deployment analysis |

### Solana (SVM) Datasets

| Dataset | Description | Use Cases |
|---------|-------------|-----------|
| [Token Balances](/datasets/svm/token_balances) | Track token account balances | Token holdings, transfers, token program analysis |

## Usage Pattern

All datasets follow a similar usage pattern:

```python
from cherry_etl import datasets
from cherry_etl.pipeline import run_pipeline

# Create a pipeline using a dataset
pipeline = datasets.evm.blocks(  # or any other dataset
    provider=provider,
    writer=writer,
    from_block=18123123,  # or from_slot for Solana
    to_block=18123200     # or to_slot for Solana
)

# Run the pipeline
await run_pipeline(pipeline_name="dataset_name", pipeline=pipeline)
```

## Common Features

:::tip
All datasets share these common features:
- **Predefined Schemas**: Each dataset has a well-defined output schema
- **Optimized Performance**: Leverages Rust-based core components
- **Parallel Processing**: Data ingestion and processing happen in parallel
- **Crash Resistance**: Built-in support for crash recovery
- **Continuous Ingestion**: Can keep datasets fresh with continuous updates
:::

## Data Providers

Datasets work with any supported data provider:

- **EVM Chains**: HyperSync, SQD
- **Solana**: SQD (beta), Yellowstone-GRPC

## Output Formats

:::info
Datasets can write to any supported output format:
- ClickHouse
- Iceberg
- Deltalake
- DuckDB
- Arrow Datasets
- Parquet
:::

## Supported Formats

:::info
Datasets can write to any supported output format:
- ClickHouse
- Iceberg
- Deltalake
- DuckDB
- Arrow Datasets
- Parquet
:::

## Writing Custom Datasets

While the built-in datasets cover common use cases, you can also create custom datasets by:

1. Defining your schema
2. Creating transformation steps
3. Building a pipeline configuration

See the [Writing Custom Pipelines](/pipeline/) section for more details.

## Notes

- Datasets are inspired by [cryo](https://github.com/paradigmxyz/cryo)
- Each dataset is optimized for its specific use case
- Datasets handle all the complexity of data extraction and transformation
- You can combine datasets with custom pipeline steps for advanced use cases

