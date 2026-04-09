import { define } from 'gunshi'

import { closeBrowser } from '../modules/browser/close-browser.ts'
import { openPage } from '../modules/browser/open-page.ts'
import { setViewport } from '../modules/browser/set-viewport.ts'
import { takeScreenshot } from '../modules/browser/take-screenshot.ts'
import { waitForLoad } from '../modules/browser/wait-for-load.ts'
import { resolveOutputPath } from '../modules/output/resolve-output-path.ts'

const DEFAULT_WIDTH = 1440
const DEFAULT_HEIGHT = 900

export const screenshotCommand = define({
  name: 'screencap',
  description: 'Capture a web page screenshot as PNG',
  args: {
    url: {
      type: 'positional',
      description: 'URL to capture',
      required: true,
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
    const { url, width, height, output, full } = ctx.values
    const outputPath = resolveOutputPath(url, output)

    try {
      await setViewport(width, height)
      await openPage(url)
      await waitForLoad()
      await takeScreenshot(outputPath, full)
      console.log(`Screenshot saved to ${outputPath}`)
    } finally {
      await closeBrowser()
    }
  },
})
