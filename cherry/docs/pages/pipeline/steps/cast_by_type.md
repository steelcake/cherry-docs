---
title: CastByType Step
description: Cast fields based on their current type
---

# CastByType

Cast fields to different types based on their current type.

## Configuration

```python
@dataclass
class CastByTypeConfig:
    tables: Optional[list[str]] = None
    type_map: dict[str, str]
```

## Parameters

:::info
- `tables`: Optional list of table names to apply casting. If not specified (None), all tables will be processed.
- `type_map`: Dictionary mapping source types to target types.
:::

## Example

```python
from cherry_etl import config as cc

# Cast all uint256 fields to uint64 in all tables
step = cc.Step(
    kind=cc.StepKind.CAST_BY_TYPE,
    config=cc.CastByTypeConfig(
        type_map={
            "uint256": "uint64"
        }
    ),
)

# Cast only in specific tables
step = cc.Step(
    kind=cc.StepKind.CAST_BY_TYPE,
    config=cc.CastByTypeConfig(
        tables=["transactions", "logs"],
        type_map={
            "uint256": "uint64",
            "binary": "string"
        }
    ),
)
``` 