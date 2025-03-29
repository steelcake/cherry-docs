# CastByType

Cast all columns with the `from_type` to `to_type`.

```python
@dataclass
class CastByTypeConfig:
    from_type: pa.DataType
    to_type: pa.DataType
    safe: Optional[bool] = None
    options: Optional[pa_compute.CastOptions] = None
```

See pyarrow cast function [documentation](https://arrow.apache.org/docs/python/generated/pyarrow.compute.cast.html) for more info about the parameters.

