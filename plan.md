Okay, let's outline the steps to migrate your `cherry-docs` from the current `mdbook` setup to `Vocs`, using the provided `vocs.md` documentation as a guide.

**Analysis of Current Setup (mdbook):**

1.  **Source Files:** Located in `src/`.
2.  **Configuration:** `book.toml` (basic title info).
3.  **Navigation:** Defined explicitly in `src/SUMMARY.md`.
4.  **Content:** Standard Markdown (`.md`).
5.  **Build:** GitHub Actions workflow using `mdbook build`, outputting to `book/`.
6.  **Structure:** Nested directories with `README.md` often acting as index pages.

**Analysis of Target Setup (Vocs):**

1.  **Source Files:** Typically `docs/pages/` (or configurable). Can use `.md` or `.mdx`.
2.  **Configuration:** `vocs.config.ts` (JavaScript/TypeScript based, more extensive).
3.  **Navigation:** Defined in `vocs.config.ts` using `sidebar` and `topNav` properties. Paths are usually relative to the pages directory.
4.  **Content:** Markdown and MDX (allows React components). Supports frontmatter for page-specific config.
5.  **Build:** `vocs build`, outputting to `dist/` (usually).
6.  **Structure:** Flat or nested within the pages directory. Often uses `index.md` or `index.mdx` for directory indices.

**Migration Steps:**

1.  **Prerequisites:**
    * Node.js and a package manager (npm, yarn, pnpm, or uv) installed.
    * Familiarity with basic TypeScript/JavaScript for configuration is helpful but not strictly required initially.

2.  **Initialize Vocs Project:**
    * Navigate to your `cherry-docs` repository root.
    * Use the Vocs CLI initializer (recommended):
        ```bash
        npm init vocs@next # or pnpm/yarn/uv equivalent
        # Follow the prompts. You might choose './docs' as the directory.
        ```
    * *Alternatively, manually install:*
        ```bash
        # Using uv (as per your intro.md)
        uv add vocs@next react react-dom
        # Or npm/pnpm/yarn
        # npm install vocs@next react react-dom
        ```
    * Create the basic structure if installing manually:
        ```
        cherry-docs/
        ├── docs/              # Or your chosen root for vocs files
        │   ├── pages/         # Where your markdown/mdx files will go
        │   └── public/        # For static assets (like favicons, images)
        │   └── vocs.config.ts # Vocs configuration
        ├── node_modules/      # (Will be created)
        ├── package.json       # (Will be created/updated)
        └── ... (your existing files like src/, LICENSE-*)
        ```
    * Add scripts to `package.json`:
        ```json
        {
          "scripts": {
            "docs:dev": "vocs dev",
            "docs:build": "vocs build",
            "docs:preview": "vocs preview"
          }
        }
        ```

3.  **Configure `vocs.config.ts`:**
    * Create `docs/vocs.config.ts` (or wherever you chose your Vocs root).
    * Start with basic configuration based on `book.toml` and `introduction.md`:
        ```typescript
        import { defineConfig } from 'vocs'

        export default defineConfig({
          title: 'Cherry Documentation', // From book.toml
          description: 'Cherry is a python library for building blockchain data pipelines.', // From introduction.md
          // Optional: Add logo, favicon, etc.
          // iconUrl: '/favicon.ico', // Place favicon.ico in docs/public/
          // logoUrl: '/logo.png', // Place logo.png in docs/public/
          socials: [ // From introduction.md links
            {
              icon: 'github',
              link: 'https://github.com/steelcake/cherry',
            },
            // Add Telegram if Vocs supports it directly or use a generic link icon
            // { icon: 'telegram', link: 'https://t.me/cherry_etl' }, // Check if 'telegram' icon exists
          ],
          // We will configure the sidebar next
          sidebar: [],
        })
        ```

