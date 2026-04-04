import path from "path"
import fs from "fs-extra"
import pc from "picocolors"
import prompts from "prompts"
import { createRequire } from "module"
import { installDependencies } from "../utils/package-manager.js"
import { getAllDependencies } from "../utils/registry.js"

const require = createRequire(import.meta.url)

function resolveRegistryPath(framework: string) {
  const registryRoot = path.dirname(
    require.resolve("@hemia/lume-registry/package.json")
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

async function copyComponent(
  componentName: string,
  source: string,
  targetBase: string,
  options: { skipConfirm?: boolean } = {}
): Promise<boolean> {
  const target = path.join(targetBase, componentName)
  const exists = await fs.pathExists(target)

  if (exists && !options.skipConfirm) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: pc.yellow(`Component "${componentName}" already exists. Overwrite?`),
      initial: false
    })

    if (!overwrite) {
      console.log(pc.dim(`   Skipped ${componentName}`))
      return false
    }
  }

  await fs.copy(source, target, {
    filter: (src) => !src.endsWith("meta.json"),
    overwrite: true
  })

  return true
}

export async function add(
  components: string | string[],
  options: { framework?: string; yes?: boolean }
) {
  const componentNames = Array.isArray(components) ? components : [components]
  const framework = options.framework ?? getFrameworkFromConfig()
  const frameworkRegistry = resolveRegistryPath(framework)
  const targetBase = path.resolve(process.cwd(), "src/components/ui")

  // Collect all components and dependencies
  const allComponents = new Set<string>()
  const allDependencies = new Set<string>()
  const allDevDependencies = new Set<string>()

  for (const name of componentNames) {
    const componentPath = path.join(frameworkRegistry, name)

    if (!(await fs.pathExists(componentPath))) {
      console.log(pc.red(`❌ Component "${name}" not found in registry for framework "${framework}"`))
      process.exit(1)
    }

    const result = await getAllDependencies(name, frameworkRegistry)
    result.components.forEach((c) => allComponents.add(c))
    result.dependencies.forEach((d) => allDependencies.add(d))
    result.devDependencies.forEach((d) => allDevDependencies.add(d))
  }

  // Show what will be installed
  const componentsArray = Array.from(allComponents)
  console.log(pc.cyan(`\n📦 Components to install (${componentsArray.length}):`))
  console.log(pc.dim(`   ${componentsArray.join(", ")}\n`))

  // Copy all components
  let copiedCount = 0
  for (const componentName of componentsArray) {
    const source = path.join(frameworkRegistry, componentName)
    const copied = await copyComponent(componentName, source, targetBase, {
      skipConfirm: options.yes
    })
    if (copied) {
      copiedCount++
      console.log(pc.green(`   ✓ ${componentName}`))
    }
  }

  // Install dependencies
  const deps = Array.from(allDependencies)
  const devDeps = Array.from(allDevDependencies)

  if (deps.length > 0) {
    console.log() // Empty line
    installDependencies(deps)
  }

  if (devDeps.length > 0) {
    console.log() // Empty line
    installDependencies(devDeps, { dev: true })
  }

  console.log(pc.green(`\n✅ Added ${copiedCount} component(s) to src/components/ui/`))
}
