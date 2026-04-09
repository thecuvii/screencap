import path from 'node:path'

export function resolveOutputPath(url: string, output: string | undefined): string {
  if (output) {
    return output.endsWith('.png') ? output : `${output}.png`
  }

  const hostname = new URL(url).hostname.replaceAll('.', '_')
  return path.resolve(`${hostname}.png`)
}
