import fs from "fs-extra"
import path from "path"
import pc from "picocolors"
import prompts from "prompts"
import {
  GLOBALS_CSS_TEMPLATE,
  GLOBALS_CSS_TEMPLATE_VUETIFY
} from "../utils/templates.js"

interface AddStylesOptions {
  yes?: boolean
  overwrite?: boolean
  force?: boolean
  cwd?: string
  silent?: boolean
  vuetify?: boolean
}

function log(message: string, options: AddStylesOptions) {
  if (!options.silent) {
    console.log(message)
  }
}

function info(message: string, options: AddStylesOptions) {
  if (!options.silent) {
    console.log(pc.cyan(message))
  }
}

/**
 * Extract CSS variables from a specific CSS block
 */
function extractCssVariablesFromBlock(content: string): Map<string, string> {
  const vars = new Map<string, string>()
  
  // Remove comments
  const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, "")
  
  // Match CSS variables: --variable-name: value;
  const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g
  let match
  while ((match = varRegex.exec(cleanContent)) !== null) {
    vars.set(match[1].trim(), match[2].trim())
  }
  
  return vars
}

/**
 * Extract a CSS section (like @theme, :root, [data-theme="dark"])
 * Note: @theme can be with or without "inline" keyword
 */
function extractCssSection(cssContent: string, selectorPattern: string): {
  content: string | null
  fullMatch: string | null
} {
  let regex: RegExp

  if (selectorPattern === '@theme') {
    // Match @theme with or without inline: @theme { or @theme inline {
    regex = /@theme\s+inline\s*\{([\s\S]*?)\n\}|@theme\s*\{([\s\S]*?)\n\}/
  } else if (selectorPattern === ':root') {
    regex = /:root\s*\{([\s\S]*?)\n\}/
  } else if (selectorPattern === '[data-theme="dark"]') {
    regex = /\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/
  } else {
    return { content: null, fullMatch: null }
  }

  const match = cssContent.match(regex)
  if (match) {
    // If @theme has inline, it's match[1], otherwise match[2]
    const content = match[1] || match[2]
    return {
      content: content,
      fullMatch: match[0]
    }
  }

  return { content: null, fullMatch: null }
}

/**
 * Merge variables for a specific section
 */
function mergeSectionVariables(
  existingVars: Map<string, string>,
  templateVars: Map<string, string>
): Map<string, string> {
  const merged = new Map(existingVars)
  
  // Template variables are added or replace existing ones
  for (const [key, value] of templateVars) {
    merged.set(key, value)
  }
  
  return merged
}

/**
 * Wrap HSL values without hsl() wrapper
 * HSL format: "210 40% 98%" or "210 5% 80% / 30%" (with opacity)
 */
function wrapHslValue(value: string): string {
  // If already wrapped, return as-is
  if (value.startsWith('hsl(') || value.startsWith('oklch(') || value.startsWith('lab(')) {
    return value
  }

  // Match HSL values: "210 40% 98%" or "210 5% 80% / 30%"
  // hsl(hue lightness saturation) or hsl(hue lightness saturation / alpha)
  const hslRegex = /^(\d+\.?\d*)\s+(\d+\.?\d*%)\s+(\d+\.?\d*%)(\s*\/\s*\d+\.?\d*%)?$/i

  if (hslRegex.test(value.trim())) {
    return `hsl(${value.trim()})`
  }

  // Try with simpler pattern: starts with a number and contains %
  const simpleRegex = /^(\d+\.?\d*)\s+\d+\.?\d*%/

  if (simpleRegex.test(value.trim()) && value.includes('%')) {
    return `hsl(${value.trim()})`
  }

  return value
}

/**
 * Format CSS variables into a block
 */
function formatCssBlock(selector: string, vars: Map<string, string>): string {
  const indent = '  '
  const varLines = Array.from(vars.entries())
    .map(([key, value]) => {
      const wrappedValue = wrapHslValue(value)
      return `${indent}--${key}: ${wrappedValue};`
    })
    .join('\n')

  // For @theme, always use inline variant
  if (selector === '@theme') {
    return `@theme inline {\n${varLines}\n}`
  }

  return `${selector} {\n${varLines}\n}`
}

/**
 * Add Vuetify declarations to CSS (for merge mode when user selects Vuetify)
 */
function addVuetifyDeclarations(cssContent: string): string {
  const vuetifyDeclarations = `@layer vuetify;\n@import "tailwindcss";\n@import "vuetify/styles" layer(vuetify);`

  // Check if already has @layer vuetety
  if (cssContent.includes('@layer vuetify')) {
    return cssContent
  }

  // Check if already has @import "vuetify/styles" layer(vuetify)
  if (cssContent.includes('@import "vuetify/styles"')) {
    return cssContent
  }

  // Remove existing @import "tailwindcss" since we'll add it in the vuetify block
  let cleanContent = cssContent.replace(/@import\s+"tailwindcss"\s*;?\n?/g, '')

  // Trim leading whitespace
  cleanContent = cleanContent.replace(/^\n+/, '')

  return `${vuetifyDeclarations}\n\n${cleanContent}`
}

