import { define } from 'gunshi'

import { captureScreenshot } from '../modules/browser/capture-screenshot.ts'
import { resolveOutputPath } from '../modules/output/resolve-output-path.ts'
import { resolvePreset } from '../modules/preset/resolve-preset.ts'

const DEFAULT_WIDTH = 1440
const DEFAULT_HEIGHT = 900
const DEFAULT_SCALE = 3

export const screenshotCommand = define({
  name: 'screencap',
  description: 'Capture a web page screenshot as PNG',
  args: {
    url: {
      type: 'positional',
      description: 'URL to capture',
      required: true,
    },
    preset: {
      type: 'enum',
      short: 'p',
      choices: ['viewport', 'scroll', 'full'] as const,
      description: 'Preset size: viewport (1440x900), scroll (1400x2100), full (full page)',
    },
    width: {
      type: 'number',
      short: 'W',
      default: DEFAULT_WIDTH,
      description: 'Viewport width in pixels',
    },
    height: {
      type: 'number',
      short: 'H',
      default: DEFAULT_HEIGHT,
      description: 'Viewport height in pixels',
    },
    scale: {
      type: 'number',
      short: 's',
      default: DEFAULT_SCALE,
      description: 'Device scale factor (DPR)',
    },
    output: {
      type: 'string',
      short: 'o',
      description: 'Output file path (default: <hostname>.png)',
    },
    full: {
      type: 'boolean',
      short: 'f',
      default: false,
      description: 'Capture full page screenshot',
    },
  },
  run: async (ctx) => {
    const { url, output, scale } = ctx.values
    let { width, height, full } = ctx.values

    if (ctx.values.preset) {
      const config = resolvePreset(ctx.values.preset)
      width = config.width
      height = config.height
      full = config.fullPage
    }

    const outputPath = resolveOutputPath(url, output)

    await captureScreenshot({
      url,
      width,
      height,
      deviceScaleFactor: scale,
      fullPage: full,
      outputPath,
    })

    console.log(`Screenshot saved to ${outputPath}`)
  },
})
