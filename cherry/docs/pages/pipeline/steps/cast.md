---
title: Cast Step
description: Cast fields to different types
---

# Cast

Cast fields to different types based on configuration.

## Configuration

```python
@dataclass
class CastConfig:
    tables: dict[str, dict[str, str]]
```

## Parameters

:::info
- `tables`: Dictionary mapping table names to field casting configurations. Each table configuration is a dictionary mapping field names to their target types.
:::

## Example

```python
from cherry_etl import config as cc

step = cc.Step(
    kind=cc.StepKind.CAST,
    config=cc.CastConfig(
        tables={
            "transactions": {
                "value": "uint256",
                "gas_price": "uint256",
            }
        }
    ),
)
``` 