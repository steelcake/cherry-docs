# HexEncode

Encode all binary fields as hex strings

```python
@dataclass
class HexEncodeConfig:
    tables: Optional[list[str]] = None
    prefixed: bool = True
```

`tables` parameter can be used to specify which tables should be encoded.
All tables are encoded if `tables` parameter is left None.

`prefixed` parameter chooses between prefixed-hex('0x..', eth style) and regular hex encoding.

