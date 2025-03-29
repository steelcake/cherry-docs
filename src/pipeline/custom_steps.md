# Writing Custom Steps

Custom steps can be specified like so:

```python
from cherry_etl import config as cc

cc.Step(
    kind=cc.StepKind.CUSTOM,
    config=cc.CustomStepConfig(
        runner=my_custom_step,
    ),
),
```

where `join_data` is an arbitrary python function with this signature:

```python
def my_custom_step(data: Dict[str, polars.DataFrame], _: Any) -> Dict[str, polars.DataFrame]:
    pass
```

This mechanism can be used to enrich the data with external sources like `eth_call` or `ipfs`.

It can also be used to just join the input tables like this:

```python
def join_data(data: Dict[str, polars.DataFrame], _: Any) -> Dict[str, polars.DataFrame]:
    blocks = data["blocks"]
    transfers = data["transfers"]

    bn = blocks.get_column("number")
    logger.info(f"processing data from: {bn.min()} to: {bn.max()}")

    blocks = blocks.select(
        polars.col("number").alias("block_number"),
        polars.col("timestamp").alias("block_timestamp"),
    )
    out = transfers.join(blocks, on="block_number")

    return {"transfers": out}
```
