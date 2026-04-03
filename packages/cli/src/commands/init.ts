import fs from "fs-extra"
import path from "path"
import pc from "picocolors"
import prompts from "prompts"
import { GLOBALS_CSS_TEMPLATE, TAILWIND_CONFIG_TEMPLATE, getTemplateConfig } from "../utils/templates.js"
import { installDependencies } from "../utils/package-manager.js"

const SUPPORTED_FRAMEWORKS = ["vue", "react", "svelte", "astro"] as const
type Framework = typeof SUPPORTED_FRAMEWORKS[number]

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

export async function init(options: { template?: string } = {}) {
  const configPath = path.resolve(process.cwd(), "hemia.config.json")

  if (await fs.pathExists(configPath)) {
    console.log(pc.yellow("⚠️  hemia.config.json already exists"))
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Do you want to overwrite it?",
      initial: false
    })
    if (!overwrite) return
  }

  const detected = detectFramework()

  const { framework } = detected
    ? { framework: detected }
    : await prompts({
        type: "select",
        name: "framework",
        message: "Which framework are you using?",
        choices: SUPPORTED_FRAMEWORKS.map((f) => ({ title: f, value: f }))
      })

  if (!framework) {
    console.log(pc.red("❌ Framework selection required"))
    process.exit(1)
  }

  if (detected) {
    console.log(pc.cyan(`🔍 Detected framework: ${detected}`))
  }

  // Get template configuration
  const templateConfig = getTemplateConfig(framework, options.template)

  // Create config file
  const config = {
    framework,
    style: "default",
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
  console.log(pc.green(`✅ Created hemia.config.json`))

  // Ask to write CSS and Tailwind config
  const { writeFiles } = await prompts({
    type: "confirm",
    name: "writeFiles",
    message: "Write globals.css and tailwind.config.ts?",
    initial: true
  })

  if (writeFiles) {
    // Write globals.css
    const cssPath = path.resolve(process.cwd(), templateConfig.globalsCssPath)
    await fs.ensureDir(path.dirname(cssPath))
    
    if (await fs.pathExists(cssPath)) {
      const { overwriteCss } = await prompts({
        type: "confirm",
        name: "overwriteCss",
        message: `${templateConfig.globalsCssPath} already exists. Overwrite?`,
        initial: false
      })
      if (overwriteCss) {
        await fs.writeFile(cssPath, GLOBALS_CSS_TEMPLATE)
        console.log(pc.green(`✅ Updated ${templateConfig.globalsCssPath}`))
      }
    } else {
      await fs.writeFile(cssPath, GLOBALS_CSS_TEMPLATE)
      console.log(pc.green(`✅ Created ${templateConfig.globalsCssPath}`))
    }

    // Write tailwind.config.ts
    const tailwindPath = path.resolve(process.cwd(), templateConfig.tailwindConfigPath)
    
    if (await fs.pathExists(tailwindPath)) {
      const { overwriteTailwind } = await prompts({
        type: "confirm",
        name: "overwriteTailwind",
        message: `${templateConfig.tailwindConfigPath} already exists. Overwrite?`,
        initial: false
      })
      if (overwriteTailwind) {
        await fs.writeFile(tailwindPath, TAILWIND_CONFIG_TEMPLATE)
        console.log(pc.green(`✅ Updated ${templateConfig.tailwindConfigPath}`))
      }
    } else {
      await fs.writeFile(tailwindPath, TAILWIND_CONFIG_TEMPLATE)
      console.log(pc.green(`✅ Created ${templateConfig.tailwindConfigPath}`))
    }
  }

  // Ask to install dependencies
  const { installDeps } = await prompts({
    type: "confirm",
    name: "installDeps",
    message: "Install base dependencies (tailwindcss, autoprefixer, postcss)?",
    initial: true
  })

  if (installDeps) {
    console.log() // Empty line
    const baseDeps = ["tailwindcss", "autoprefixer", "postcss"]
    installDependencies(baseDeps, { dev: true })

    // Install framework peer dependency
    console.log() // Empty line
    const frameworkPkg = framework === "vue" ? "@hemia/vue" : `@hemia/${framework}`
    console.log(pc.cyan(`📦 Installing ${frameworkPkg}...`))
    console.log(pc.dim(`   When published, run: npm install ${frameworkPkg}`))
  }

  console.log()
  console.log(pc.green("🎉 All done! Run the following to add components:"))
  console.log(pc.cyan(`   hemia add button`))
  console.log()
}
