import path from "path"
import fs from "fs-extra"
import { resolveRegistryPath } from "./resolve-registry"

export async function copyComponent(name: string) {
  const frameworkRegistry = resolveRegistryPath("vue")
  const source = path.join(frameworkRegistry, name)
  const target = path.resolve(process.cwd(), "src/components/ui", name)

  await fs.copy(source, target, {
    filter: (src) => !src.endsWith("meta.json")
  })

  console.log(`✅ Component "${name}" added to src/components/ui/${name}`)
}
