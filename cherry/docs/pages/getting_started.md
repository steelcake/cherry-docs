---
title: Getting Started
description: Learn how to install and use Cherry for blockchain data pipelines
---

# Getting Started

This section explains how to install and use cherry.

::::steps

### 1. Installation
Choose your preferred package manager:

:::code-group
```bash [pip]
pip install cherry-etl cherry-core
```

```bash [uv]
uv add cherry-etl cherry-core
```
:::

:::tip
  The `uv` package manager offers significantly faster installation and dependency resolution than pip.
:::

### 2. Basic Imports
Import the necessary modules in your Python script:
```python [sync_data.py]
import cherry_etl
import cherry_core
from cherry_core import ingest
from cherry_etl import config as cc
from cherry_etl import datasets
from cherry_etl.pipeline import run_pipeline
import asyncio
import duckdb
```

### 3. Setup Database & Provider
Configure your data destination (e.g., DuckDB) and data source:

:::code-group
```python [DuckDB Example]
# Create in-memory duckdb database
db = duckdb.connect()

# Configure a data provider (replace with your actual provider)
provider = ingest.ProviderConfig(
    kind=ingest.ProviderKind.SQD,  # [!code focus]
    url="https://v2.archive.subsquid.io/network/ethereum-mainnet",  # [!code focus]
)

# Configure the writer
writer = cc.Writer(
    kind=cc.WriterKind.DUCKDB,  # [!code focus]
    config=cc.DuckdbWriterConfig(
        connection=db.cursor(),  # Use a cursor for thread safety!
    ),
)
```

```python [ClickHouse Example]
from clickhouse_driver import Client

# Connect to ClickHouse
client = Client(host='localhost')

# Configure a data provider
provider = ingest.ProviderConfig(
    kind=ingest.ProviderKind.HYPERSYNC,  # [!code focus]
    url="your-hypersync-url",  # [!code focus]
)

# Configure the writer
writer = cc.Writer(
    kind=cc.WriterKind.CLICKHOUSE,  # [!code focus]
    config=cc.ClickhouseWriterConfig(
        client=client,
        database="blockchain_data"
    ),
)
```
:::

<Callout type="warning">
  **Thread Safety**: When using DuckDB, do not pass a `duckdb.DuckDBPyConnection` directly if you are using it while the pipeline is running. It is **not** thread safe. Use `connection.cursor()` to create a cursor and pass that instead.
</Callout>

### 4. Define and Run Pipeline
Use a high-level dataset (like `blocks`) to create and execute the pipeline:
```python [sync_data.py]
async def sync_data():
    # Create the pipeline using the blocks dataset
    pipeline = datasets.evm.blocks(provider, writer, 18123123, 18123200)  # [!code focus]

    # Run the pipeline
    await run_pipeline(pipeline_name="blocks", pipeline=pipeline)  # [!code focus]

asyncio.run(sync_data())
```

<Callout type="note">
  For testing, it's recommended to use a small block range like above. For production, you can use larger ranges as Cherry handles batching internally.
</Callout>

### 5. Access Your Data
Query the data written to your destination:

:::code-group
```python [DuckDB Query]
data = db.sql("SELECT * FROM blocks ORDER BY number DESC LIMIT 10")
print(data)
```

```python [ClickHouse Query]
data = client.execute("SELECT * FROM blockchain_data.blocks ORDER BY number DESC LIMIT 10")
print(data)
```
:::

::::

## Next Steps

- Learn about different [Providers](/providers/) for data ingestion
- Explore various [Writers](/writers/) for data storage
- Check out pre-built [Datasets](/datasets/) for common use cases
- Learn about [crash resistance](/crash_resistance) for production deployments

<Callout type="success">
  Congratulations! You've set up your first Cherry data pipeline. Next, you can explore more complex datasets and customize your pipeline for your specific use case.
</Callout>

