# CastByType

Cast all columns with the `from_type` to `to_type`.

```python
@dataclass
class CastByTypeConfig:
    from_type: pa.DataType
    to_type: pa.DataType
    allow_decode_fail: bool = False
```

When `allow_decode_fail` is set to `True`, this step will write `null` if it fails to cast a value instead of erroring out.

