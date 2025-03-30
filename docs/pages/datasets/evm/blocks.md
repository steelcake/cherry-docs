---
title: Blocks Dataset
description: Extract block headers from any EVM chain
---

# Blocks Dataset

The blocks dataset allows you to extract block headers from any EVM chain. This is one of the most fundamental datasets for blockchain analysis.

## Usage

```python
from cherry_etl import datasets
from cherry_etl.pipeline import run_pipeline

# Create a pipeline for blocks
pipeline = datasets.evm.blocks(
    provider=provider,
    writer=writer,
    from_block=18123123,  # Starting block number
    to_block=18123200     # Ending block number
)

# Run the pipeline
await run_pipeline(pipeline_name="blocks", pipeline=pipeline)
```

## Schema Overview

| Field | Type | Description |
|-------|------|-------------|
| number | uint64 | Block number |
| hash | string | Block hash |
| parent_hash | string | Hash of the parent block |
| nonce | string | Block nonce |
| logs_bloom | string | Bloom filter for logs |
| transactions_root | string | Merkle root of transactions |
| state_root | string | Merkle root of state |
| receipts_root | string | Merkle root of receipts |
| miner | string | Address of the block miner |
| difficulty | Decimal128(38, 0) | Block difficulty |
| total_difficulty | Decimal128(38, 0) | Cumulative difficulty |
| extra_data | string | Extra data field |
| size | Decimal128(38, 0) | Block size in bytes |
| gas_limit | Decimal128(38, 0) | Gas limit for the block |
| gas_used | Decimal128(38, 0) | Gas used in the block |
| timestamp | Decimal128(38, 0) | Block timestamp |
| uncles | list(binary) | List of uncle block hashes |
| base_fee_per_gas | Decimal128(38, 0) | Base fee per gas (EIP-1559) |
| withdrawals_root | string | Root hash of withdrawals (Shanghai upgrade) |

## Example Queries

### Get Latest Block

```sql
SELECT * FROM blocks ORDER BY number DESC LIMIT 1;
```

### Get Blocks in a Time Range

```sql
SELECT * FROM blocks 
WHERE timestamp BETWEEN 1704067200 AND 1704153600;  -- Last 24 hours
```

### Get Block Statistics

```sql
SELECT 
    MIN(number) as first_block,
    MAX(number) as last_block,
    AVG(gas_used) as avg_gas_used,
    AVG(size) as avg_block_size
FROM blocks;
```

:::note
- The dataset includes all fields from EVM block header
- Timestamps are in Unix timestamp format
- The `base_fee_per_gas` field is only available for blocks after the London hard fork (EIP-1559)
- The `withdrawals_root` field is only available for blocks after the Shanghai upgrade
:::

:::note
This dataset idea is taken from [cryo](https://github.com/paradigmxyz/cryo).
:::

