#!/usr/bin/env node
import { Command } from "commander"
import { add } from "./commands/add.js"
import { init } from "./commands/init.js"

const program = new Command()

program
  .name("hemia")
  .description("@hemia/ui CLI — multi-framework component generator")
  .version("0.0.1")

program
  .command("init")
  .description("Initialize hemia in your project")
  .action(init)

program
  .command("add <component>")
  .description("Add a component to your project")
  .option("-f, --framework <framework>", "Target framework (vue, react, svelte, astro)", "vue")
  .action(add)

program.parse()
