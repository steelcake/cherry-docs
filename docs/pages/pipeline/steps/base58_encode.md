---
title: Base58Encode Step
description: Encode binary fields as Solana-style base58
---

# Base58Encode

Encode all binary fields as Solana (Bitcoin) style base58.

## Configuration

```python
@dataclass
class Base58EncodeConfig:
    tables: Optional[list[str]] = None
```

## Parameters

:::info
- `tables`: Optional list of table names to encode. If not specified (None), all tables will be encoded.
:::

## Example

```python
from cherry_etl import config as cc

# Encode all binary fields in all tables
step = cc.Step(
    kind=cc.StepKind.BASE58_ENCODE,
    config=cc.Base58EncodeConfig(),
)

# Encode only specific tables
step = cc.Step(
    kind=cc.StepKind.BASE58_ENCODE,
    config=cc.Base58EncodeConfig(
        tables=["transactions", "logs"]
    ),
)
``` 