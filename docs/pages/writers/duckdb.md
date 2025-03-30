---
title: DuckDB
description: Part of the Cherry documentation
---

# DuckDB

We highly recommend duckdb for development and testing as it is very solid and easy to use.

Read their [python docs](https://duckdb.org/docs/stable/clients/python/overview.html)

## Config

```python
@dataclass
class DuckdbWriterConfig:
    connection: duckdb.DuckDBPyConnection
```

:::warning
**Thread Safety**: When using DuckDB, do not pass a `duckdb.DuckDBPyConnection` directly if you are using it while the pipeline is running. It is **not** thread safe. Use `connection.cursor()` to create a cursor and pass that instead.
:::

## Example

```python
# create an in-memory duckdb database
connection = duckdb.connect()

writer = cc.Writer(
    kind=cc.WriterKind.DUCKDB,
    config=cc.DuckdbWriterConfig(
        connection=connection.cursor(),
    ),
)
```