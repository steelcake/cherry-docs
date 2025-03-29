# Base58Encode

Encode all binary fields as solana(bitcoin) style base58 

```python
@dataclass
class Base58EncodeConfig:
    tables: Optional[list[str]] = None
```

`tables` parameter can be used to specify which tables should be encoded.
All tables are encoded if `tables` parameter is left None.

