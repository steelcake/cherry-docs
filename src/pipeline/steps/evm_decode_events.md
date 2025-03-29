# EvmDecodeEvents

Decode evm events using the given signature

```python
@dataclass
class EvmDecodeEventsConfig:
    event_signature: str
    allow_decode_fail: bool = False
    input_table: str = "logs"
    output_table: str = "decoded_logs"
    hstack: bool = True
```

`allow_decode_fail` controls if the decoder should fail if a row fails to decode or if it should write null instead.

`hstack` means to horizontally stack raw logs and decoded logs tables together. So decoded values will have raw log values like
block_number, address, topic0 etc. next to them.


## Example

```python
from cherry_etl import config as cc

cc.Step(
    kind=cc.StepKind.EVM_DECODE_EVENTS,
    config=cc.EvmDecodeEventsConfig(
        event_signature="Transfer(address indexed from, address indexed to, uint256 amount)",
        output_table="transfers",
    ),
),
```
