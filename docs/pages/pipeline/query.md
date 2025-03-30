---
title: Query
description: Query interface for blockchain data
---

# Query API

Cherry provides a flexible query system that allows you to construct rich queries for blockchain data.

:::tip
The Query API allows you to:
- Construct basic and advanced queries
- Filter and join data
- Handle pagination
- Specify data selection
:::

## Overview

The `BasicQuery` is the foundation of Cherry's querying capabilities:

```python
from cherry_core import query
from typing import Dict, List, Any

# Define a basic query
basic_query = query.BasicQuery(
    table_name="blocks",
    columns=["number", "hash", "timestamp"],
    condition="number > 15000000 AND number < 15000100",
    limit=100
)

# Convert to params dict
params: Dict[str, Any] = basic_query.to_params()

# Get SQL representation
sql: str = basic_query.to_sql()
```

## AdvancedQueryBuilder

For more complex queries, use the `AdvancedQueryBuilder`:

```python
from cherry_core import query

# Create a query builder
builder = query.AdvancedQueryBuilder(table_name="transactions")

# Chain methods to build query
result = (
    builder
    .select("hash", "block_number", "from_address", "to_address", "value")
    .where("block_number >= ?", 15000000)
    .where("value > ?", 1000000000000000000)  # > 1 ETH
    .order_by("value DESC")
    .limit(10)
    .build()
)

# Extract SQL and parameters
sql, params = result.sql, result.params
```

## JoinQuery

For joining multiple tables:

```python
from cherry_core import query

# Create a join query
join_query = query.JoinQuery(
    base_table="transactions",
    join_table="blocks",
    join_columns=["timestamp", "hash AS block_hash"],
    join_type="INNER",
    join_condition="transactions.block_number = blocks.number",
    base_columns=["hash", "from_address", "to_address", "value"],
    condition="transactions.value > 1000000000000000000",
    limit=20
)

# Get SQL representation
sql = join_query.to_sql()
```

## Pagination Support

All query types support pagination:

```python
from cherry_core import query

# Create a paginated query
paginated_query = query.BasicQuery(
    table_name="transactions",
    columns=["*"],
    order_by="block_number ASC, transaction_index ASC",
    limit=100,
    offset=200  # Skip first 200 rows
)

# Get page information
page_info = paginated_query.get_pagination_info()
```

# Log Filtering Guide

The query is used to specify the data we get from the provider.

It consists of:

- **from_block**, the block to start from
- **to_block** (optional), the block to stop at (inclusive).
- **request fields**
- **field selection**

## Request Fields

The request fields are named after tables, e.g. `logs`

```python
from cherry_core import ingest

query = ingest.Query(
    kind=ingest.QueryKind.EVM,
    params=ingest.evm.Query(
        from_block=from_block,
        to_block=to_block,
        logs=[
            ingest.evm.LogRequest(
                topic0=[cherry_core.evm_signature_to_topic0(dex.event_signature)],
                include_blocks=True,
                include_transactions=True,
            )
        ],
        fields=request_fields,
    ),
)
```

This example creates an EVM query looking for logs matching a single `LogRequest`. 

`include_` fields determine if related data should be included. For example, `include_blocks=True` means the response will contain the blocks table with the blocks containing the matched logs.


## Log Filtering

The core filtering behaviors are:

1. **Between multiple `LogRequest` objects**: When multiple `LogRequest` objects are provided, logs matching ANY of them will be returned (OR logic).

2. **Between different fields in the same `LogRequest`**: When multiple fields are specified (e.g., `address` AND `topic0`), logs matching ALL criteria will be returned (AND logic).

3. **Within a single field**: When multiple values are provided for one field (e.g., multiple addresses in the `address` field), logs matching ANY of those values will be returned (OR logic).


### OR Mode: Separate Log Requests
Use separate log requests to match events that satisfy ANY of the conditions:

