# Getting Started

This section explains how to install and use cherry.

## Installation 

Cherry is published to PyPI as [cherry-etl](https://pypi.org/project/cherry-etl/).

Core tooling that is used with cherry is published as [cherry-core](https://pypi.org/project/cherry-core/).

You can add it to your python project like this:

```bash
pip install cherry-etl cherry-core
```

Or if you are using [uv](https://docs.astral.sh/uv/):

```bash
uv add cherry-etl cherry-core
```

Import it in your python scripts like this:
```python
import cherry_etl
import cherry_core
```

## Using `datasets`

Easiest way to start using cherry is to use the `datasets` feature. `datasets` make creating
pipelines easy.

There are datasets for both `svm` and `evm` under the `cherry_etl.datasets` module

```python
from cherry_core import ingest
from cherry_etl import config as cc
from cherry_etl import datasets
from cherry_etl.pipeline import run_pipeline
import asyncio
import duckdb

# create in-memory duckdb database
db = duckdb.connect()

async def sync_data():
    # configure a data provider
    # See Providers section
    provider = ingest.ProviderConfig(
        kind=provider_kind,
        url=provider_url,
    )

    # write data to duckdb
    writer = cc.Writer(
        kind=cc.WriterKind.DUCKDB,
        config=cc.DuckdbWriterConfig(
            connection=db.cursor(),
        ),
    )

    # Create the pipeline using the blocks dataset
    pipeline = datasets.evm.blocks(provider, writer, 18123123, 18123200)

    # Run the pipeline
    await run_pipeline(pipeline_name="blocks", pipeline=pipeline)

asyncio.run(sync_data())

data = connection.sql("SELECT * FROM blocks LIMIT 20")
print(data)
```

[Here is the full example](https://github.com/steelcake/cherry/blob/main/examples/datasets/eth/blocks.py)

[Other datasets examples](https://github.com/steelcake/cherry/tree/main/examples/datasets)


## Writing custom pipelines

Cherry is able to do much more than just the `datasets` API.

Read the [writing custom pipelines section](./pipeline/index.html).

