# Ethereum (EVM)

All providers return data according to this schema when queried using `ingest.evm.Query`.

[source code](https://github.com/steelcake/cherry-core/blob/main/evm-schema/src/lib.rs).

## blocks

| Field Name                  | Data Type                          | Nullable |
|-----------------------------|------------------------------------|----------|
| `number`                    | `UInt64`                           | Yes      |
| `hash`                      | `Binary`                           | Yes      |
| `parent_hash`               | `Binary`                           | Yes      |
| `nonce`                     | `Binary`                           | Yes      |
| `sha3_uncles`               | `Binary`                           | Yes      |
| `logs_bloom`                | `Binary`                           | Yes      |
| `transactions_root`         | `Binary`                           | Yes      |
| `state_root`                | `Binary`                           | Yes      |
| `receipts_root`             | `Binary`                           | Yes      |
| `miner`                     | `Binary`                           | Yes      |
| `difficulty`                | `Decimal256(76, 0)`                | Yes      |
| `total_difficulty`          | `Decimal256(76, 0)`                | Yes      |
| `extra_data`                | `Binary`                           | Yes      |
| `size`                      | `Decimal256(76, 0)`                | Yes      |
| `gas_limit`                 | `Decimal256(76, 0)`                | Yes      |
| `gas_used`                  | `Decimal256(76, 0)`                | Yes      |
| `timestamp`                 | `Decimal256(76, 0)`                | Yes      |
| `uncles`                    | `List(Binary)`                     | Yes      |
| `base_fee_per_gas`          | `Decimal256(76, 0)`                | Yes      |
| `blob_gas_used`             | `Decimal256(76, 0)`                | Yes      |
| `excess_blob_gas`           | `Decimal256(76, 0)`                | Yes      |
| `parent_beacon_block_root`  | `Binary`                           | Yes      |
| `withdrawals_root`          | `Binary`                           | Yes      |
| `withdrawals`               | `List(Struct(index: UInt64, validator_index: UInt64, address: Binary, amount: Decimal256(76, 0)))` | Yes      |
| `l1_block_number`           | `UInt64`                           | Yes      |
| `send_count`                | `Decimal256(76, 0)`                | Yes      |
| `send_root`                 | `Binary`                           | Yes      |
| `mix_hash`                  | `Binary`                           | Yes      |

## transactions

| Field Name                  | Data Type                          | Nullable |
|-----------------------------|------------------------------------|----------|
| `block_hash`                | `Binary`                           | Yes      |
| `block_number`              | `UInt64`                           | Yes      |
| `from`                       | `Binary`                           | Yes      |
| `gas`                        | `Decimal256(76, 0)`                | Yes      |
| `gas_price`                 | `Decimal256(76, 0)`                | Yes      |
| `hash`                       | `Binary`                           | Yes      |
| `input`                      | `Binary`                           | Yes      |
| `nonce`                      | `Decimal256(76, 0)`                | Yes      |
| `to`                         | `Binary`                           | Yes      |
| `transaction_index`         | `UInt64`                           | Yes      |
| `value`                      | `Decimal256(76, 0)`                | Yes      |
| `v`                          | `UInt8`                            | Yes      |
| `r`                          | `Binary`                           | Yes      |
| `s`                          | `Binary`                           | Yes      |
| `max_priority_fee_per_gas`  | `Decimal256(76, 0)`                | Yes      |
| `max_fee_per_gas`           | `Decimal256(76, 0)`                | Yes      |
| `chain_id`                  | `Decimal256(76, 0)`                | Yes      |
| `cumulative_gas_used`       | `Decimal256(76, 0)`                | Yes      |
| `effective_gas_price`       | `Decimal256(76, 0)`                | Yes      |
| `gas_used`                  | `Decimal256(76, 0)`                | Yes      |
| `contract_address`          | `Binary`                           | Yes      |
| `logs_bloom`                | `Binary`                           | Yes      |
| `type`                       | `UInt8`                            | Yes      |
| `root`                       | `Binary`                           | Yes      |
| `status`                     | `UInt8`                            | Yes      |
| `sighash`                    | `Binary`                           | Yes      |
| `y_parity`                   | `Boolean`                          | Yes      |
| `access_list`               | `List(Struct(address: Binary, storage_keys: List(Binary)))` | Yes      |
| `l1_fee`                    | `Decimal256(76, 0)`                | Yes      |
| `l1_gas_price`              | `Decimal256(76, 0)`                | Yes      |
| `l1_gas_used`               | `Decimal256(76, 0)`                | Yes      |
| `l1_fee_scalar`             | `Decimal256(76, 0)`                | Yes      |
| `gas_used_for_l1`           | `Decimal256(76, 0)`                | Yes      |
| `max_fee_per_blob_gas`      | `Decimal256(76, 0)`                | Yes      |
| `blob_versioned_hashes`     | `List(Binary)`                     | Yes      |
| `deposit_nonce`             | `Decimal256(76, 0)`                | Yes      |
| `blob_gas_price`            | `Decimal256(76, 0)`                | Yes      |
| `deposit_receipt_version`   | `Decimal256(76, 0)`                | Yes      |
| `blob_gas_used`             | `Decimal256(76, 0)`                | Yes      |
| `l1_base_fee_scalar`        | `Decimal256(76, 0)`                | Yes      |
| `l1_blob_base_fee`          | `Decimal256(76, 0)`                | Yes      |
| `l1_blob_base_fee_scalar`   | `Decimal256(76, 0)`                | Yes      |
| `l1_block_number`           | `UInt64`                           | Yes      |
| `mint`                       | `Decimal256(76, 0)`                | Yes      |
| `source_hash`               | `Binary`                           | Yes      |

## logs

| Field Name                  | Data Type                          | Nullable |
|-----------------------------|------------------------------------|----------|
| `removed`                   | `Boolean`                          | Yes      |
| `log_index`                 | `UInt64`                           | Yes      |
| `transaction_index`         | `UInt64`                           | Yes      |
| `transaction_hash`          | `Binary`                           | Yes      |
| `block_hash`                | `Binary`                           | Yes      |
| `block_number`              | `UInt64`                           | Yes      |
| `address`                   | `Binary`                           | Yes      |
| `data`                       | `Binary`                           | Yes      |
| `topic0`                     | `Binary`                           | Yes      |
| `topic1`                     | `Binary`                           | Yes      |
| `topic2`                     | `Binary`                           | Yes      |
| `topic3`                     | `Binary`                           | Yes      |

## traces

| Field Name                  | Data Type                          | Nullable |
|-----------------------------|------------------------------------|----------|
| `from`                       | `Binary`                           | Yes      |
| `to`                         | `Binary`                           | Yes      |
| `call_type`                 | `Utf8`                             | Yes      |
| `gas`                        | `Decimal256(76, 0)`                | Yes      |
| `input`                      | `Binary`                           | Yes      |
| `init`                       | `Binary`                           | Yes      |
| `value`                      | `Decimal256(76, 0)`                | Yes      |
| `author`                     | `Binary`                           | Yes      |
| `reward_type`               | `Utf8`                             | Yes      |
| `block_hash`                | `Binary`                           | Yes      |
| `block_number`              | `UInt64`                           | Yes      |
| `address`                    | `Binary`                           | Yes      |
| `code`                       | `Binary`                           | Yes      |
| `gas_used`                   | `Decimal256(76, 0)`                | Yes      |
| `output`                     | `Binary`                           | Yes      |
| `subtraces`                  | `UInt64`                           | Yes      |
| `trace_address`             | `List(UInt64)`                     | Yes      |
| `transaction_hash`          | `Binary`                           | Yes      |
| `transaction_position`      | `UInt64`                           | Yes      |
| `type`                       | `Utf8`                             | Yes      |
| `error`                      | `Utf8`                             | Yes      |
| `sighash`                    | `Binary`                           | Yes      |
| `action_address`            | `Binary`                           | Yes      |
| `balance`                    | `Decimal256(76, 0)`                | Yes      |
| `refund_address`            | `Binary`                           | Yes      |

