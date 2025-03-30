---
title: HexEncode Step
description: Encode binary fields as hex strings
---

# HexEncode

Encode binary fields as hex strings with optional "0x" prefix.

## Configuration

```python
@dataclass
class HexEncodeConfig:
    tables: Optional[list[str]] = None
    prefix: bool = True
```

## Parameters

:::info
- `tables`: Optional list of table names to encode. If not specified (None), all tables will be encoded.
- `prefix`: Whether to add "0x" prefix to encoded strings. Defaults to True.
:::

## Example

```python
from cherry_etl import config as cc

# Encode all binary fields in all tables with 0x prefix
step = cc.Step(
    kind=cc.StepKind.HEX_ENCODE,
    config=cc.HexEncodeConfig(),
)

# Encode specific tables without prefix
step = cc.Step(
    kind=cc.StepKind.HEX_ENCODE,
    config=cc.HexEncodeConfig(
        tables=["transactions", "logs"],
        prefix=False
    ),
)
``` 