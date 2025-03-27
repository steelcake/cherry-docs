# address_appearances

Get appearances of addresses using traces. Including relationship of the address to the trace.

# Output schema

- block_number: uint64
- block_hash: binary
- transaction_hash: binary
- address: binary
- relationship: string (can be call_from, call_to, factory, suicide, suicide_refund, author or create).

This dataset idea is taken from [cryo](https://github.com/paradigmxyz/cryo).

