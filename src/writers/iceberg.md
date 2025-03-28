# Iceberg

## Config

```python
from pyiceberg.catalog import Catalog as IcebergCatalog

@dataclass
class IcebergWriterConfig:
    namespace: str
    catalog: IcebergCatalog
    write_location: str
```

See [pyiceberg docs](https://py.iceberg.apache.org/).


## Example

```python
from cherry_etl import config as cc
from pyiceberg.catalog.sql import SqlCatalog

catalog = SqlCatalog(
    name="cherry",
    uri="postgresql+psycopg2://postgres:postgres@localhost/iceberg",
    warehouse="s3://blockchain-data",
    **{
        "s3.endpoint": "http://localhost:9000",
        "s3.access-key-id": "minioadmin",
        "s3.secret-access-key": "minioadmin",
    },
)

writer = cc.Writer(
    kind=cc.WriterKind.ICEBERG,
    config=cc.IcebergWriterConfig(
        namespace="my_namespace",
        catalog=catalog,
        write_location="s3://blockchain-data/",
    ),
)
```

