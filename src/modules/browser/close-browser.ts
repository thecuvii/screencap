import { runAgentBrowser } from './run-agent-browser.ts'

export function closeBrowser(): Promise<string> {
  return runAgentBrowser(['close'])
}