/**
 * Merge CSS files preserving @theme, :root, and [data-theme="dark"] sections
 */
function mergeCssVariables(existingCss: string, templateCss: string): string {
  // Extract sections from template
  const templateTheme = extractCssSection(templateCss, '@theme')
  const templateRoot = extractCssSection(templateCss, ':root')
  const templateDark = extractCssSection(templateCss, '[data-theme="dark"]')
  
  // Extract sections from existing CSS
  const existingTheme = extractCssSection(existingCss, '@theme')
  const existingRoot = extractCssSection(existingCss, ':root')
  const existingDark = extractCssSection(existingCss, '[data-theme="dark"]')
  
  let result = existingCss
  
  // Merge @theme section
  if (templateTheme.content) {
    const templateThemeVars = extractCssVariablesFromBlock(templateTheme.content)
    
    if (existingTheme.fullMatch && existingTheme.content) {
      const existingThemeVars = extractCssVariablesFromBlock(existingTheme.content)
      const mergedVars = mergeSectionVariables(existingThemeVars, templateThemeVars)
      const newBlock = formatCssBlock('@theme', mergedVars)
      result = result.replace(existingTheme.fullMatch, newBlock)
    } else {
      // Add @theme section after @custom-variant or at the beginning
      const customVariantMatch = result.match(/@custom-variant[^;]+;/)
      if (customVariantMatch) {
        const newBlock = formatCssBlock('@theme', templateThemeVars)
        result = result.replace(
          customVariantMatch[0],
          `${customVariantMatch[0]}\n\n${newBlock}`
        )
      } else {
        const newBlock = formatCssBlock('@theme', templateThemeVars)
        result = `${newBlock}\n\n${result}`
      }
    }
  }
  
  // Merge :root section
  if (templateRoot.content) {
    const templateRootVars = extractCssVariablesFromBlock(templateRoot.content)
    
    if (existingRoot.fullMatch && existingRoot.content) {
      const existingRootVars = extractCssVariablesFromBlock(existingRoot.content)
      const mergedVars = mergeSectionVariables(existingRootVars, templateRootVars)
      const newBlock = formatCssBlock(':root', mergedVars)
      result = result.replace(existingRoot.fullMatch, newBlock)
    } else {
      // Add :root section after @theme (with or without inline)
      const themeMatch = result.match(/@theme(?:\s+inline)?\s*\{[\s\S]*?\n\}/)
      if (themeMatch) {
        const newBlock = formatCssBlock(':root', templateRootVars)
        result = result.replace(
          themeMatch[0],
          `${themeMatch[0]}\n\n${newBlock}`
        )
      } else {
        const newBlock = formatCssBlock(':root', templateRootVars)
        result = `${result}\n\n${newBlock}`
      }
    }
  }
  
  // Merge [data-theme="dark"] section
  if (templateDark.content) {
    const templateDarkVars = extractCssVariablesFromBlock(templateDark.content)
    
    if (existingDark.fullMatch && existingDark.content) {
      const existingDarkVars = extractCssVariablesFromBlock(existingDark.content)
      const mergedVars = mergeSectionVariables(existingDarkVars, templateDarkVars)
      const newBlock = formatCssBlock('[data-theme="dark"]', mergedVars)
      result = result.replace(existingDark.fullMatch, newBlock)
    } else {
      // Add [data-theme="dark"] section after :root
      const rootMatch = result.match(/:root\s*\{[\s\S]*?\n\}/)
      if (rootMatch) {
        const newBlock = formatCssBlock('[data-theme="dark"]', templateDarkVars)
        result = result.replace(
          rootMatch[0],
          `${rootMatch[0]}\n\n${newBlock}`
        )
      } else {
        const newBlock = formatCssBlock('[data-theme="dark"]', templateDarkVars)
        result = `${result}\n\n${newBlock}`
      }
    }
  }
  
  return result
}

/**
 * Get lume.config.json and extract CSS path
 */
function getConfigPaths(cwd: string): { globalsCssPath: string } | null {
  try {
    const config = fs.readJsonSync(path.resolve(cwd, "lume.config.json"))
    return {
      globalsCssPath: config.tailwind?.css ?? "src/assets/globals.css"
    }
  } catch {
    return null
  }
}

