# U256ToBinary

Convert all Decimal256 columns to trimmed and big endian encoded binary values. This binary representation
is the same as how it is done in ETH RPC and all eth related tools.

```python
@dataclass
class U256ToBinaryConfig:
    tables: Optional[list[str]] = None
```

`tables` parameter can be used to specify which tables should be encoded.
All tables are encoded if `tables` parameter is left None.
