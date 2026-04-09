import { cli } from 'gunshi'

import { screenshotCommand } from './commands/screenshot.ts'

await cli(process.argv.slice(2), screenshotCommand, {
  name: 'screencap',
  version: '0.0.0',
})
