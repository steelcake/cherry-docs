# blocks

Get block headers

## Output schema

- number: uint64 
- hash: string 
- parent_hash: string 
- nonce: string 
- logs_bloom: string 
- transactions_root: string
- state_root: string
- receipts_root: string
- miner: string
- difficulty: Decimal128(38, 0)
- total_difficulty: Decimal128(38, 0)
- extra_data: string
- size: Decimal128(38, 0)
- gas_limit: Decimal128(38, 0)
- gas_used: Decimal128(38, 0)
- timestamp: Decimal128(38, 0)
- uncles: list(binary)
- base_fee_per_gas: Decimal128(38, 0)
- withdrawals_root: string


This dataset idea is taken from [cryo](https://github.com/paradigmxyz/cryo).

