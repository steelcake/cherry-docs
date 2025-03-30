---
title: Steps
description: Pipeline steps for modifying data
---

# Steps

Steps are run between the provider and writer to modify the data or do other arbitrary actions.

There are built-in steps that can be configured and there is a mechanism to write custom steps which enables running arbitrary python code on the data as a part of the pipeline.

## Built-in Steps

:::tip
Cherry provides several built-in steps for common data transformations:

- [Base58Encode](/pipeline/steps/base58_encode) - Encode binary fields as Solana-style base58
- [Cast](/pipeline/steps/cast) - Cast columns to specified Arrow types
- [CastByType](/pipeline/steps/cast_by_type) - Cast all columns of one type to another
- [EvmDecodeEvents](/pipeline/steps/evm_decode_events) - Decode EVM events using signatures
- [HexEncode](/pipeline/steps/hex_encode) - Encode binary fields as hex strings
- [U256ToBinary](/pipeline/steps/u256_to_binary) - Convert Decimal256 columns to binary
:::

## Available Steps

:::tip Built-in Steps
Cherry provides several built-in steps for common data transformations:

- [Base58Encode](/pipeline/steps/base58_encode) - Encode binary fields as Solana-style base58
- [Cast](/pipeline/steps/cast) - Cast columns to specified Arrow types
- [CastByType](/pipeline/steps/cast_by_type) - Cast all columns of one type to another
- [EvmDecodeEvents](/pipeline/steps/evm_decode_events) - Decode EVM events using signatures
- [HexEncode](/pipeline/steps/hex_encode) - Encode binary fields as hex strings
- [U256ToBinary](/pipeline/steps/u256_to_binary) - Convert Decimal256 columns to binary
::: 