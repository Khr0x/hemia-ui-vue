# @hemia/ui – Copilot Instructions

## 🧠 Qué es este proyecto

`@hemia/ui` es un **sistema generador de UI multi-framework** inspirado en shadcn/ui.

**NO es una librería tradicional.** Los componentes se **copian al proyecto del usuario** vía CLI, no se importan desde npm.

Soporta (o soportará) Vue, React, Svelte y Astro desde una base compartida.

---

## 🏗️ Arquitectura del monorepo

```
hemia-ui/
├── apps/
│   ├── web/              # Playground Vue 3 + Vite + Tailwind
│   └── docs/             # Documentación VitePress (multi-framework)
├── packages/
│   ├── core/             # @hemia/core — runtime + tokens (framework-agnostic)
│   ├── vue/              # @hemia/vue — generator utils para Vue 3
│   ├── registry/         # @hemia/registry — templates por framework
│   │   └── registry/
│   │       ├── vue/      # componentes Vue
│   │       └── react/    # placeholder futuro
│   └── cli/              # @hemia/cli — CLI universal
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

---

## 📦 Packages

| Package | Scope | Rol |
|---|---|---|
| `core` | `@hemia/core` | `cn()`, `cva`, tokens CSS — sin dependencia de framework |
| `vue` | `@hemia/vue` | Re-exporta `@hemia/core` + generator utils para Vue 3 |
| `registry` | `@hemia/registry` | Templates de componentes organizados por framework |
| `cli` | `hemia-ui` | CLI ejecutable (`bunx hemia-ui@latest`) — bin aliases: `hemia`, `hemia-ui` |

> ⚠️ `@hemia/vue` re-exporta todo desde `@hemia/core`. En proyectos Vue, solo instalar `@hemia/vue`.
> 💡 El CLI se publica como `hemia-ui` para permitir `bunx hemia-ui@latest init` (similar a shadcn).

---

## 🔧 Stack tecnológico

- **Frameworks soportados**: Vue 3 (activo), React / Svelte / Astro (próximamente)
- **Estilos**: Tailwind CSS v3 + CSS variables para tokens
- **Variantes**: `class-variance-authority` (cva)
- **Merge de clases**: `tailwind-merge` + `clsx` via función `cn()`
- **Build de packages**: Vite (library mode) + `vite-plugin-dts`
- **CLI build**: `tsup`
- **Monorepo**: pnpm workspaces + Turborepo
- **TypeScript**: strict mode, moduleResolution Bundler
- **Docs**: VitePress

---

## 📐 Principios de diseño

1. **Local-first** → los componentes viven en el proyecto del usuario, no en `node_modules`
2. **CLI-driven** → todo se genera vía `hemia add <componente>`
3. **Multi-framework** → misma arquitectura base para Vue, React, Svelte, Astro
4. **Headless & composable** → sin estilos forzados, todo override-able
5. **Themeable** → design tokens via CSS variables (`hsl(var(--primary))`)
6. **TypeScript-first** → tipos exportados para todas las variantes

---

## 🔑 Patrones clave

### `cn()` — merge de clases Tailwind
```ts
// packages/core/src/runtime/cn.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- Siempre usar `cn()` para combinar clases en componentes
- Nunca usar concatenación de strings directa para clases Tailwind
- Viene de `@hemia/core` — disponible en todos los frameworks

---

### `cva()` — variantes de componentes
```ts
// Ejemplo: button.variants.ts (Vue)
import { cva, type VariantProps } from "@hemia/vue"

export const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "md" }
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
```
- Cada componente tiene su propio archivo `.variants.ts`
- Siempre exportar el tipo `VariantProps`
- Siempre definir `defaultVariants`
- Importar desde el package del framework (`@hemia/vue`), no desde `@hemia/core` directamente

---

### Estructura de un componente en el registry
```
packages/registry/registry/<framework>/<nombre>/
├── <nombre>.vue           # Componente (extensión según framework)
├── <nombre>.variants.ts   # Variantes con cva
└── meta.json              # Metadatos para el CLI
```

Ejemplo Vue:
```
packages/registry/registry/vue/button/
├── button.vue
├── button.variants.ts
└── meta.json
```

---

### `meta.json` de un componente
```json
{
  "name": "component-name",
  "framework": "vue",
  "type": "component",
  "files": ["component.vue", "component.variants.ts"],
  "registryDependencies": [],
  "dependencies": ["class-variance-authority"],
  "peerDependencies": ["@hemia/vue"]
}
```

