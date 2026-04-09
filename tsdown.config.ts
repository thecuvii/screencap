import { defineConfig } from 'vite-plus/pack'

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: 'esm',
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  {
    entry: { cli: 'src/cli.ts' },
    format: 'esm',
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
])
