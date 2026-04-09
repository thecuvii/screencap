import { runAgentBrowser } from './run-agent-browser.ts'

export function openPage(url: string): Promise<string> {
  return runAgentBrowser(['open', url])
}
