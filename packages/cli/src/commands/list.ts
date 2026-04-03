import fs from "fs-extra"
import path from "path"
import pc from "picocolors"
import { createRequire } from "module"
import { readComponentMeta } from "../utils/registry.js"

const require = createRequire(import.meta.url)

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

function resolveRegistryPath(framework: string) {
  const registryRoot = path.dirname(
    require.resolve("@hemia/registry/package.json")
  )
  return path.join(registryRoot, "registry", framework)
}

export async function list(options: { framework?: string } = {}) {
  const framework = options.framework ?? getFrameworkFromConfig()
  const frameworkRegistry = resolveRegistryPath(framework)

  if (!(await fs.pathExists(frameworkRegistry))) {
    console.log(pc.red(`❌ No components found for framework "${framework}"`))
    process.exit(1)
  }

  const entries = await fs.readdir(frameworkRegistry, { withFileTypes: true })
  const components = entries.filter((entry) => entry.isDirectory())

  if (components.length === 0) {
    console.log(pc.yellow(`⚠️  No components available for ${framework}`))
    return
  }

  console.log(pc.cyan(`\n📦 Available components for ${framework}:\n`))

  for (const component of components) {
    const meta = await readComponentMeta(
      path.join(frameworkRegistry, component.name)
    )

    if (meta) {
      const deps = meta.registryDependencies?.length
        ? pc.dim(` (requires: ${meta.registryDependencies.join(", ")})`)
        : ""
      console.log(`   ${pc.green("●")} ${component.name}${deps}`)
    } else {
      console.log(`   ${pc.green("●")} ${component.name}`)
    }
  }

  console.log()
  console.log(pc.dim(`Total: ${components.length} component(s)`))
  console.log()
  console.log(pc.cyan("Usage:"))
  console.log(pc.dim(`  hemia add <component-name>`))
  console.log()
}
