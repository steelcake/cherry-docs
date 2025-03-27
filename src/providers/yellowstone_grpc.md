# Yellowstone-GRPC

Support for yellostone-grpc is still partial. We recommend using `sqd` instead.

You can read more about yellowstone_grpc [here](https://docs.triton.one/project-yellowstone/dragons-mouth-grpc-subscriptions) and [here](https://github.com/rpcpool/yellowstone-grpc).

# Example ProviderConfig

```python
from cherry_core import ingest

provider = ingest.ProviderConfig(
    kind=ingest.ProviderKind.YELLOWSTONE_GRPC,
    bearer_token="<Your X-Token>",
    url="<URL to a Yellowstone GRPC endpoint>",
)
```

