import fs from "fs-extra"
import path from "path"
import { execSync } from "child_process"
import pc from "picocolors"

export type PackageManager = "bun" | "pnpm" | "yarn" | "npm"

/**
 * Detect package manager from lock files in the current directory
 */
export function detectPackageManager(cwd: string = process.cwd()): PackageManager {
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun"
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
  return "npm"
}

/**
 * Get install command for a package manager
 */
export function getInstallCommand(packageManager: PackageManager): string {
  const commands: Record<PackageManager, string> = {
    bun: "bun add",
    pnpm: "pnpm add",
    yarn: "yarn add",
    npm: "npm install"
  }
  return commands[packageManager]
}

/**
 * Install dependencies using the detected package manager
 */
export function installDependencies(
  dependencies: string[],
  options: { dev?: boolean; cwd?: string } = {}
): void {
  if (dependencies.length === 0) return

  const { dev = false, cwd = process.cwd() } = options
  const packageManager = detectPackageManager(cwd)
  const installCmd = getInstallCommand(packageManager)
  const devFlag = dev ? (packageManager === "npm" ? "--save-dev" : "-D") : ""
  
  const command = `${installCmd} ${dependencies.join(" ")} ${devFlag}`.trim()

  console.log(pc.cyan(`📦 Installing dependencies with ${packageManager}...`))
  console.log(pc.dim(`   ${command}`))

  try {
    execSync(command, { cwd, stdio: "inherit" })
    console.log(pc.green("✅ Dependencies installed successfully"))
  } catch (error) {
    console.log(pc.yellow("⚠️  Failed to install dependencies. Please install manually:"))
    console.log(pc.dim(`   ${command}`))
  }
}
