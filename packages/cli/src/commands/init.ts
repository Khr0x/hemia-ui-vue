import fs from "fs-extra"
import path from "path"
import pc from "picocolors"
import prompts from "prompts"
import { GLOBALS_CSS_TEMPLATE, TAILWIND_CONFIG_TEMPLATE, getTemplateConfig } from "../utils/templates.js"
import { installDependencies } from "../utils/package-manager.js"

const SUPPORTED_FRAMEWORKS = ["vue", "react", "svelte", "astro"] as const
type Framework = typeof SUPPORTED_FRAMEWORKS[number]

interface InitOptions {
  template?: string
  preset?: string
  defaults?: boolean
  yes?: boolean
  force?: boolean
  cwd?: string
  silent?: boolean
  monorepo?: boolean
  reinstall?: boolean
  cssVariables?: boolean
  components?: string[]
}

function detectFramework(): Framework | null {
  try {
    const pkg = fs.readJsonSync(path.resolve(process.cwd(), "package.json"))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    if (deps["vue"]) return "vue"
    if (deps["react"]) return "react"
    if (deps["svelte"]) return "svelte"
    if (deps["astro"]) return "astro"
    return null
  } catch {
    return null
  }
}

function log(message: string, options: InitOptions) {
  if (!options.silent) {
    console.log(message)
  }
}

function warn(message: string, options: InitOptions) {
  if (!options.silent) {
    console.log(pc.yellow(`⚠️  ${message}`))
  }
}

function info(message: string, options: InitOptions) {
  if (!options.silent) {
    console.log(pc.cyan(message))
  }
}

export async function init(options: InitOptions = {}) {
  // Show "coming soon" messages for unimplemented options
  if (options.preset) {
    warn("Preset option is not implemented yet. Coming soon!", options)
  }

  if (options.defaults) {
    warn("Defaults option is not implemented yet. Coming soon!", options)
  }

  if (options.monorepo) {
    warn("Monorepo option is not implemented yet. Coming soon!", options)
  }

  if (options.reinstall) {
    warn("Reinstall option is not implemented yet. Coming soon!", options)
  }

  // Handle --no-monorepo flag
  if (options.monorepo === false) {
    // User explicitly opted out of monorepo - no message needed
  }

  // Handle --no-reinstall flag
  if (options.reinstall === false) {
    // User explicitly opted out of reinstall - no message needed
  }

  // Determine working directory
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Validate template
  const validTemplates = ["next", "vite", "start", "react-router", "laravel", "astro"]
  let template = options.template?.toLowerCase()

  if (template && !validTemplates.includes(template)) {
    warn(`Invalid template "${template}". Using default.`, options)
    template = undefined
  }

  const configPath = path.resolve(cwd, "lume.config.json")
  const configExists = await fs.pathExists(configPath)

  if (configExists && !options.force) {
    if (!options.yes) {
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: "lume.config.json already exists. Overwrite?",
        initial: false
      })
      if (!overwrite) {
        log("Cancelled.", options)
        return
      }
    }
  }

  const detected = detectFramework()

  let framework: Framework
  if (detected) {
    framework = detected
    info(`Detected framework: ${detected}`, options)
  } else if (!options.yes) {
    const { framework: selectedFramework } = await prompts({
      type: "select",
      name: "framework",
      message: "Which framework are you using?",
      choices: SUPPORTED_FRAMEWORKS.map((f) => ({ title: f, value: f }))
    })
    framework = selectedFramework
  } else {
    // Default to vue if --yes and no framework detected
    framework = "vue"
  }

  if (!framework) {
    log(pc.red("❌ Framework selection required"), options)
    process.exit(1)
  }

  // Get template configuration
  const templateConfig = getTemplateConfig(framework, template)

  // Determine CSS variables setting
  const useCssVariables = options.cssVariables !== false

  // Create config file
  const config = {
    framework,
    style: useCssVariables ? "css-variables" : "default",
    template: templateConfig.template,
    tailwind: {
      config: templateConfig.tailwindConfigPath,
      css: templateConfig.globalsCssPath,
      prefix: ""
    },
    aliases: {
      components: `@/${templateConfig.componentsPath}`,
      utils: `@/${templateConfig.utilsPath}`
    }
  }

  await fs.writeJson(configPath, config, { spaces: 2 })
  log(pc.green(`✅ Created lume.config.json`), options)

  // Ask to write CSS and Tailwind config (skip if --yes)
  let writeFiles = options.yes
  if (!options.yes) {
    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: "Write globals.css and tailwind.config.ts?",
      initial: true
    })
    writeFiles = confirm
  }

  if (writeFiles) {
    // Write globals.css
    const cssPath = path.resolve(cwd, templateConfig.globalsCssPath)
    await fs.ensureDir(path.dirname(cssPath))

    if (await fs.pathExists(cssPath)) {
      if (options.force || !options.yes) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${templateConfig.globalsCssPath} already exists. Overwrite?`,
          initial: false
        })
        if (overwrite) {
          await fs.writeFile(cssPath, GLOBALS_CSS_TEMPLATE)
          log(pc.green(`✅ Updated ${templateConfig.globalsCssPath}`), options)
        }
      }
    } else {
      await fs.writeFile(cssPath, GLOBALS_CSS_TEMPLATE)
      log(pc.green(`✅ Created ${templateConfig.globalsCssPath}`), options)
    }

    // Write tailwind.config.ts
    const tailwindPath = path.resolve(cwd, templateConfig.tailwindConfigPath)

    if (await fs.pathExists(tailwindPath)) {
      if (options.force || !options.yes) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${templateConfig.tailwindConfigPath} already exists. Overwrite?`,
          initial: false
        })
        if (overwrite) {
          await fs.writeFile(tailwindPath, TAILWIND_CONFIG_TEMPLATE)
          log(pc.green(`✅ Updated ${templateConfig.tailwindConfigPath}`), options)
        }
      }
    } else {
      await fs.writeFile(tailwindPath, TAILWIND_CONFIG_TEMPLATE)
      log(pc.green(`✅ Created ${templateConfig.tailwindConfigPath}`), options)
    }
  }

  // Ask to install dependencies (skip if --yes)
  let installDeps = options.yes
  if (!options.yes) {
    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: "Install base dependencies (tailwindcss, autoprefixer, postcss)?",
      initial: true
    })
    installDeps = confirm
  }

  if (installDeps) {
    log("", options)
    const baseDeps = ["tailwindcss", "autoprefixer", "postcss"]
    installDependencies(baseDeps, { dev: true })

    // Install framework peer dependency
    log("", options)
    const frameworkPkg = framework === "vue" ? "@hemia/lume-vue" : `@hemia/lume-${framework}`
    info(`📦 Installing ${frameworkPkg}...`, options)
    log(pc.dim(`   When published, run: npm install ${frameworkPkg}`), options)
  }

  log("", options)
  log(pc.green("🎉 All done! Run the following to add components:"), options)
  info(`   lume add button`, options)
  log("", options)
}