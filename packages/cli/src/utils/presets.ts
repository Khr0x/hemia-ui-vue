/**
 * Preset system for pre-configured component bundles
 * Usage: hemia init --preset dashboard
 */

export interface Preset {
  name: string
  description: string
  framework: string
  components: string[]
  config?: {
    tailwind?: Record<string, any>
    aliases?: Record<string, string>
  }
  dependencies?: string[]
  devDependencies?: string[]
}

/**
 * Built-in presets
 */
export const PRESETS: Record<string, Preset> = {
  dashboard: {
    name: "dashboard",
    description: "Complete dashboard with charts, tables, and forms",
    framework: "vue",
    components: ["button", "card", "input", "select", "table", "chart"],
    dependencies: [],
    devDependencies: []
  },
  auth: {
    name: "auth",
    description: "Authentication pages and components",
    framework: "vue",
    components: ["button", "input", "card", "form"],
    dependencies: [],
    devDependencies: []
  },
  landing: {
    name: "landing",
    description: "Landing page components",
    framework: "vue",
    components: ["button", "card", "hero", "features", "cta"],
    dependencies: [],
    devDependencies: []
  }
}

/**
 * Get preset by name
 */
export function getPreset(name: string): Preset | null {
  return PRESETS[name] || null
}

/**
 * List all available presets
 */
export function listPresets(): Preset[] {
  return Object.values(PRESETS)
}

/**
 * Load preset from remote URL (future feature)
 */
export async function loadPresetFromUrl(url: string): Promise<Preset | null> {
  // TODO: Implement remote preset loading
  // This would fetch a JSON file from a URL and validate it
  console.warn("Remote preset loading not implemented yet")
  return null
}
