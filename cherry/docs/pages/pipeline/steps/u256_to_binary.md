---
title: U256ToBinary Step
description: Convert uint256 fields to binary format
---

# U256ToBinary

Convert uint256 fields to binary format for more efficient storage.

## Configuration

```python
@dataclass
class U256ToBinaryConfig:
    tables: Optional[list[str]] = None
```

## Parameters

:::info
- `tables`: Optional list of table names to convert. If not specified (None), all tables will be processed.
:::

## Example

```python
from cherry_etl import config as cc

# Convert all uint256 fields in all tables
step = cc.Step(
    kind=cc.StepKind.U256_TO_BINARY,
    config=cc.U256ToBinaryConfig(),
)

# Convert only specific tables
step = cc.Step(
    kind=cc.StepKind.U256_TO_BINARY,
    config=cc.U256ToBinaryConfig(
        tables=["transactions", "logs"]
    ),
)
```

## Notes

This step is useful for optimizing storage of large numbers in binary format. The binary format uses 32 bytes (256 bits) to store each number, which is more efficient than storing them as strings or decimal numbers. 