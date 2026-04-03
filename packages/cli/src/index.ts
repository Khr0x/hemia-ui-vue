#!/usr/bin/env node
import { Command } from "commander"
import { add } from "./commands/add.js"
import { init } from "./commands/init.js"
import { list } from "./commands/list.js"

const program = new Command()

program
  .name("hemia")
  .description("hemia-ui CLI — multi-framework component generator inspired by shadcn/ui")
  .version("0.0.1")

program
  .command("init")
  .description("Initialize hemia in your project")
  .option("-t, --template <template>", "Project template (vite-vue, nuxt, next, etc.)")
  .option("--preset <preset>", "Use a preset configuration (dashboard, auth, landing)")
  .action(init)

program
  .command("add")
  .description("Add component(s) to your project")
  .argument("[components...]", "Component name(s) to add")
  .option("-f, --framework <framework>", "Target framework (vue, react, svelte, astro)")
  .option("-y, --yes", "Skip confirmation prompts")
  .action(add)

program
  .command("list")
  .description("List all available components")
  .option("-f, --framework <framework>", "Target framework (vue, react, svelte, astro)")
  .action(list)

program.parse()
