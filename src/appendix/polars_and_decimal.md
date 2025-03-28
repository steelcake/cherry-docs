# Polars and Decimal types (UInt256)

Note: This section is irrelevant if you are using `datasets` since datasets handle this internally.

Polars doesn't properly support Decimal256 type yet so it is not possible to work with ethereum uint256 values natively. We prefer to cast these values to Decimal128 if possible,
we cast it to binary or string if it doesn't fit in that.

You can use the built-in CastByType step to cast all Decimal256 columns to Decimal128 like this:

```python
from cherry_etl import config as cc

cc.Step(
    kind=cc.StepKind.CAST_BY_TYPE,
    config=cc.CastByTypeConfig(
        from_type=pa.decimal256(76, 0),
        # can also use `pa.string()` as `to_type` here to get string values like '123213'
        to_type=pa.decimal128(38, 0),
    ),
),
```

Or you can use U256ToBinary step to cast all u256 columns to big endian (eth compatible) encoded binary values
```python
from cherry_etl import config as cc

cc.Step(
    kind=cc.StepKind.U256_TO_BINARY,
    config=cc.U256ToBinary(),
)
```

Some output formats also don't support Decimal256 but all of them support Decimal128 so this can be useful if you are having trouble writing Decimal256 to your output.

