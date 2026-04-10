#!/usr/bin/env node
import { Command } from "commander"
import { add } from "./commands/add.js"
import { addStyles } from "./commands/add-styles.js"
import { init } from "./commands/init.js"
import { list } from "./commands/list.js"

const program = new Command()

program
  .name("lume")
  .description("lume CLI — multi-framework component generator inspired by shadcn/ui")
  .version("0.0.1")

program
  .command("init")
  .description("Initialize your project and install dependencies")
  .allowUnknownOption(true)
  .argument("[components...]", "name, url or local path to component")
  .option("-t, --template <template>", "the template to use. (next, vite, start, react-router, laravel, astro)")
  .option("-p, --preset [name]", "use a preset configuration. (name, URL, or preset code)")
  .option("-d, --defaults", "use default configuration. (default: false)")
  .option("-y, --yes", "skip confirmation prompt. (default: true)")
  .option("-f, --force", "force overwrite of existing configuration. (default: false)")
  .option("-c, --cwd <cwd>", "the working directory. defaults to the current directory.")
  .option("-s, --silent", "mute output. (default: false)")
  .option("--monorepo", "scaffold a monorepo project.")
  .option("--no-monorepo", "skip the monorepo prompt.")
  .option("--reinstall", "re-install existing UI components.")
  .option("--no-reinstall", "do not re-install existing UI components.")
  .option("--css-variables", "use css variables for theming. (default: true)")
  .option("--no-css-variables", "do not use css variables for theming.")
  .option("-h, --help", "display help for command")
  .action(init)

program
  .command("add")
  .description("add a component to your project")
  .allowUnknownOption(true)
  .argument("[components...]", "name, url or local path to component")
  .option("-y, --yes", "skip confirmation prompt. (default: false)")
  .option("-o, --overwrite", "overwrite existing files. (default: false)")
  .option("-c, --cwd <cwd>", "the working directory. defaults to the current directory.")
  .option("-a, --all", "add all available components (default: false)")
  .option("-p, --path <path>", "the path to add the component to.")
  .option("-s, --silent", "mute output. (default: false)")
  .option("--dry-run", "preview changes without writing files. (default: false)")
  .option("--diff [path]", "show diff for a file.")
  .option("--view [path]", "show file contents.")
  .option("-h, --help", "display help for command")
  .option("-f, --framework <framework>", "Target framework (vue, react, svelte, astro)")
  .action(add)

program
  .command("add-styles")
  .description("add globals.css with Tailwind v4 support")
  .option("-y, --yes", "skip confirmation prompt. (default: false)")
  .option("-o, --overwrite", "overwrite existing files. (default: false)")
  .option("-f, --force", "force overwrite without asking. (default: false)")
  .option("-c, --cwd <cwd>", "the working directory. defaults to the current directory.")
  .option("-s, --silent", "mute output. (default: false)")
  .option("-v, --vuetify", "use Vuetify template. (default: false)")
  .option("-h, --help", "display help for command")
  .action(addStyles)

program
  .command("list")
  .description("List all available components")
  .option("-f, --framework <framework>", "Target framework (vue, react, svelte, astro)")
  .action(list)

program.parse()