```python
logs=[
    # Will match USDC Transfer OR WETH Approval
    LogRequest(address=[USDC], topic0=[TRANSFER_TOPIC]),
    LogRequest(address=[WETH], topic0=[APPROVAL_TOPIC])
]
```
Results:
```
┌─────────────┬──────────┐
│ address     ┆ topic0   │
╞═════════════╪══════════╡
│ USDC        ┆ Transfer │  # Only USDC Transfers
│ WETH        ┆ Approval │  # Only WETH Approvals
└─────────────┴──────────┘
```

### CROSS JOIN: Multiple Values in Single Request
Put multiple values in a single request to match ALL combinations:

```python
logs=[
    LogRequest(
        address=[USDC, WETH],
        topic0=[TRANSFER_TOPIC, APPROVAL_TOPIC]
    )
]
```
Results:
```
┌─────────────┬──────────┐
│ address     ┆ topic0   │
╞═════════════╪══════════╡
│ WETH        ┆ Approval │  # All possible combinations
│ WETH        ┆ Transfer │  # of addresses and topics
│ USDC        ┆ Approval │  # will be matched
│ USDC        ┆ Transfer │
└─────────────┴──────────┘
```

#### Common Use Cases

1. **Track specific events from multiple contracts:**
```python
logs=[
    LogRequest(
        address=[CONTRACT_A, CONTRACT_B, CONTRACT_C],
        topic0=[SPECIFIC_EVENT_TOPIC]
    )
]
```

2. **Track multiple events from a specific contract:**
```python
logs=[
    LogRequest(
        address=[SPECIFIC_CONTRACT],
        topic0=[EVENT_1_TOPIC, EVENT_2_TOPIC, EVENT_3_TOPIC]
    )
]
```

3. **Track specific event combinations:**
   ```python
   logs=[
       LogRequest(address=[CONTRACT_A], topic0=[EVENT_X_TOPIC]),
       LogRequest(address=[CONTRACT_B], topic0=[EVENT_Y_TOPIC])
   ]
   ```

### Filtering by Indexed Parameters (topic1, topic2, etc.)

For EVM events, indexed parameters are stored in the topics array (topic1, topic2, etc.). You can filter by these parameters to get more specific results:

```python
# Filter Transfer events where "from" address is specific
from_address = "0x000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"  # Padded to 32 bytes
transfer_topic0 = cherry_core.evm_signature_to_topic0("Transfer(address,address,uint256)")

query = ingest.Query(
    kind=ingest.QueryKind.EVM,
    params=ingest.evm.Query(
        from_block=20123123,
        to_block=20123223,
        logs=[
            ingest.evm.LogRequest(
                topic0=[transfer_topic0],
                topic1=[from_address],  # Filter by 'from' address (first indexed parameter)
                include_blocks=True,
            )
        ],
        fields=ingest.evm.Fields(
            # Fields definition...
        ),
    ),
)
```
:::info

1. Topic values should be padded to 32 bytes (for addresses, prepend with zeros)
2. For addresses, the correct format is: `"0x000000000000000000000000" + address[2:]`
3. Parameter ordering follows the indexed parameters in the event signature
4. Non-indexed parameters are encoded in the `data` field and can't be filtered directly
:::

## Field Selection

`Query.fields` specifies which columns of each table we want to select.

```python
request_fields = ingest.evm.Fields(
    block=ingest.evm.BlockFields(number=True, timestamp=True),
    transaction=ingest.evm.TransactionFields(
        block_number=True, transaction_index=True, hash=True, from_=True, to=True
    ),
    log=ingest.evm.LogFields(
        block_number=True,
        transaction_index=True,
        log_index=True,
        address=True,
        data=True,
        topic0=True,
        topic1=True,
        topic2=True,
        topic3=True,
    ),
)
```

This means we want to get `blocks.number`, `blocks.timestamp`, `transactions.block_number` ... fields in the response. 

Minimizing the fields we request can make a massive difference in performance and response body sizes, both can drastically effect cost of running infrastructure.

Modern providers like SQD and HyperSync fully utilize this selection so it makes a big difference.

