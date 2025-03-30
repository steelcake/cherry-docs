---
title: EvmDecodeEvents Step
description: Decode EVM event logs using ABI
---

# EvmDecodeEvents

Decode EVM event logs using contract ABI definitions.

## Configuration

```python
@dataclass
class EvmDecodeEventsConfig:
    abis: dict[str, str]
```

## Parameters

:::info
- `abis`: Dictionary mapping contract addresses to their ABI JSON strings. The ABIs should be in standard Ethereum ABI JSON format.
:::

## Example

```python
from cherry_etl import config as cc

# ABI for ERC20 Transfer events
transfer_abi = '''
[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]
'''

# Decode events for a specific contract
step = cc.Step(
    kind=cc.StepKind.EVM_DECODE_EVENTS,
    config=cc.EvmDecodeEventsConfig(
        abis={
            "0x1234...": transfer_abi
        }
    ),
)
```

## Output Schema

The decoded events will be added to the logs table with the following additional columns:

- `decoded_name`: Name of the decoded event (e.g. "Transfer")
- `decoded_params`: Array of decoded parameter values
- `decoded_types`: Array of parameter types
- `decoded_indexed`: Array of boolean flags indicating if each parameter was indexed 