---
title: Data Providers
description: Part of the Cherry documentation
---

# Data Providers

Everything in cherry works the same regardless of which data provider you choose.

You can change the provider by just changing `provider_kind` and `provider_url` arguments when constructing a `ProviderConfig` object.

```python
from cherry_core import ingest

provider = ingest.ProviderConfig(
    kind=my_provider_kind,
    url=my_provider_url,
)
```

Check out the specific section of the provider you want to use to get more info.

# Data availability

| Provider            | Ethereum (EVM) | Solana (SVM)  |
|---------------------|----------------|---------------|
| [HyperSync](./hypersync.html) | ✅ | ❌ |
| [SQD](./sqd.html)             | ✅ | ✅ |
| [Yellowstone-GRPC](./yellowstone_grpc.html) | ❌ | ✅ |

# Full ProviderConfig

```python
class ProviderKind(str, Enum):
    SQD = "sqd"
    HYPERSYNC = "hypersync"
    YELLOWSTONE_GRPC = "yellowstone_grpc"

@dataclass
class ProviderConfig:
    kind: ProviderKind
    url: Optional[str] = None
    bearer_token: Optional[str] = None
    max_num_retries: Optional[int] = None
    retry_backoff_ms: Optional[int] = None
    retry_base_ms: Optional[int] = None
    retry_ceiling_ms: Optional[int] = None
    req_timeout_millis: Optional[int] = None
    stop_on_head: bool = False
    head_poll_interval_millis: Optional[int] = None
    buffer_size: Optional[int] = None
```

