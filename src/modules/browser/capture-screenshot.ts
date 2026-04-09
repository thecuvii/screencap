import { chromium } from 'playwright'

export interface CaptureOptions {
  url: string
  width: number
  height: number
  deviceScaleFactor: number
  fullPage: boolean
  outputPath: string
}

export async function captureScreenshot(options: CaptureOptions): Promise<void> {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: options.width, height: options.height },
    deviceScaleFactor: options.deviceScaleFactor,
  })
  const page = await context.newPage()

  try {
    await page.goto(options.url, { waitUntil: 'networkidle' })
    await page.screenshot({ path: options.outputPath, fullPage: options.fullPage })
  } finally {
    await browser.close()
  }
}
