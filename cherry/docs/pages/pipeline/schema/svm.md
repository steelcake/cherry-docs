---
title: Solana (SVM)
description: Part of the Cherry documentation
---

# Solana (SVM)

All providers return data according to this schema when queried using `ingest.svm.Query`.

[Source code](https://github.com/steelcake/cherry-core/blob/main/svm-schema/src/lib.rs)

## blocks
| Field Name   | Data Type     | Nullable |
|--------------|---------------|----------|
| slot         | `UInt64`      | Yes      |
| hash         | `Binary`      | Yes      |
| parent_slot  | `UInt64`      | Yes      |
| parent_hash  | `Binary`      | Yes      |
| height       | `UInt64`      | Yes      |
| timestamp    | `Int64`       | Yes      |

## rewards
| Field Name    | Data Type     | Nullable |
|---------------|---------------|----------|
| block_slot    | `UInt64`      | Yes      |
| block_hash    | `Binary`      | Yes      |
| pubkey        | `Binary`      | Yes      |
| lamports      | `Int64`       | Yes      |
| post_balance  | `UInt64`      | Yes      |
| reward_type   | `Utf8`        | Yes      |
| commission    | `UInt8`       | Yes      |

## token_balances
| Field Name       | Data Type     | Nullable |
|------------------|---------------|----------|
| block_slot       | `UInt64`      | Yes      |
| block_hash       | `Binary`      | Yes      |
| transaction_index| `UInt32`      | Yes      |
| account          | `Binary`      | Yes      |
| pre_mint         | `Binary`      | Yes      |
| post_mint        | `Binary`      | Yes      |
| pre_decimals     | `UInt16`      | Yes      |
| post_decimals    | `UInt16`      | Yes      |
| pre_program_id   | `Binary`      | Yes      |
| post_program_id  | `Binary`      | Yes      |
| pre_owner        | `Binary`      | Yes      |
| post_owner       | `Binary`      | Yes      |
| pre_amount       | `UInt64`      | Yes      |
| post_amount      | `UInt64`      | Yes      |

## balances
| Field Name       | Data Type     | Nullable |
|------------------|---------------|----------|
| block_slot       | `UInt64`      | Yes      |
| block_hash       | `Binary`      | Yes      |
| transaction_index| `UInt32`      | Yes      |
| account          | `Binary`      | Yes      |
| pre              | `UInt64`      | Yes      |
| post             | `UInt64`      | Yes      |

## logs
| Field Name             | Data Type     | Nullable |
|------------------------|---------------|----------|
| block_slot             | `UInt64`      | Yes      |
| block_hash             | `Binary`      | Yes      |
| transaction_index      | `UInt32`      | Yes      |
| log_index              | `UInt32`      | Yes      |
| instruction_address    | `List(UInt32)`| Yes      |
| program_id             | `Binary`      | Yes      |
| kind                   | `Utf8`        | Yes      |
| message                | `Utf8`        | Yes      |

## transactions
| Field Name                   | Data Type             | Nullable |
|------------------------------|-----------------------|----------|
| block_slot                   | `UInt64`              | Yes      |
| block_hash                   | `Binary`              | Yes      |
| transaction_index            | `UInt32`              | Yes      |
| signature                    | `Binary`              | Yes      |
| version                      | `Int8`                | Yes      |
| account_keys                 | `List(Binary)`        | Yes      |
| address_table_lookups        | `List(Struct(account_key: Binary, writable_indexes: List(UInt64), readonly_indexes: List(UInt64)))` | Yes      |
| num_readonly_signed_accounts | `UInt32`              | Yes      |
| num_readonly_unsigned_accounts| `UInt32`             | Yes      |
| num_required_signatures      | `UInt32`              | Yes      |
| recent_blockhash            | `Binary`              | Yes      |
| signatures                  | `List(Binary)`        | Yes      |
| err                         | `Utf8`                | Yes      |
| fee                         | `UInt64`              | Yes      |
| compute_units_consumed      | `UInt64`              | Yes      |
| loaded_readonly_addresses   | `List(Binary)`        | Yes      |
| loaded_writable_addresses   | `List(Binary)`        | Yes      |
| fee_payer                   | `Binary`              | Yes      |
| has_dropped_log_messages    | `Boolean`             | Yes      |

## instructions
| Field Name             | Data Type     | Nullable |
|------------------------|---------------|----------|
| block_slot             | `UInt64`      | Yes      |
| block_hash             | `Binary`      | Yes      |
| transaction_index      | `UInt32`      | Yes      |
| instruction_address    | `List(UInt32)`| Yes      |
| program_id             | `Binary`      | Yes      |
| a0                     | `Binary`      | Yes      |
| a1                     | `Binary`      | Yes      |
| a2                     | `Binary`      | Yes      |
| a3                     | `Binary`      | Yes      |
| a4                     | `Binary`      | Yes      |
| a5                     | `Binary`      | Yes      |
| a6                     | `Binary`      | Yes      |
| a7                     | `Binary`      | Yes      |
| a8                     | `Binary`      | Yes      |
| a9                     | `Binary`      | Yes      |
| rest_of_accounts       | `List(Binary)`| Yes      |
| data                   | `Binary`      | Yes      |
| d1                     | `Binary`      | Yes      |
| d2                     | `Binary`      | Yes      |
| d4                     | `Binary`      | Yes      |
| d8                     | `Binary`      | Yes      |
| error                  | `Utf8`        | Yes      |
| compute_units_consumed | `UInt64`      | Yes      |
| is_committed           | `Boolean`     | Yes      |
| has_dropped_log_messages| `Boolean`    | Yes      |
