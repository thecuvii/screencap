import { runAgentBrowser } from './run-agent-browser.ts'

export function waitForLoad(): Promise<string> {
  return runAgentBrowser(['wait', '--load', 'networkidle'])
}