> El campo `"framework"` es obligatorio. Valores: `"vue"` | `"react"` | `"svelte"` | `"astro"`

---

### Estructura de un componente Vue
```vue
<script setup lang="ts">
import { componentVariants, type ComponentVariants } from "./component.variants"
import { cn } from "@hemia/vue"

const props = defineProps<{
  variant?: ComponentVariants["variant"]
  size?: ComponentVariants["size"]
  class?: string
}>()
</script>

<template>
  <element :class="cn(componentVariants({ variant, size }), props.class)">
    <slot />
  </element>
</template>
```

**Reglas para componentes Vue:**
- Siempre usar `<script setup lang="ts">`
- Siempre aceptar prop `class?: string` para permitir override externo
- Siempre usar `cn()` combinando variantes + prop class
- Siempre usar `<slot />` para contenido
- Sin estilos scoped (`<style scoped>`) — todo via Tailwind
- Importar `cn` desde `@hemia/vue`, no desde `@hemia/core`

---

## 🎨 Design Tokens

Los tokens viven en `@hemia/core` y son compartidos por todos los frameworks.

```ts
// packages/core/src/tokens/colors.ts
export const colors = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  destructive: "hsl(var(--destructive))",
  muted: "hsl(var(--muted))",
  accent: "hsl(var(--accent))",
}

// packages/core/src/tokens/radius.ts
export const radius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
}
```

