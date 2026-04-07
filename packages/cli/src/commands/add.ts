import path from "path"
import fs from "fs-extra"
import pc from "picocolors"
import prompts from "prompts"
import { createRequire } from "module"
import { installDependencies } from "../utils/package-manager.js"
import { getAllDependencies } from "../utils/registry.js"

const require = createRequire(import.meta.url)

interface AddOptions {
  yes?: boolean
  overwrite?: boolean
  cwd?: string
  all?: boolean
  path?: string
  silent?: boolean
  dryRun?: boolean
  diff?: string
  view?: string
  framework?: string
}

function resolveRegistryPath(framework: string) {
  const registryRoot = path.dirname(
    require.resolve("@hemia/lume-registry/package.json")
  )
  return path.join(registryRoot, "registry", framework)
}

function getFrameworkFromConfig(cwd: string): string {
  try {
    const config = fs.readJsonSync(path.resolve(cwd, "lume.config.json"))
    return config.framework ?? "vue"
  } catch {
    return "vue"
  }
}

function log(message: string, options: AddOptions) {
  if (!options.silent) {
    console.log(message)
  }
}

function warn(message: string, options: AddOptions) {
  if (!options.silent) {
    console.log(pc.yellow(`⚠️  ${message}`))
  }
}

export async function add(components: string | string[] = [], options: AddOptions = {}) {
  // Show "coming soon" messages for unimplemented options
  if (options.dryRun) {
    warn("Dry-run option is not implemented yet. Coming soon!", options)
  }

  if (options.diff) {
    warn("Diff option is not implemented yet. Coming soon!", options)
  }

  if (options.view) {
    warn("View option is not implemented yet. Coming soon!", options)
  }

  // Determine working directory
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Determine target path
  const targetBase = options.path
    ? path.resolve(cwd, options.path)
    : path.resolve(cwd, "src/components/ui")

  // Handle --all option to add all components
  const componentNames = options.all
    ? ["button", "card", "badge", "alert", "field", "icon", "textfield", "alert-dialog"]
    : Array.isArray(components)
      ? components
      : components
        ? [components]
        : []

  if (componentNames.length === 0 && !options.all) {
    log("No components specified. Use --all to add all components or specify component names.", options)
    process.exit(1)
  }

  const framework = options.framework ?? getFrameworkFromConfig(cwd)
  const frameworkRegistry = resolveRegistryPath(framework)

  if (!options.silent) {
    log(pc.cyan(`\n⚡ Adding component(s) to ${targetBase}/\n`), options)
  }

  // Collect all components and dependencies
  const allComponents = new Set<string>()
  const allDependencies = new Set<string>()
  const allDevDependencies = new Set<string>()

  for (const name of componentNames) {
    const componentPath = path.join(frameworkRegistry, name)

    if (!(await fs.pathExists(componentPath))) {
      log(pc.red(`❌ Component "${name}" not found in registry for framework "${framework}"`), options)
      process.exit(1)
    }

    const result = await getAllDependencies(name, frameworkRegistry)
    result.components.forEach((c) => allComponents.add(c))
    result.dependencies.forEach((d) => allDependencies.add(d))
    result.devDependencies.forEach((d) => allDevDependencies.add(d))
  }

  // Show what will be installed
  const componentsArray = Array.from(allComponents)
  log(pc.cyan(`📦 Components to install (${componentsArray.length}):`), options)
  log(pc.dim(`   ${componentsArray.join(", ")}\n`), options)

  // Ensure target directory exists
  await fs.ensureDir(targetBase)

  // Copy all components
  let copiedCount = 0
  for (const componentName of componentsArray) {
    const source = path.join(frameworkRegistry, componentName)
    const target = path.join(targetBase, `${componentName}.vue`)

    const targetExists = await fs.pathExists(target)

    // Handle overwrite options
    if (targetExists && !options.overwrite && !options.yes) {
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: pc.yellow(`Component "${componentName}" already exists. Overwrite?`),
        initial: false
      })

      if (!overwrite) {
        log(pc.dim(`   Skipped ${componentName}`), options)
        continue
      }
    }

    if (options.overwrite || options.yes || !targetExists) {
      await fs.copy(source, target, { overwrite: true })
      copiedCount++
      log(pc.green(`   ✓ ${componentName}`), options)
    }
  }

  // Install dependencies
  const deps = Array.from(allDependencies)
  const devDeps = Array.from(allDevDependencies)

  if (deps.length > 0) {
    log("", options)
    installDependencies(deps)
  }

  if (devDeps.length > 0) {
    log("", options)
    installDependencies(devDeps, { dev: true })
  }

  log(pc.green(`\n✅ Added ${copiedCount} component(s) to ${targetBase}/`), options)
}