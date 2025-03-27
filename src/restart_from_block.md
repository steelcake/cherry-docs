# Starting from where you left off

Since the pipeline is created purely in python at runtime. It is possible to set from_block parameter
programatically.

For example when using `duckdb`, you can create a function like this to get last written block:

```python
def get_start_block(con: duckdb.DuckDBPyConnection) -> int:
    try:
        res = con.sql("SELECT MAX(block_number) from my_table").fetchone()
        if res is not None:
            return int(res[0])
        else:
            return 0
    except Exception:
        print(f"failed to get start block from db: {traceback.format_exc()}")
        return 0
```

Then you can use it like this when creating the pipeline object:

```python
pipeline = datasets.evm.blocks(
    provider,
    writer,
    from_block=get_start_block(duckdb_connection),
    to_block
)
```
