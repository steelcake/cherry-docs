# HyperSync

HyperSync is a purpose-built, high-performance data retrieval layer that gives developers unprecedented access to blockchain data. Built from the ground up in Rust, HyperSync serves as an alternative to traditional JSON-RPC endpoints, offering dramatically faster queries and more flexible data access patterns.

HyperSync currently supports [70+ EVM chains](https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks).

Read more about it at the [offical documentation](https://docs.envio.dev/docs/HyperSync/overview).

## Example ProviderConfig

```python
from cherry_core import ingest

provider = ingest.ProviderConfig(
    kind=ingest.ProviderKind.HYPERSYNC,
    bearer_token="<Your Hypersync API Token>",
    url="https://eth.hypersync.xyz",
)
```

You can get an url for a desired chain from the [supported networks page](https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks).

## Getting API token

HyperSync is currently free and unlimited but it is transitioning into [API Tokens](https://docs.envio.dev/docs/HyperSync/api-tokens). 

It is recommended to get an API token and use it with your queries.

