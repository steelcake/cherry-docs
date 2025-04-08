# Introduction 

[![PyPI](https://img.shields.io/badge/PyPI-lightgreen?style=for-the-badge&logo=pypi&labelColor=white)](https://pypi.org/project/cherry-etl/)
[![Telegram](https://img.shields.io/badge/Telegram-darkgray?style=for-the-badge&logo=telegram)](https://t.me/cherry_etl)
[![GitHub](https://img.shields.io/badge/github-black?style=for-the-badge&logo=github)](https://github.com/steelcake/cherry)

Cherry is a python library for building blockchain data pipelines.

It is designed to make building production-ready blockchain data pipelines easy.

## Getting Started

See [getting started section](https://steelcake.github.io/cherry-docs/getting_started.html) of the docs.

## Features

- Pure `python` library. Don't need yaml, SQL, toml etc. 
- High-level `datasets` API and flexible pipeline API.
- `High-performance`, `low-cost` and `uniform` data access. Ability to use advanced providers without platform lock-in.
- Included functionality to `decode`, `validate`, `transform` blockchain data. All implemented in `rust` for performance. 
- Write transformations using `polars`, `pyarrow`, `datafusion`, `pandas`, `duckdb` or any other `pyarrow` compatible library.
- `Schema inference` automatically creates output tables. 
- Keep datasets fresh with `continuous ingestion`.
- `Parallelized`, next batch of data is being fetched while your pre-processing function is running, while the database writes are being executed in parallel. Don't need to hand optimize anything.
- Included library of transformations.
- Included functionality to implement `crash-resistance`.

## Data providers

| Provider            | Ethereum (EVM) | Solana (SVM)  |
|---------------------|----------------|---------------|
| [HyperSync](https://docs.envio.dev/docs/HyperSync/overview) | ✅ | ❌ |
| [SQD](https://docs.sqd.ai/)             | ✅ | ✅ |
| [Yellowstone-GRPC](https://github.com/rpcpool/yellowstone-grpc) | ❌ | ✅ |

## Supported output formats

- **ClickHouse**
- **Iceberg**
- **Deltalake**
- **DuckDB**
- **Arrow Datasets**
- **Parquet**

## Examples

See [examples on github.](https://github.com/steelcake/cherry/tree/main/examples)

And [getting started section](https://steelcake.github.io/cherry-docs/getting_started.html).

## License

Licensed under either of

 * Apache License, Version 2.0
   ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license
   ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

## Sponsors

[<img src="https://steelcake.com/envio-logo.png" width="150px" />](https://envio.dev)
[<img src="https://steelcake.com/sqd-logo.png" width="165px" />](https://sqd.ai)
[<img src="https://steelcake.com/space-operator-logo.webp" height="75px" />](https://linktr.ee/spaceoperator)


