export interface PresetConfig {
  width: number
  height: number
  fullPage: boolean
}

const presets: Record<string, PresetConfig> = {
  viewport: { width: 1440, height: 900, fullPage: false },
  scroll: { width: 1440, height: 3600, fullPage: false },
  full: { width: 1440, height: 900, fullPage: true },
}

export function resolvePreset(name: string): PresetConfig {
  const preset = presets[name]
  if (!preset) {
    throw new Error(`Unknown preset: ${name}. Available: ${Object.keys(presets).join(', ')}`)
  }
  return preset
}
