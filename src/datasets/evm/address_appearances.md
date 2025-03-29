# Address Appearances Dataset

The address appearances dataset tracks all occurrences of addresses in transaction traces, including their relationships to the transactions. This is useful for analyzing address interactions, contract creations, and address relationships in the blockchain.

## Usage

```python
from cherry_etl import datasets
from cherry_etl.pipeline import run_pipeline

# Create a pipeline for address appearances
pipeline = datasets.evm.address_appearances(
    provider=provider,
    writer=writer,
    from_block=18123123,  # Starting block number
    to_block=18123200     # Ending block number
)

# Run the pipeline
await run_pipeline(pipeline_name="address_appearances", pipeline=pipeline)
```

## Output Schema

| Field | Type | Description |
|-------|------|-------------|
| block_number | uint64 | Block number where the address appeared |
| block_hash | binary | Hash of the block |
| transaction_hash | binary | Hash of the transaction |
| address | binary | The address that appeared |
| relationship | string | The relationship of the address to the trace. Possible values: |
| | | - `call_from`: Address that initiated the call |
| | | - `call_to`: Address that received the call |
| | | - `factory`: Contract factory address |
| | | - `suicide`: Address that was self-destructed |
| | | - `suicide_refund`: Address that received refund from self-destruct |
| | | - `author`: Address that authored the block |
| | | - `create`: Address that was created |

## Example Queries

### Find All Contract Creations by an Address
```sql
SELECT 
    block_number,
    transaction_hash,
    address as created_contract
FROM address_appearances
WHERE relationship = 'create'
    AND address = '0x...';  -- Replace with the address you're interested in
```

### Get Address Interaction Timeline
```sql
SELECT 
    block_number,
    transaction_hash,
    relationship,
    address
FROM address_appearances
WHERE address = '0x...'  -- Replace with the address you're interested in
ORDER BY block_number, transaction_hash;
```

### Count Address Relationships
```sql
SELECT 
    relationship,
    COUNT(*) as count
FROM address_appearances
WHERE address = '0x...'  -- Replace with the address you're interested in
GROUP BY relationship;
```

## Notes

- The dataset requires trace data from the blockchain
- The dataset captures all address appearances in transaction traces, including:
  - Direct calls between contracts
  - Contract creations
  - Self-destruct operations
  - Block author addresses
- This dataset is particularly useful for:
  - Tracking contract interactions
  - Analyzing address relationships
  - Monitoring contract creation patterns
  - Understanding address behavior in the blockchain