CSS variables base (en `apps/web/src/assets/globals.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 222.2 47.4% 11.2%;
    --secondary: 210 40% 96.1%;
    --destructive: 0 84.2% 60.2%;
    --muted: 210 40% 96.1%;
    --accent: 210 40% 96.1%;
    --radius-sm: 0.5rem;
    --radius-md: 1rem;
    --radius-lg: 1.5rem;
  }
}
```

---

## ⚙️ CLI (`hemia-ui`)

### Comandos disponibles
```bash
# Inicializar proyecto
hemia init                              # Detecta framework y genera config
hemia init -t nuxt                      # Con template específico (vite-vue, nuxt, next)
hemia init --preset dashboard           # Con preset de componentes

# Agregar componentes
hemia add button                        # Un componente
hemia add button card badge             # Múltiples componentes
hemia add card --framework react        # Override de framework
hemia add button -y                     # Sin confirmación de sobrescritura

# Listar componentes disponibles
hemia list                              # Lista para framework del config
hemia list --framework react            # Lista para framework específico

# Uso con bunx (recomendado)
bunx hemia-ui@latest init
bunx hemia-ui@latest add button
```

### `hemia.config.json` (generado por `init`)
```json
{
  "framework": "vue",
  "style": "default",
  "template": "vite-vue",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/assets/globals.css",
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

> El campo `"framework"` es detectado automáticamente desde `package.json` del proyecto.
> Si no se puede detectar, el CLI pregunta interactivamente.
> El campo `"template"` determina rutas por defecto según el tipo de proyecto.

### Reglas del CLI
- Usar `commander` para definir comandos
- Usar `picocolors` para output de colores (no chalk)
- Usar `fs-extra` para operaciones de archivos
- Usar `createRequire(import.meta.url)` para resolver paths en ESM
- El comando `add` lee `hemia.config.json` para determinar el framework
- El comando `add` nunca copia `meta.json` al proyecto del usuario
- Verificar existencia del componente en registry antes de copiar
- El CLI copia desde `@hemia/registry/registry/<framework>/<nombre>/`
- **Instalación automática de deps**: detectar package manager (bun/pnpm/yarn/npm) e instalar `dependencies` y `devDependencies` del `meta.json`
- **Dependencias en cadena**: procesar `registryDependencies` recursivamente y copiar todos los componentes necesarios
- **Confirmación de sobrescritura**: preguntar antes de sobreescribir componentes existentes (skip con `--yes`)
- **Soporte múltiples componentes**: `hemia add button card badge` instala todos en un comando

### Detección automática de framework en `init`
```
package.json tiene "vue"    → framework: "vue"
package.json tiene "react"  → framework: "react"
package.json tiene "svelte" → framework: "svelte"
package.json tiene "astro"  → framework: "astro"
no detectado                → prompt interactivo
```

### Detección de package manager
El CLI detecta automáticamente el package manager del proyecto:
```
bun.lockb        → bun add
pnpm-lock.yaml   → pnpm add
yarn.lock        → yarn add
package-lock.json → npm install
```

### Sistema de templates
Templates predefinidos adaptan las rutas según el tipo de proyecto:
- `vite-vue` → `src/assets/globals.css`, `src/components`
- `nuxt` → `assets/css/globals.css`, `components/`
- `next` → `src/app/globals.css`, `src/components`

Ejemplo: `hemia init -t nuxt` configura rutas específicas para Nuxt 3.

### Sistema de presets (base implementada)
Presets son bundles predefinidos de componentes:
```typescript
// packages/cli/src/utils/presets.ts
export interface Preset {
  name: string
  description: string
  framework: string
  components: string[]        // Componentes a instalar
  config?: { ... }            // Configuración custom
  dependencies?: string[]     // npm deps adicionales
}
```

Presets actuales:
- `dashboard` → button, card, input, select, table, chart
- `auth` → button, input, card, form
- `landing` → button, card, hero, features, cta

> ⚠️ El flag `--preset` está implementado en la interfaz pero requiere integración completa con `add`.

### Estructura interna del CLI
```
packages/cli/src/
├── index.ts                    # Entry point con commander routes
├── commands/
│   ├── add.ts                  # Comando add (con auto-install deps)
│   ├── init.ts                 # Comando init (con templates)
│   └── list.ts                 # Comando list
└── utils/
    ├── package-manager.ts      # Detección de bun/pnpm/npm/yarn
    ├── registry.ts             # Lectura de meta.json y dependencias
    ├── templates.ts            # Templates de CSS y Tailwind config
    └── presets.ts              # Sistema de presets (base)
```

**Patrones clave:**
- Todos los comandos importan utilidades desde `utils/`
- `package-manager.ts` exporta `detectPackageManager()` y `installDependencies()`
- `registry.ts` exporta `readComponentMeta()` y `getAllDependencies()` (recursivo)
- `templates.ts` exporta `GLOBALS_CSS_TEMPLATE`, `TAILWIND_CONFIG_TEMPLATE` y `getTemplateConfig()`
- Usar `prompts` para confirmaciones interactivas
- Usar `execSync` de `child_process` para ejecutar comandos de instalación

---

## 📁 Exports por package

### `@hemia/core`
```ts
export * from "./runtime"   // cn(), cva, VariantProps
export * from "./tokens"    // colors, radius
```

### `@hemia/vue`
```ts
export * from "@hemia/core"   // re-exporta todo de core
export * from "./generator"   // copyComponent(), resolveRegistryPath()
```

Todos los packages usan exports map moderno:
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

---

## 🚫 Lo que NO hacer

- ❌ No crear componentes que se importen desde `node_modules` — deben copiarse via CLI
- ❌ No usar `<style scoped>` en componentes del registry
- ❌ No usar `require()` directamente — siempre `createRequire(import.meta.url)` en ESM
- ❌ No concatenar clases Tailwind con strings — siempre usar `cn()`
- ❌ No reinventar `cva` — usar `class-variance-authority` directamente
- ❌ No importar desde `@hemia/core` en componentes del registry — importar desde el package del framework (`@hemia/vue`)
- ❌ No agregar estilos hardcoded — todo debe referenciar CSS variables
- ❌ No crear packages `@hemia/react`, `@hemia/svelte`, `@hemia/astro` aún — solo cuando se implementen

---

## ✅ Checklist al agregar un nuevo componente (Vue)

1. Crear carpeta `packages/registry/registry/vue/<nombre>/`
2. Crear `<nombre>.variants.ts` con `cva`, importando desde `@hemia/vue`
3. Crear `<nombre>.vue` con `<script setup lang="ts">`, prop `class?`, y `cn()`
4. Crear `meta.json` con `"framework": "vue"`, archivos, deps y peerDeps
5. Documentar en `apps/docs/components/<nombre>.md`
6. Probar en `apps/web/`

---

## 🚀 Comandos de desarrollo

```bash
# Instalar todas las dependencias
pnpm install

# Build de todos los packages (respeta dependencias con turbo)
pnpm build

# Dev mode (watch)
pnpm dev

# Typecheck
pnpm typecheck
```

---

## 🔭 Evolución futura (no implementar aún)

- `@hemia/react` → componentes React (mismo patrón que `@hemia/vue`)
- `@hemia/svelte` → componentes Svelte
- `@hemia/astro` → componentes Astro
- Soporte multi-theme (dark mode, brand themes)
- Separar `@hemia/core` en `@hemia/runtime` + `@hemia/tokens` si el scope crece mucho
- Registry remoto (HTTP) además del local (npm package)