export async function addStyles(_args: string[] = [], options: AddStylesOptions = {}) {
  // Handle --help without requiring config
  if (options.silent === undefined && process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`
lume add-styles

Add globals.css with Tailwind v4 support

Options:
  -y, --yes      Skip confirmation prompt
  -o, --overwrite  Overwrite existing file (don't merge)
  -f, --force    Force overwrite without asking
  -c, --cwd      Working directory
  -s, --silent   Mute output
  -v, --vuetify  Use Vuetify template
  -h, --help     Show this help
`)
    return
  }

  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd()

  // Check if lume.config.json exists
  const configPath = path.resolve(cwd, "lume.config.json")
  if (!(await fs.pathExists(configPath))) {
    // If no config, use default paths
    const cssPath = path.resolve(cwd, "src/assets/globals.css")

    log(pc.cyan("\n📦 Adding styles to your project\n"), options)
    info("No lume.config.json found. Using default paths...", options)

    // Ask if user is using Vuetify
    let useVuetify = options.vuetify === true
    if (!options.vuetify && options.yes !== true) {
      const { vuetify } = await prompts({
        type: "confirm",
        name: "vuetify",
        message: "Are you using Vuetify?",
        initial: false
      })
      useVuetify = vuetify
    }

    const cssTemplate = useVuetify ? GLOBALS_CSS_TEMPLATE_VUETIFY : GLOBALS_CSS_TEMPLATE

    // Show recommendation if using Vuetify
    if (useVuetify) {
      log(pc.yellow("\n💡 Recommendation:"), options)
      log(pc.yellow("   If you have 'import \"vuetify/styles\"' in your main entry file,"), options)
      log(pc.yellow("   please comment or remove it to avoid CSS conflicts."), options)
    }

    await fs.ensureDir(path.dirname(cssPath))
    await fs.writeFile(cssPath, cssTemplate)
    log(pc.green(`✅ Created src/assets/globals.css`), options)

    log(pc.green("\n✅ Styles added successfully!"), options)
    return
  }

  const configPaths = getConfigPaths(cwd)
  if (!configPaths) {
    log(pc.red("❌ Could not read lume.config.json"), options)
    process.exit(1)
  }

  // Use config paths if they differ from defaults, otherwise use template defaults
  const cssPath = path.resolve(cwd, configPaths.globalsCssPath)

  const cssExists = await fs.pathExists(cssPath)

  log(pc.cyan("\n📦 Adding styles to your project\n"), options)

  // Ask if user is using Vuetify
  let useVuetify = options.vuetify === true
  if (!options.vuetify && options.yes !== true) {
    const { vuetify } = await prompts({
      type: "confirm",
      name: "vuetify",
      message: "Are you using Vuetify?",
      initial: false
    })
    useVuetify = vuetify
  }

  const cssTemplate = useVuetify ? GLOBALS_CSS_TEMPLATE_VUETIFY : GLOBALS_CSS_TEMPLATE

  // Show recommendation if using Vuetify
  if (useVuetify) {
    log(pc.yellow("\n💡 Recommendation:"), options)
    log(pc.yellow("   If you have 'import \"vuetify/styles\"' in your main entry file,"), options)
    log(pc.yellow("   please comment or remove it to avoid CSS conflicts."), options)
  }

  // If CSS doesn't exist, just write it
  if (!cssExists) {
    info("No existing CSS found. Writing new file...", options)

    await fs.ensureDir(path.dirname(cssPath))
    await fs.writeFile(cssPath, cssTemplate)
    log(pc.green(`✅ Created ${configPaths.globalsCssPath}`), options)

    log(pc.green("\n✅ Styles added successfully!"), options)
    return
  }

  // Determine if we should merge or overwrite
  let shouldMerge = options.yes
  let shouldOverwrite = options.overwrite || options.force

  // If file exists and not --yes, ask about merge/overwrite
  if (cssExists && !options.yes) {
    const { action } = await prompts({
      type: "select",
      name: "action",
      message: "globals.css already exists. What would you like to do?",
      choices: [
        { title: "Merge (recommended)", description: "Keep your variables, add missing ones from template", value: "merge" },
        { title: "Overwrite", description: "Replace with template (your custom styles will be lost)", value: "overwrite" },
        { title: "Skip", description: "Don't add styles", value: "skip" }
      ]
    })

    if (action === "skip") {
      log(pc.dim("Cancelled."), options)
      return
    }

    shouldMerge = action === "merge"
    shouldOverwrite = action === "overwrite"
  }

  // Handle CSS file
  if (cssExists) {
    if (shouldOverwrite && !shouldMerge) {
      await fs.writeFile(cssPath, cssTemplate)
      log(pc.green(`✅ Overwrote ${configPaths.globalsCssPath}`), options)
    } else if (shouldMerge) {
      let existingCss = await fs.readFile(cssPath, "utf-8")

      // Add Vuetify declarations if user selected Vuetify
      if (useVuetify) {
        existingCss = addVuetifyDeclarations(existingCss)
      }

      const mergedCss = mergeCssVariables(existingCss, cssTemplate)
      await fs.writeFile(cssPath, mergedCss)
      log(pc.green(`✅ Merged CSS variables in ${configPaths.globalsCssPath}`), options)
    }
  } else {
    await fs.ensureDir(path.dirname(cssPath))
    await fs.writeFile(cssPath, cssTemplate)
    log(pc.green(`✅ Created ${configPaths.globalsCssPath}`), options)
  }

  log(pc.green("\n✅ Styles added successfully!"), options)
}
