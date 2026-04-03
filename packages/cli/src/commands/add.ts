import path from "path"
import fs from "fs-extra"
import pc from "picocolors"
import { createRequire } from "module"

const require = createRequire(import.meta.url)

function resolveRegistryPath(framework: string) {
  const registryRoot = path.dirname(
    require.resolve("@hemia/registry/package.json")
  )
  return path.join(registryRoot, "registry", framework)
}

function getFrameworkFromConfig(): string {
  try {
    const config = fs.readJsonSync(
      path.resolve(process.cwd(), "hemia.config.json")
    )
    return config.framework ?? "vue"
  } catch {
    return "vue"
  }
}

export async function add(name: string, options: { framework?: string }) {
  const framework = options.framework ?? getFrameworkFromConfig()
  const frameworkRegistry = resolveRegistryPath(framework)
  const source = path.join(frameworkRegistry, name)

  if (!(await fs.pathExists(source))) {
    console.log(pc.red(`❌ Component "${name}" not found in registry for framework "${framework}"`))
    process.exit(1)
  }

  const target = path.resolve(process.cwd(), "src/components/ui", name)

  await fs.copy(source, target, {
    filter: (src) => !src.endsWith("meta.json")
  })

  console.log(pc.green(`✅ Component "${name}" added to src/components/ui/${name} (${framework})`))
}
