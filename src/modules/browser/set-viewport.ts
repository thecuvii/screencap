import { runAgentBrowser } from './run-agent-browser.ts'

export function setViewport(width: number, height: number): Promise<string> {
  return runAgentBrowser(['set', 'viewport', String(width), String(height)])
}
