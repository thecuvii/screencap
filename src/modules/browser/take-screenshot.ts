import { runAgentBrowser } from './run-agent-browser.ts'

export function takeScreenshot(outputPath: string, fullPage: boolean): Promise<string> {
  const args = ['screenshot', outputPath]
  if (fullPage) {
    args.push('--full')
  }
  return runAgentBrowser(args)
}