4.  **Migrate Content (Markdown Files):**
    * **Copy:** Copy the entire contents of your current `src/` directory into the Vocs `docs/pages/` directory.
        ```bash
        # Example: If your vocs root is './docs'
        cp -R src/* docs/pages/
        ```
    * **Rename Index Files:** Vocs typically uses `index.md` or `index.mdx` for directory landings, not `README.md`. Rename the `README.md` files:
        ```bash
        # Example commands (run from cherry-docs root):
        mv docs/pages/README.md docs/pages/index.md # Top-level README becomes index
        mv docs/pages/appendix/README.md docs/pages/appendix/index.md
        mv docs/pages/datasets/README.md docs/pages/datasets/index.md
        mv docs/pages/datasets/evm/README.md docs/pages/datasets/evm/index.md
        mv docs/pages/datasets/svm/README.md docs/pages/datasets/svm/index.md
        mv docs/pages/pipeline/README.md docs/pages/pipeline/index.md
        mv docs/pages/pipeline/schema/README.md docs/pages/pipeline/schema/index.md
        mv docs/pages/providers/README.md docs/pages/providers/index.md
        mv docs/pages/writers/README.md docs/pages/writers/index.md
        # etc.
        ```
    * **Remove `SUMMARY.md`:** Delete `docs/pages/SUMMARY.md` as it's replaced by `vocs.config.ts`.

5.  **Configure Sidebar Navigation:**
    * This is the most manual part. Translate the structure from `src/SUMMARY.md` into the `sidebar` array in `docs/vocs.config.ts`.
    * Paths in the `link` property should be relative to the `docs/pages` directory *without* the `.md` extension. Use `/` for index files.
    * Use `items` for nested sections and `collapsed: true` if you want them initially collapsed.

    *Example Translation:*

    * `SUMMARY.md` entry: `- [Introduction](./introduction.md)` becomes `{ text: 'Introduction', link: '/introduction' }`
    * `SUMMARY.md` entry: `- [Providers](./providers/README.md)` becomes `{ text: 'Providers', link: '/providers/' }` (linking to the `index.md` in that folder)
    * `SUMMARY.md` nested entry: `  - [HyperSync](./providers/hypersync.md)` becomes part of an `items` array under 'Providers'.

    *Partial `vocs.config.ts` sidebar:*
    ```typescript
    import { defineConfig } from 'vocs'

    export default defineConfig({
      // ... other config ...
      sidebar: [
        { text: 'Introduction', link: '/introduction' }, // Corresponds to introduction.md
        { text: 'Getting started', link: '/getting_started' }, // Corresponds to getting_started.md
        {
          text: 'Providers',
          link: '/providers/', // Links to providers/index.md
          items: [
            { text: 'HyperSync', link: '/providers/hypersync' },
            { text: 'SQD', link: '/providers/sqd' },
            { text: 'Yellowstone-GRPC', link: '/providers/yellowstone_grpc' },
          ],
        },
        {
          text: 'Writers',
          link: '/writers/', // Links to writers/index.md
          items: [
            { text: 'ClickHouse', link: '/writers/clickhouse' },
            { text: 'DeltaLake', link: '/writers/delta_lake' },
            { text: 'DuckDB', link: '/writers/duckdb' },
            { text: 'Iceberg', link: '/writers/iceberg' },
            { text: 'PyArrowDataset(Parquet)', link: '/writers/pyarrow_dataset' },
          ],
        },
        {
          text: 'Datasets',
          link: '/datasets/', // Links to datasets/index.md
          items: [
             {
               text: 'Ethereum (EVM)',
               link: '/datasets/evm/', // Links to datasets/evm/index.md
               items: [
                  { text: 'address_appearances', link: '/datasets/evm/address_appearances' },
                  { text: 'blocks', link: '/datasets/evm/blocks' },
               ]
             },
             {
               text: 'Solana (SVM)',
               link: '/datasets/svm/', // Links to datasets/svm/index.md
               items: [
                 { text: 'token_balances', link: '/datasets/svm/token_balances' },
               ]
             }
          ]
        },
        { text: 'Restarting from where you left off', link: '/restart_from_block' },
        { text: 'Crash resistance', link: '/crash_resistance' },
        { text: 'Logging', link: '/logging' },
        {
          text: 'Writing Custom Pipelines',
          link: '/pipeline/', // Links to pipeline/index.md
          items: [
            { text: 'Query', link: '/pipeline/query' }, // Assumes Log Filtering is a section within query.md
            {
              text: 'Data Schema',
              link: '/pipeline/schema/', // Links to pipeline/schema/index.md
              items: [
                { text: 'Ethereum (EVM)', link: '/pipeline/schema/evm' },
                { text: 'Solana (SVM)', link: '/pipeline/schema/svm' },
              ]
            },
            { text: 'Steps', link: '/pipeline/steps' }, // You might need to create this page or merge content
            { text: 'Writing Custom Steps', link: '/pipeline/custom_steps' }, // You might need to create this page or merge content
          ]
        },
        {
          text: 'Appendix',
          link: '/appendix/', // Links to appendix/index.md
          items: [
            { text: 'Polars and Decimal types (UInt256)', link: '/appendix/polars_and_decimal' },
          ]
        }
        // Add other top-level items like Licenses if desired
      ],
    })
    ```
    * **Note:** You might need to create placeholder files (`steps.md`, `custom_steps.md`) if they don't exist or merge content if appropriate. Adjust links based on actual file names.

