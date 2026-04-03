import path from "path"
import fs from "fs-extra"

export interface ComponentMeta {
  name: string
  framework: string
  type: "component" | "hook" | "util"
  files: string[]
  registryDependencies?: string[]
  dependencies?: string[]
  peerDependencies?: string[]
  devDependencies?: string[]
}

/**
 * Read component metadata from meta.json
 */
export async function readComponentMeta(
  componentPath: string
): Promise<ComponentMeta | null> {
  const metaPath = path.join(componentPath, "meta.json")
  
  if (!(await fs.pathExists(metaPath))) {
    return null
  }

  try {
    return await fs.readJson(metaPath)
  } catch {
    return null
  }
}

/**
 * Get all dependencies (direct and registry) for a component
 */
export async function getAllDependencies(
  componentName: string,
  registryPath: string,
  visited: Set<string> = new Set()
): Promise<{
  components: string[]
  dependencies: string[]
  devDependencies: string[]
}> {
  // Prevent circular dependencies
  if (visited.has(componentName)) {
    return { components: [], dependencies: [], devDependencies: [] }
  }
  visited.add(componentName)

  const componentPath = path.join(registryPath, componentName)
  const meta = await readComponentMeta(componentPath)

  if (!meta) {
    return { components: [], dependencies: [], devDependencies: [] }
  }

  const components: string[] = [componentName]
  const dependencies: string[] = [...(meta.dependencies || []), ...(meta.peerDependencies || [])]
  const devDependencies: string[] = [...(meta.devDependencies || [])]

  // Recursively process registry dependencies
  if (meta.registryDependencies && meta.registryDependencies.length > 0) {
    for (const depName of meta.registryDependencies) {
      const depResult = await getAllDependencies(depName, registryPath, visited)
      components.push(...depResult.components)
      dependencies.push(...depResult.dependencies)
      devDependencies.push(...depResult.devDependencies)
    }
  }

  // Remove duplicates
  return {
    components: [...new Set(components)],
    dependencies: [...new Set(dependencies)],
    devDependencies: [...new Set(devDependencies)]
  }
}
