# All Contracts Dataset

The all_contracts dataset track all contracts ever created on any EVM chains, including their creation details. This dataset is essential for analyzing contract deployments.

## Usage

```python
from cherry_etl import datasets
from cherry_etl.pipeline import run_pipeline

# Create a pipeline for all contracts
pipeline = datasets.evm.all_contracts(
    provider=provider,
    writer=writer,
    from_block=18123123,  # Starting block number
    to_block=18123200     # Ending block number
)

# Run the pipeline
await run_pipeline(pipeline_name="all_contracts", pipeline=pipeline)
```

## Output Schema

| Field | Type | Description |
|-------|------|-------------|
| block_number | uint64 | Block number where the contract was created |
| transaction_hash | binary | Hash of the transaction that created the contract |
| address | binary | The contract's address |

## Example Queries

### Find Contracts Created by a Specific Address

```sql
SELECT 
    block_number,
    transaction_hash,
    address as contract_address
FROM all_contracts
ORDER BY block_number DESC
LIMIT 10;
```

### Get Contract Creation Statistics

```sql
SELECT 
    COUNT(*) as contracts_created,
FROM all_contracts
```

## Notes

- This dataset captures all contract creations on any EVM chain
- The dataset includes both contract creation transactions and contract creation through internal transactions
- This dataset is particularly useful for:
  - Tracking contract deployments
  - Analyzing contract creation patterns
  - Identifying contract factories
  - Monitoring contract ecosystem growth
