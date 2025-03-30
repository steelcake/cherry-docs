---
title: PyArrowDataset(Parquet)
description: Part of the Cherry documentation
---

# PyArrowDataset(Parquet)

See the documentation to learn more about [arrow datasets](https://arrow.apache.org/docs/python/dataset.html).

This is the writer you want if you just want a directory of parquet files.

## Config

```python
@dataclass
class PyArrowDatasetWriterConfig:
    base_dir: str
    basename_template: Optional[str] = None
    partitioning: Dict[str, pa_dataset.Partitioning | list[str]] = field(
        default_factory=dict
    )
    partitioning_flavor: Dict[str, str] = field(default_factory=dict)
    filesystem: Optional[pa_fs.FileSystem] = None
    file_options: Optional[pa_dataset.FileWriteOptions] = None
    use_threads: bool = True
    max_partitions: int = 1024
    max_open_files: int = 1024
    max_rows_per_file: int = 0
    min_rows_per_group: int = 0
    max_rows_per_group: int = 1024 * 1024
    create_dir: bool = True
    anchor_table: Optional[str] = None
```

See [pyarrow docs](https://arrow.apache.org/docs/python/generated/pyarrow.dataset.write_dataset.html#pyarrow.dataset.write_dataset) for more explanation about the parameters.

## Example

```python
from cherry_eth import config as cc

base_dir = "./data"

writer = cc.Writer(
    kind=cc.WriterKind.PYARROW_DATASET,
    config=cc.PyArrowDatasetWriterConfig(
        base_dir=base_dir,
    ),
)
```
