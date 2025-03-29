---
title: DeltaLake
description: Part of the Cherry documentation
---

# DeltaLake

## Config

```python
@dataclass
class DeltaLakeWriterConfig:
    data_uri: str
    partition_by: Dict[str, list[str]] = field(default_factory=dict)
    storage_options: Optional[Dict[str, str]] = None
    writer_properties: Optional[deltalake.WriterProperties] = None
    anchor_table: Optional[str] = None
```

`Dict[str, _]` fields generally mean config per table name for example partition_by["my_table"] would give list of columns to partition the `my_table` table by.

## Example

data_uri = "./data"

```python
writer = cc.Writer(
    kind=cc.WriterKind.DELTA_LAKE,
    config=cc.DeltaLakeWriterConfig(
        data_uri=data_uri,
    ),
)
```

## Anchor table

All tables are written in parallel but anchor table is written seperately so it can be used to implement `crash-resistance`.

