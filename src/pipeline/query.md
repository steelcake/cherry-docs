# Query 

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

In this example we are creating an EVM query that is looking for logs that match our single `LogRequest`. We could pass multiple `LogRequest`s and
it would return logs mathing **any** of our log requests.

The fields inside the request correspond to the columns of the table. For example `topic0` in our `LogRequest` corresponds to the `topic0` column of the `logs` table in `EVM` dataset.
Each field gives a list of values, the request will match the logs that have any of these values in this field. For example, if we pass multiple values inside `topic0` field of our `LogRequest`,
we would expect to get all logs that have **any** of the values we passed in `LogRequest.topic0` field.

If we pass multiple fields into a request object, we will get objects that match **all** of those criteria. For example if we passed a couple values in `topic1` field of the same `LogRequest`,
we would get logs that match the `topic0` filter **and** the `topic1` filter. So fields in the same request have a **and** relationship between them. 

Include fields are for including other object that are related to the object we are querying for. For example if we set `include_blocks=True` this means we will get `blocks` table and it will
contain the blocks of the logs that we matched with this `LogRequest`.

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

