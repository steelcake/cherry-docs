# ClickHouse

# Config

```python
@dataclass
class ClickHouseWriterConfig:
    client: ClickHouseClient
    codec: Dict[str, Dict[str, str]] = field(default_factory=dict)
    order_by: Dict[str, List[str]] = field(default_factory=dict)
    engine: str = "MergeTree()"
    skip_index: Dict[str, List[ClickHouseSkipIndex]] = field(default_factory=dict)
    anchor_table: Optional[str] = None
```

`Dict[str, _]` fields generally mean config per table name for example codec["my_table"]["my_column"] would give the codec to use for my_column column of my_table table.

# Example

```python
from cherry_etl import config as cc

clickhouse_client = await clickhouse_connect.get_async_client(
    host=os.environ.get("CLICKHOUSE_HOST", "localhost"),
    port=int(os.environ.get("CLICKHOUSE_PORT", "8123")),
    username=os.environ.get("CLICKHOUSE_USER", "default"),
    password=os.environ.get("CLICKHOUSE_PASSWORD", "clickhouse"),
    database=os.environ.get("CLICKHOUSE_DATABASE", "blockchain"),
)

writer = cc.Writer(
    kind=cc.WriterKind.CLICKHOUSE,
    config=cc.ClickHouseWriterConfig(
        client=clickhouse_client,
        order_by={"transfers": ["block_number"]},
        codec={"transfers": {"data": "ZSTD"}},
        skip_index={
            "transfers": [
                cc.ClickHouseSkipIndex(
                    name="log_addr_idx",
                    val="address",
                    type_="bloom_filter(0.01)",
                    granularity=1,
                ),
                cc.ClickHouseSkipIndex(
                    name="from_addr_idx",
                    val="from",
                    type_="bloom_filter(0.01)",
                    granularity=1,
                ),
                cc.ClickHouseSkipIndex(
                    name="to_addr_idx",
                    val="to",
                    type_="bloom_filter(0.01)",
                    granularity=1,
                ),
            ]
        },
    ),
)
```

# Anchor table

All tables are written in parallel but anchor table is written seperately so it can be used to implement `crash-resistance`.

