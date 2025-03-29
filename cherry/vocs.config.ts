import { defineConfig } from 'vocs';

export default defineConfig({
  title: 'Cherry Documentation',
  description: 'Cherry is a python library for building blockchain data pipelines.',

  // Logo configuration
  logoUrl: "/cherry-logo.png",
  iconUrl: "/cherry-logo.webp",

  // OG Image for social sharing
  ogImageUrl: "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",

  // Banner for important updates
  banner: {
    content: "🚀 Cherry is in Beta! Join our [Telegram channel](https://t.me/cherry_etl)",
    dismissable: true,
    backgroundColor: "#ffe6e6",
  },

  // Sponsors configuration
  sponsors: [
    {
      name: '',
      height: 80,
      items: [
        [
          {
            name: 'Envio',
            image: 'https://steelcake.com/envio-logo.png',
            link: 'https://envio.dev',
          },
          {
            name: 'SQD',
            image: 'https://steelcake.com/sqd-logo.png',
            link: 'https://sqd.ai',
          },
          {
            name: 'Space Operator',
            image: 'https://steelcake.com/space-operator-logo.webp',
            link: 'https://linktr.ee/spaceoperator',
          },
        ],
      ],
    },
  ],

  // Theme configuration
  theme: {
    accentColor: {
      light: '#ef4e4e',
      dark: '#f66b6b'
    },
    variables: {
      color: {
        background: {
          light: 'white',
          dark: 'black'
        }
      }
    }
  },

  // Top navigation
  topNav: [
    { text: 'Guide & API', link: '/getting_started', match: '/docs' },
    {
      text: 'Providers',
      items: [
        { text: 'HyperSync', link: '/providers/hypersync' },
        { text: 'SQD', link: '/providers/sqd' },
        { text: 'Yellowstone-GRPC', link: '/providers/yellowstone_grpc' }
      ]
    },
    {
      text: 'Writers',
      items: [
        { text: 'ClickHouse', link: '/writers/clickhouse' },
        { text: 'DeltaLake', link: '/writers/delta_lake' },
        { text: 'DuckDB', link: '/writers/duckdb' },
        { text: 'Iceberg', link: '/writers/iceberg' },
        { text: 'PyArrowDataset', link: '/writers/pyarrow_dataset' }
      ]
    }
  ],

  // Social links
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/steelcake/cherry',
    },
    {
      icon: 'telegram',
      link: 'https://t.me/steelcake_dev',
    }
  ],

  sidebar: [
    { text: 'Introduction', link: '/introduction' },
    { text: 'Getting started', link: '/getting_started' },
    {
      text: 'Providers',
      link: '/providers/',
      items: [
        { text: 'HyperSync', link: '/providers/hypersync' },
        { text: 'SQD', link: '/providers/sqd' },
        { text: 'Yellowstone-GRPC', link: '/providers/yellowstone_grpc' }
      ]
    },
    {
      text: 'Writers',
      link: '/writers/',
      items: [
        { text: 'ClickHouse', link: '/writers/clickhouse' },
        { text: 'DeltaLake', link: '/writers/delta_lake' },
        { text: 'DuckDB', link: '/writers/duckdb' },
        { text: 'Iceberg', link: '/writers/iceberg' },
        { text: 'PyArrowDataset(Parquet)', link: '/writers/pyarrow_dataset' }
      ]
    },
    {
      text: 'Datasets',
      link: '/datasets/',
      items: [
        {
          text: 'Ethereum (EVM)',
          link: '/datasets/evm/',
          items: [
            { text: 'address_appearances', link: '/datasets/evm/address_appearances' },
            { text: 'blocks', link: '/datasets/evm/blocks' }
          ]
        },
        {
          text: 'Solana (SVM)',
          link: '/datasets/svm/',
          items: [
            { text: 'token_balances', link: '/datasets/svm/token_balances' }
          ]
        }
      ]
    },
    { text: 'Restarting from where you left off', link: '/restart_from_block' },
    { text: 'Crash resistance', link: '/crash_resistance' },
    { text: 'Logging', link: '/logging' },
    {
      text: 'Writing Custom Pipelines',
      link: '/pipeline/',
      items: [
        { text: 'Query', link: '/pipeline/query' },
        {
          text: 'Data Schema',
          link: '/pipeline/schema/',
          items: [
            { text: 'Ethereum (EVM)', link: '/pipeline/schema/evm' },
            { text: 'Solana (SVM)', link: '/pipeline/schema/svm' }
          ]
        },
        {
          text: 'Steps',
          link: '/pipeline/steps/',
          items: [
            { text: 'Base58Encode', link: '/pipeline/steps/base58_encode' },
            { text: 'Cast', link: '/pipeline/steps/cast' },
            { text: 'CastByType', link: '/pipeline/steps/cast_by_type' },
            { text: 'EvmDecodeEvents', link: '/pipeline/steps/evm_decode_events' },
            { text: 'HexEncode', link: '/pipeline/steps/hex_encode' },
            { text: 'U256ToBinary', link: '/pipeline/steps/u256_to_binary' }
          ]
        },
        { text: 'Writing Custom Steps', link: '/pipeline/steps/custom' }
      ]
    },
    {
      text: 'Appendix',
      link: '/appendix/',
      items: [
        { text: 'Polars and Decimal types (UInt256)', link: '/appendix/polars_and_decimal' }
      ]
    }
  ],

  // Edit link configuration
  editLink: {
    pattern: "https://github.com/steelcake/cherry/edit/main/docs/pages/:path",
    text: "Edit this page on GitHub",
  },

  // Search configuration with boosting
  search: {
    boostDocument(documentId) {
      if (documentId.includes("getting_started") ||
        documentId.includes("introduction")) {
        return 2;
      }
      return 1;
    },
  },

  // Code highlighting configuration
  markdown: {
    code: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
