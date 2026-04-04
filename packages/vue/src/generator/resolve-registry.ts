import path from "path"
import { createRequire } from "module"

const require = createRequire(import.meta.url)

export function resolveRegistryPath(framework = "vue") {
  const registryRoot = path.dirname(
    require.resolve("@hemia/lume-registry/package.json")
  )
  return path.join(registryRoot, "registry", framework)
}
