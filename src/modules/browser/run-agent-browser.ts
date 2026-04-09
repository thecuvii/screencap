import { execFile } from 'node:child_process'

export function runAgentBrowser(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile('agent-browser', args, { maxBuffer: 50 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`agent-browser ${args.join(' ')} failed: ${stderr || error.message}`))
        return
      }
      resolve(stdout.trim())
    })
  })
}
