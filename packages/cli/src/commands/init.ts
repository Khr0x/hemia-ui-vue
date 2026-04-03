import fs from "fs-extra"
import path from "path"
import pc from "picocolors"
import prompts from "prompts"

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

export async function init() {
  const configPath = path.resolve(process.cwd(), "hemia.config.json")

  if (await fs.pathExists(configPath)) {
    console.log(pc.yellow("⚠️  hemia.config.json already exists"))
    return
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

  if (detected) {
    console.log(pc.cyan(`🔍 Detected framework: ${detected}`))
  }

  const config = {
    framework,
    style: "default",
    tailwind: {
      config: "tailwind.config.ts",
      css: "src/assets/globals.css",
      prefix: ""
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils"
    }
  }

  await fs.writeJson(configPath, config, { spaces: 2 })
  console.log(pc.green(`✅ hemia.config.json created for ${framework}`))
}
