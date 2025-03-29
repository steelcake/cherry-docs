# Cast

Cast columns to specified arrow types.

```python
@dataclass
class CastConfig:
    table_name: str
    mappings: Dict[str, pa.DataType]
    allow_decode_fail: bool = False
```

When `allow_decode_fail` is set to `True`, this step will write `null` if it fails to cast a value instead of erroring out.

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
