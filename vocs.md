# Vocs Documentation

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Markdown Reference](#markdown-reference)
4. [Guides](#guides)
   - [Layouts](#layouts)
   - [Components](#components)
   - [Dynamic OG Images](#dynamic-og-images)
   - [Markdown Snippets](#markdown-snippets)
   - [Theming](#theming)
   - [Twoslash](#twoslash)
   - [Navigation](#navigation)
   - [CSS & Styling](#css--styling)
   - [Code Snippets](#code-snippets)
5. [API Reference](#api-reference)
   - [Configuration](#configuration)
   - [Frontmatter](#frontmatter)

## Getting Started

### Overview

Vocs is a React-based static documentation generator, powered by Vite. Write your content in Markdown or MDX, and Vocs will generate a static site with a default theme.

### Quick Start

#### Bootstrap via CLI

Scaffold a new project with the command line:

```bash
npm init vocs
```

#### Manual Installation

1. Install Vocs:
```bash
npm i vocs@next
```

2. Add scripts to `package.json`:
```json
{
  "scripts": {
    "docs:dev": "vocs dev",
    "docs:build": "vocs build",
    "docs:preview": "vocs preview"
  }
}
```

3. Create your first page:
```
my-project/      
├── docs/ 
│   ├── pages/ 
│   │   └── index.mdx  
├── node_modules/
└── package.json
```

4. Run the development server:
```bash
npm run docs:dev
```

Visit `http://localhost:5173` to see your documentation site.

## Project Structure

A typical Vocs project structure looks like this:

```
my-project/
├── docs/
│   ├── pages/
│   │   ├── index.mdx
│   │   └── about.mdx
│   ├── public/
│   │   └── favicon.ico
│   └── vocs.config.ts
├── node_modules/
└── package.json
```

The main directories and files are:

- `docs/`: Root directory for documentation
- `docs/pages/`: Contains your documentation pages
- `docs/public/`: Static assets
- `docs/vocs.config.ts`: Configuration file

## Markdown Reference

Vocs supports standard Markdown syntax plus additional features. Here's a comprehensive guide:

### Basic Syntax

#### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

#### Emphasis
- *Italics*: `*asterisks*` or `_underscores_`
- **Bold**: `**asterisks**` or `__underscores__`
- Combined: `**asterisks and _underscores_**`
- Strikethrough: `~~Scratch this~~`

#### Lists
```markdown
1. Ordered list item
2. Another item
   - Unordered sub-list
     - Nested sub-list
   - Another sub-list item
3. Third ordered item
```

#### Links and Images
```markdown
[Link text](URL)
![Image alt text](image-url)
```

### Advanced Features

#### Code Blocks
````markdown
```javascript
console.log("hello world")
```
````

##### Code Block Features
- Titles: ```````bash [Terminal]````
- Line focus: `// [!code focus]`
- Line highlights: `// [!code hl]`
- Line numbers: Add `showLineNumbers` meta
- Word focus: `// [!code word]`
- Diffs: `// [!code ++]` and `// [!code --]`

#### Code Groups
```markdown
:::code-group

```bash [npm]
npm i vocs
```

```bash [pnpm]
pnpm i vocs
```

:::
```



#### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| aligned  | aligned  | aligned  |
```

#### Steps
```markdown
::::steps
### Step one
Content for step one

### Step two
Content for step two
::::
```

### MDX Features
- Import and use React components
- Use JSX in markdown
- Export metadata with frontmatter

## Guides

### Components

Vocs provides several built-in components that you can use throughout your documentation:

#### Authors
Displays author or authors in a specific format.

#### BlogPosts
Displays blog posts within the `blogDir`.

#### Button
Display a Vocs-flavored button with three styles:
- Default Button
- Accent Button
- Link Button

#### Callout
Displays a callout with content.

#### HomePage
Displays a "home page" section with customizable content including logos, descriptions, and call-to-action buttons.

#### Sponsors
Renders a list of sponsors defined in the Vocs config.

### Custom Components

You can also create and use your own custom components by importing them in your MDX files.

### Layouts

Vocs comes with three built-in layouts: `docs`, `landing`, and `minimal`. Each layout has its own styling and components.

#### Docs Layout (Default)
The default layout for documentation pages. Includes:
- Edit page link
- Outline
- Footer navigation

```markdown
---
layout: docs
---

# A docs page
This is a docs page.
```

#### Landing Layout
Special layout for homepages without sidebar or documentation components.

```markdown
---
layout: landing
---

This is a landing page.
```

##### HomePage Component
Use the built-in `<HomePage>` components for a templated home page:

```jsx
---
layout: landing
---

import { HomePage } from 'vocs/components'

<HomePage.Root>
  <HomePage.Logo />
  <HomePage.Tagline>React Documentation Framework, powered by Vite</HomePage.Tagline>
  <HomePage.InstallPackage name="vocs" type="init" />
  <HomePage.Description>
    Vocs is a minimal static documentation generator designed to supercharge your documentation workflow.
  </HomePage.Description>
  <HomePage.Buttons>
    <HomePage.Button href="/docs" variant="accent">Get started</HomePage.Button>
    <HomePage.Button href="https://github.com/wevm/vocs">GitHub</HomePage.Button>
  </HomePage.Buttons>
</HomePage.Root>
```

#### Minimal Layout
A barebones layout without documentation components:

```markdown
---
layout: minimal
---

# A minimal page
This page uses a minimal layout.
```

#### Frontmatter Options
Control layout features through frontmatter:

```markdown
---
showSidebar: false
showOutline: false
showLogo: false
---
```

```markdown
---
layout: landing
content:
  horizontalPadding: 0px
  width: 100%
  verticalPadding: 0px
---
```

## API Reference

### Configuration

Vocs uses a configuration file (`vocs.config.ts`) to define global metadata for your documentation. This includes things like the site title, description, logo, sidebar, and more for your project.

#### Initialize Config File

The Vocs config should be defined in a `vocs.config.ts` file at the root of your project:

```
viem/
├── docs/
├── node_modules/
├── src/
├── package.json
└── vocs.config.ts
```

#### Key Configuration Options

- **title** (string): Documentation title
- **description** (string): General description for the documentation
- **basePath** (string): Base path for deployment (e.g., '/docs')
- **baseUrl** (string): Base URL for documentation
- **blogDir** (string): Path to blog pages relative to project root
- **font** (object): Configure font settings including Google Fonts
- **iconUrl** (string): Favicon URL
- **logoUrl** (string): Logo URL for sidebar and mobile nav
- **sidebar** (object): Navigation displayed on the sidebar
- **socials** (array): Social media links in top navigation
- **theme** (object): Theme configuration
- **search** (object): Search configuration
- **markdown** (object): Markdown processing configuration

Example Configuration:

```typescript
import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'My Docs',
  description: 'Documentation for my awesome project',
  basePath: '/docs',
  baseUrl: 'https://example.com',
  sidebar: [
    {
      text: 'Getting Started',
      link: '/docs',
    },
    {
      text: 'API',
      collapsed: true,
      items: [
        {
          text: 'Config',
          link: '/docs/api/config',
        },
      ],
    }
  ],
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/username/project',
    },
  ],
  theme: {
    accentColor: '#ff0000',
  }
})
```

### Theming

Theming in Vocs is highly configurable. You can customize your documentation through CSS variables in the configuration file or via CSS classes.

#### Configuration-based Theming

##### Accent Color

```typescript
import { defineConfig } from 'vocs'

export default defineConfig({
  theme: {
    accentColor: '#ff0000', // Single color
    // OR
    accentColor: {
      light: 'black',
      dark: 'white',
    },
    // OR
    accentColor: {
      backgroundAccent: { light: 'white', dark: 'black' },
      backgroundAccentHover: { light: 'whitesmoke', dark: 'gray' },
      backgroundAccentText: { light: 'black', dark: 'white' },
      textAccent: { light: 'black', dark: 'white' },
    }
  }
})
```

##### Color Scheme

You can force a specific color scheme:

```typescript
export default defineConfig({
  theme: {
    colorScheme: 'dark' // or 'light'
  }
})
```

##### Custom Variables

Customize any CSS variable used in Vocs:

```typescript
export default defineConfig({
  theme: {
    variables: {
      color: {
        background: {
          light: 'white',
          dark: 'black'
        }
      },
      content: {
        horizontalPadding: '40px',
        verticalPadding: '80px'
      }
    }
  }
})
```

#### Class-based Theming

Every element in Vocs can be customized via CSS classes using the `.Vocs_{element}` pattern. For example:

```css
.Vocs_H1 {
  color: red;
}
```

Inspect your documentation's HTML to see available class names for customization. 

### Frontmatter

You can set page-specific metadata in the frontmatter of Markdown pages using YAML format between `---` separators at the top of the page.

```markdown
---
title: Example
description: This is an example page.
---

# Hello world
This is me.
```

#### Available Options

##### Basic Metadata
- **title** (string): Page title for the `<title>` tag
- **description** (string): Page description for meta tags
- **date** (string): Publication date
- **authors** (string[]): Page authors

##### Layout Controls
- **layout** ("docs" | "landing" | "minimal"): Page layout type
  - `docs`: Documentation page layout (default)
  - `landing`: Landing page layout
  - `minimal`: Minimal layout without sidebar/header

##### Display Options
- **showSidebar** (boolean): Toggle sidebar visibility
- **showOutline** (boolean | number): Toggle outline or specify depth
- **showLogo** (boolean): Toggle logo visibility in header
- **showAiCta** (boolean): Toggle AI call-to-action dropdown

##### Content Styling
```markdown
---
content:
  horizontalPadding: string
  width: string
  verticalPadding: string
---
```

Example with multiple options:
```markdown
---
title: My Page
description: A comprehensive guide
authors:
  - [jxom](https://x.com/jxom)
  - [awkweb](https://x.com/awkweb)
date: 2023-12-01
layout: docs
showOutline: 2
content:
  horizontalPadding: 40px
  width: 100%
  verticalPadding: 80px
---
```

### Dynamic OG Images

Vocs supports dynamic open graph images that are displayed when sharing links on platforms like Twitter, Slack, or Telegram.

#### Quick Start

##### Using Vocs OG Image API
Use the built-in API by setting the `ogImageUrl` in your config:

```typescript
import { defineConfig } from 'vocs'

export default defineConfig({
  ogImageUrl: 'https://vocs.dev/api/og?logo=%logo&title=%title&description=%description',
  title: 'My Docs'
})
```

##### Deploy Your Own
You can deploy your own OG Image API using Vercel Edge Functions:

1. Clone and deploy the [example repository](https://github.com/wevm/vocs-og)
2. Update your config with your deployed URL:

```typescript
import { defineConfig } from 'vocs'

export default defineConfig({
  ogImageUrl: 'https://<my-project>.vercel.app/api/og?logo=%logo&title=%title&description=%description',
  title: 'My Docs'
})
```

#### Configuration

Available template variables:
- `%logo`: Logo image URL
- `%title`: Page title
- `%description`: Page description

##### Path-based OG Images
Configure different OG images for different paths:

```typescript
import { defineConfig } from 'vocs'

export default defineConfig({
  ogImageUrl: {
    '/': 'https://vocs.dev/og-image.png',
    '/docs': 'https://vocs.dev/api/og?logo=%logo&title=%title&description=%description',
  },
  title: 'My Docs'
})
``` 

### Navigation

Vocs provides two main navigation components: sidebar and top navigation.

#### Sidebar Configuration
Configure the sidebar in `vocs.config.ts`:

```typescript
import { defineConfig } from 'vocs'

export default defineConfig({
  sidebar: [
    {
      text: 'Getting Started',
      link: '/docs',
    },
    {
      text: 'API',
      collapsed: true,
      items: [
        {
          text: 'Config',
          link: '/docs/api/config',
        },
      ],
    }
  ]
})
```

##### Contextual Sidebars
Create different sidebars for different sections:

```typescript
export default defineConfig({
  sidebar: {
    '/docs/': [
      {
        text: 'Getting Started',
        link: '/docs',
      },
      // ... more items
    ],
    '/examples/': [
      { text: 'React', link: '/examples/react' },
      { text: 'Vue', link: '/examples/vue' }
    ]
  }
})
```

#### Top Navigation
Configure the top navigation bar:

```typescript
export default defineConfig({
  topNav: [
    { 
      text: 'Guide & API', 
      link: '/docs/getting-started', 
      match: '/docs' 
    },
    { text: 'Blog', link: '/blog' },
    {
      text: 'Version',
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/org/repo/changelog',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/org/repo/contributing',
        },
      ],
    },
  ]
})
```

Top navigation items support:
- `text`: Display text
- `link`: Navigation URL
- `match`: Path pattern for highlighting
- `items`: Dropdown menu items 

### CSS & Styling

#### Custom CSS

Add custom CSS by creating a `styles.css` file in the Vocs root directory:

```
my-project/
├── docs/
│   ├── pages/
│   │   ├── index.mdx
│   │   └── about.tsx
│   ├── public/
│   │   └── favicon.ico
│   └── styles.css
├── node_modules/
```

Example `styles.css`:
```css
body {
  background-color: #f3f3f3;
}

.Vocs_H1 {
  color: red;
}
```

#### Importing CSS

##### In Layout Component
```tsx
// layout.tsx
import './global.css'
import './theme.css'

export default function Root({ children }) {
  return children
}
```

##### In Markdown Files
```markdown
import './theme.css'

# Hello world
This is me.
```

#### Tailwind Support

Vocs includes built-in Tailwind support. Enable it by importing in your `styles.css`:

```css
@import "tailwindcss";
``` 

### Twoslash

[TypeScript Twoslash](https://www.typescriptlang.org/dev/twoslash/) is a markup language for JavaScript and TypeScript that enhances code samples with type information and compiler features.

#### Type Queries

##### Extract Type (`^?`)
Get type information about an identifier:

```typescript
const example: string = "hello"
//    ^?
```

##### Completions (`^|`)
Show auto-complete information:

```typescript
type Example = { apple: 'foo' | 'bar' | 'baz' }
const example: Example = { apple: '|' }
//                              ^|
```

##### Highlighting (`^^^`)
Highlight specific code ranges:

```typescript
function add(foo: number, bar: number) {
//           ^^^
  return foo + bar
}
```

#### Code Cutting

##### Cut Above (`---cut---`)
Remove code above the marker from output:

```typescript
// Setup code
import { something } from 'somewhere'
// ---cut---
console.log(something)
```

##### Cut After (`---cut-after---`)
Remove code after the marker:

```typescript
console.log("This stays")
// ---cut-after---
console.log("This is removed")
```

#### Multi-file Support

Create multiple files in a single code block:

```typescript
// @filename: types.d.ts
export type User = {
  id: number
  name: string
}

// @filename: index.ts
import { User } from './types'
const user: User = {
  id: 1,
  name: 'John'
}
```

#### Compiler Flags

Control TypeScript behavior with compiler flags:

```typescript
// @strict: true
// @target: ES2020
// @lib: DOM,ES2020
```

Common flags include:
- `@noImplicitAny`
- `@strictNullChecks`
- `@allowJs`
- `@checkJs`
- `@jsx`
- `@module` 

### Markdown Snippets

You can include other Markdown files in your documentation using MDX imports.

#### Creating and Using Snippets

1. Create a snippet file:
```markdown
// snippet.mdx
### Hello world
This is my snippet.
```

2. Import and use the snippet:
```markdown
// example.mdx
import Snippet from './snippet.mdx'

# Example
This is an example of including a snippet.

<Snippet />
```

#### Passing Props to Snippets

Since snippets are React components, you can pass props:

```markdown
// example.mdx
import Snippet from './snippet.mdx'

<Snippet title="Hello world" content="This is my snippet." />
```

Access props in the snippet using the `props` global variable:

```markdown
// snippet.mdx
### {props.title}
{props.content}
``` 

## Code Snippets

Code Snippets in Vocs come in two forms:
- Virtual file snippets in your Markdown code
- Physical file snippets in your file system

### Virtual File Snippets

To create a virtual file snippet:

1. Define the snippet with a filename meta tag:

```ts filename="example.ts"
import { http, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

2. Import the snippet using the `// [!include ...]` marker:

```ts
// [!include example.ts]

const blockNumber = await client.getBlockNumber()
```

### Physical File Snippets

For physical file snippets:

1. Create a file in your codebase (e.g., `docs/snippets/example.ts`):

```ts
import { http, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

2. Import using the `// [!include ...]` marker with the file path:

```ts
// [!include ~/snippets/example.ts]

const blockNumber = await client.getBlockNumber()
```

### Regions

You can include specific regions of code using `// [!region]` and `// [!endregion]` markers:

```ts
// [!region import]
import { http, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'
// [!endregion import]

// [!region setup]
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
// [!endregion setup]
```

Then import specific regions:

```ts
// [!include ~/snippets/example.ts:import]
// [!include ~/snippets/example.ts:setup]
```

For duplicate variable declarations in different regions, use the `_$` suffix:

```ts
const block_$1 = await client.getBlock()
const block_$2 = await client.getBlock({ blockNumber: 42069n })
```

### Find and Replace

Use `/(find)/(replace)/` syntax to modify imported snippets:

```ts
// [!include ~/snippets/example.ts /viem/@viem\/core/ /mainnet/sepolia/]
```

### Tips

1. **Code Block Markers**: You can include markers like line highlights in snippets:
```ts
const blockNumber = await client.getBlockNumber() // [!code hl]
```

2. **Twoslash Integration**: Combine with Twoslash for type information:
```ts
const blockNumber = await client.getBlockNumber()
//    ^?
```

3. **Twoslash with Virtual Files**: Use multiple virtual files in Twoslash code blocks:
```ts twoslash [example.ts]
import { client } from './client.js'
const blockNumber = await client.getBlockNumber()
```

```ts twoslash [client.ts]
import { http, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
``` 