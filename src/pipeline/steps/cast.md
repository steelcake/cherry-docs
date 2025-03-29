# Cast

Cast columns to specified arrow types.

```python
@dataclass
class CastConfig:
    table_name: str
    mappings: Dict[str, pa.DataType]
    safe: Optional[bool] = None
    options: Optional[pa_compute.CastOptions] = None
```

See pyarrow cast function [documentation](https://arrow.apache.org/docs/python/generated/pyarrow.compute.cast.html) for more info about the parameters.

## Example

Cast `transfers.block_timestamp` to `int64` type.

```python
from cherry_etl import config as cc

cc.Step(
    kind=cc.StepKind.CAST,
    config=cc.CastConfig(
        table_name="transfers",
        mappings={"block_timestamp": pa.int64()},
    ),
),
```
