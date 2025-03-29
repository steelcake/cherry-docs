---
title: Writers
description: Part of the Cherry documentation
---

# Writers

Writers control how data is written to the output after it is ingested from the provider and processed by the configured steps.

## Supported output formats

- **ClickHouse**
- **Iceberg**
- **Deltalake**
- **DuckDB** 
- **Arrow Datasets**
- **Parquet**

# Full Writer configuration API

```python
class WriterKind(str, Enum):
    CLICKHOUSE = "clickhouse"
    ICEBERG = "iceberg"
    DELTA_LAKE = "delta_lake"
    PYARROW_DATASET = "pyarrow_dataset"
    DUCKDB = "duckdb"

@dataclass
class Writer:
    kind: WriterKind
    config: (
        ClickHouseWriterConfig
        | IcebergWriterConfig
        | DeltaLakeWriterConfig
        | PyArrowDatasetWriterConfig
        | DuckdbWriterConfig
    )
```

See specific writer pages to learn more about your writer of choice.

If you don't have a choice, we highly recommend duckdb for development and testing as it is very solid and easy to use.