6.  **Add Frontmatter:**
    * Go through each `.md` file in `docs/pages/` and add basic frontmatter at the top. At minimum, a `title` is good practice. You can copy it from the H1 heading (`#`).
        ```markdown
        ---
        title: Introduction
        description: Cherry is a python library for building blockchain data pipelines.
        ---

        # Introduction
        [![PyPI](...)](...)
        ... rest of the content ...
        ```
    * For the main landing page (`docs/pages/index.md`), you might want to use the `landing` layout:
        ```markdown
        ---
        layout: landing
        title: Cherry Documentation # This is often used for the browser tab title
        description: Cherry is a python library for building blockchain data pipelines.
        ---

        # Introduction
        {/* You can use Markdown or MDX here. Consider using Vocs' <HomePage> components */}
        {/* For a start, just include the content from the original introduction.md */}

        [![PyPI](...)](...)
        [![Telegram](...)](...)
        ...

        ## Getting Started
        See [getting started section](./getting_started.html) of the docs.
        {/* Update links to relative paths: */}
        See [getting started section](./getting_started) of the docs.

        ... rest of the introduction content ...
        ```
        *Rename `index.md` to `index.mdx` if you want to use React components like `<HomePage>`.*

7.  **Update Build Workflow (`.github/workflows/mdbook.yml`):**
    * Rename the file (e.g., `vocs-deploy.yml`).
    * Change the steps to install Node.js, install dependencies, build with Vocs, and upload the correct artifact path.

    *Example `vocs-deploy.yml`:*
    ```yaml
    name: Deploy Docs

    on:
      push:
        branches:
          - main # Or your default branch

    jobs:
      deploy:
        runs-on: ubuntu-latest
        permissions:
          contents: write # To push a branch (if needed, usually not for pages)
          pages: write    # To push to a GitHub Pages site
          id-token: write # To update the deployment status

        steps:
          - name: Checkout repository
            uses: actions/checkout@v4
            with:
              fetch-depth: 0 # Fetch all history for git info if needed

          - name: Setup Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '20' # Specify your preferred Node.js version
              cache: 'npm' # Or pnpm, yarn, uv

          - name: Install dependencies
            run: npm ci # Or pnpm install --frozen-lockfile, yarn install --frozen-lockfile, uv sync

          - name: Build Vocs site
            run: npm run docs:build # Or pnpm/yarn/uv equivalent

          - name: Setup Pages
            uses: actions/configure-pages@v4

          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              # Upload the build output directory
              path: './docs/.vocs/dist' # Default Vocs output path relative to vocs.config.ts location

          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```
    * **Important:** Verify the output path of `vocs build`. The default is usually `<vocs_root>/.vocs/dist`. Adjust the `path` in the `upload-pages-artifact` step accordingly.

8.  **Testing:**
    * Run the development server: `npm run docs:dev` (or equivalent).
    * Check all pages, links, code blocks, and navigation.
    * Fix any broken links – internal links should be relative paths to other pages *without* the `.md` extension (e.g., `../providers/hypersync`).
    * Verify the build: `npm run docs:build`.
    * Preview the build: `npm run docs:preview`.

9.  **Refinements (Optional):**
    * **Theming:** Customize the accent color or other theme variables in `vocs.config.ts`.
    * **Custom Components:** If needed, create React components and use them in `.mdx` files.
    * **Callouts:** Convert `Note:`, `Warning:`, etc., blocks to Vocs callouts (`:::note`, `:::warning`).
    * **Code Groups:** Use `:::code-group` if you have equivalent examples in different syntaxes (less likely here).
    * **OG Images:** Configure `ogImageUrl` in `vocs.config.ts` for better social sharing previews.
    * **Search:** Vocs usually has built-in search; ensure it's working.
    * **License Files:** Keep `LICENSE-APACHE` and `LICENSE-MIT` at the root. You can link to them from a page if desired.

This detailed plan should guide you through migrating your Cherry documentation from mdbook to Vocs. Remember to test thoroughly at each stage, especially the navigation and internal links.