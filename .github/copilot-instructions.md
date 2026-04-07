# @hemia/lume – Copilot Instructions

## 🧠 Qué es este proyecto

`@hemia/lume` es un **sistema generador de UI multi-framework** inspirado en shadcn/ui.

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
│   ├── core/             # @hemia/lume-core — runtime + tokens (framework-agnostic)
│   ├── vue/              # @hemia/lume-vue — generator utils para Vue 3
│   ├── registry/         # @hemia/lume-registry — templates por framework
│   │   └── registry/
│   │       ├── vue/      # componentes Vue
│   │       └── react/    # placeholder futuro
│   └── cli/              # @hemia/lume — CLI universal
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

---

## 📦 Packages

| Package | Scope | Rol |
|---|---|---|
| `core` | `@hemia/lume-core` | `cn()`, `cva`, tokens CSS — sin dependencia de framework |
| `vue` | `@hemia/lume-vue` | Re-exporta `@hemia/lume-core` + generator utils para Vue 3 |
| `registry` | `@hemia/lume-registry` | Templates de componentes organizados por framework |
| `cli` | `@hemia/lume` | CLI ejecutable (`bunx @hemia/lume@latest`) |

> ⚠️ `@hemia/lume-vue` re-exporta todo desde `@hemia/lume-core`. En proyectos Vue, solo instalar `@hemia/lume-vue`.
> 💡 El CLI se publica como `@hemia/lume` para permitir `bunx @hemia/lume@latest init` (similar a shadcn).

---

## � Cómo se complementan los packages

### Flujo completo del sistema

#### 1. **@hemia/lume-core** (core) - La base compartida
Proporciona las utilidades base (`cn()`, `cva`) y tokens de diseño que **todos los frameworks** comparten. No tiene dependencia de Vue, React, etc.

```typescript
// Runtime utilities framework-agnostic
export { cn } from "./runtime/cn"
export { cva, type VariantProps } from "./runtime/variants"

// Design tokens compartidos
export { colors } from "./tokens/colors"
export { radius } from "./tokens/radius"
```

#### 2. **@hemia/lume-vue** - Adaptador de framework (runtime-only)
Re-exporta `@hemia/lume-core` para que los usuarios Vue **solo instalen un paquete** + utilidades auxiliares.

```typescript
export * from "@hemia/lume-core"   // re-exporta todo de core
export { resolveRegistryPath } from "./generator"  // utils de tooling
```

**IMPORTANTE**: Este package debe ser **runtime-only** (usable en el browser). NO debe tener:
- ❌ Operaciones de sistema de archivos (`fs`, `fs-extra`)
- ❌ Lógica de copia de componentes (eso es responsabilidad del CLI)
- ✅ Solo utilidades de resolución de paths para tooling externo

#### 3. **@hemia/lume-registry** - Source of truth de componentes
Almacena los **templates** de componentes organizados por framework.

```
packages/registry/registry/
├── vue/
│   └── button/
│       ├── button.vue           # Template self-contained (incluye cva)
│       └── meta.json            # Metadatos + dependencias
└── react/  # futuro
```

El CLI lee desde aquí para copiar al proyecto del usuario. Se publica a npm para que el CLI pueda resolverlo vía `require.resolve()`.

#### 4. **@hemia/lume** (CLI) - El orquestador
Copia componentes desde `@hemia/lume-registry` al proyecto del usuario.

```typescript
// Lectura del registry
import { createRequire } from "module"
const registryPath = require.resolve("@hemia/lume-registry/package.json")

// Copia solo el archivo .vue (self-contained, incluye variants dentro)
await fs.copy(
  path.join(source, "button.vue"),
  path.join(targetBase, "button.vue")
)

// Instala dependencias del meta.json
await installDependencies(dependencies)
```

### Diagrama de dependencias

```
Usuario (proyecto Vue)
  ├── instala → @hemia/lume-vue
  │               └── depende de → @hemia/lume-core
  │
  └── ejecuta → bunx @hemia/lume@latest add button
                  └── CLI lee → @hemia/lume-registry
                      └── copia archivos → src/components/ui/button/
                      └── instala → @hemia/lume-vue (si está en peerDependencies)
```

### Ejemplo de flujo de uso

```bash
# 1. Usuario inicializa proyecto Vue
bunx @hemia/lume@latest init
# → CLI detecta framework: "vue"
# → Genera hemia.config.json
# → Usuario instala @hemia/lume-vue manualmente o via preset

# 2. Usuario agrega componente
bunx @hemia/lume@latest add button
# → CLI lee @hemia/lume-registry/registry/vue/button/
# → Copia button.vue (self-contained) a src/components/ui/
# → NO copia meta.json
# → Instala deps del meta.json si no existen

# 3. Usuario usa el componente en su proyecto
```

```vue
<script setup>
import { Button } from "@/components/ui/button"
import { cn } from "@hemia/lume-vue"  // ← re-exportado de @hemia/lume-core
</script>

<template>
  <Button variant="outline">Click me</Button>
</template>
```

---

## �🔧 Stack tecnológico

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
- Viene de `@hemia/lume-core` — disponible en todos los frameworks

---

### `cva()` — variantes de componentes
```ts
// En el archivo .vue del componente (self-contained)
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { sm: '...', md: '...', lg: '...' }
  },
  defaultVariants: { variant: 'default', size: 'md' }
})

type ButtonVariants = VariantProps<typeof buttonVariants>
```
- Las variants van **dentro del archivo `.vue`** (self-contained)
- Siempre exportar el tipo `VariantProps`
- Siempre definir `defaultVariants`
- Importar desde `class-variance-authority` directamente
- Usar **comillas simples** en los strings de cva (ej: `'default'`, `'outline'`) en lugar de comillas dobles

---

### Estructura de un componente en el registry
```
packages/registry/registry/<framework>/<nombre>/
├── <nombre>.vue           # Componente self-contained (incluye variants)
└── meta.json              # Metadatos para el CLI
```

Ejemplo Vue:
```
packages/registry/registry/vue/button/
├── button.vue           # Self-contained (incluye variants)
└── meta.json
```

---

### `meta.json` de un componente
```json
{
  "name": "component-name",
  "framework": "vue",
  "type": "component",
  "files": ["component.vue"],
  "registryDependencies": [],
  "dependencies": ["class-variance-authority"],
  "peerDependencies": ["@hemia/lume-vue"]
}
```

> El campo `"framework"` es obligatorio. Valores: `"vue"` | `"react"` | `"svelte"` | `"astro"`

---

### Estructura de un componente Vue
```vue
<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@hemia/lume-vue"

// Variants definidas dentro del componente (self-contained)
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { sm: '...', md: '...', lg: '...' }
  },
  defaultVariants: { variant: 'default', size: 'md' }
})

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
}>()
</script>

<template>
  <button :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)">
    <slot />
  </button>
</template>
```

**Reglas para componentes Vue:**
- Siempre usar `<script setup lang="ts">`
- Las variants van dentro del `<script>` del componente (no en archivo separado)
- Siempre aceptar prop `class?: string` para permitir override externo
- Siempre usar `cn()` combinando variantes + prop class
- Siempre usar `<slot />` para contenido
- Sin estilos scoped (`<style scoped>`) — todo via Tailwind
- Importar `cn` desde `@hemia/lume-vue`, no desde `@hemia/lume-core`

---

## 🎨 Design Tokens

Los tokens viven en `@hemia/lume-core` y son compartidos por todos los frameworks.

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

## ⚙️ CLI (`@hemia/lume`)

### Comandos disponibles
```bash
# Inicializar proyecto
lume init                              # Detecta framework y genera config
lume init -t nuxt                      # Con template específico (vite-vue, nuxt, next)
lume init --preset dashboard           # Con preset de componentes

# Agregar componentes
lume add button                        # Un componente
lume add button card badge             # Múltiples componentes
lume add card --framework react        # Override de framework
lume add button -y                     # Sin confirmación de sobrescritura

# Listar componentes disponibles
lume list                              # Lista para framework del config
lume list --framework react            # Lista para framework específico

# Uso con bunx (recomendado)
bunx @hemia/lume@latest init
bunx @hemia/lume@latest add button
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
- El CLI copia desde `@hemia/lume-registry/registry/<framework>/<nombre>/`
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

### `@hemia/lume-core`
```ts
export * from "./runtime"   // cn(), cva, VariantProps
export * from "./tokens"    // colors, radius
```

### `@hemia/lume-vue`
```ts
export * from "@hemia/lume-core"   // re-exporta todo de core
export * from "./generator"   // resolveRegistryPath() (solo utils de tooling)
```

> ⚠️ `@hemia/lume-vue` NO debe contener lógica de copia de archivos. Es runtime-only.

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

### General
- ❌ No crear componentes que se importen desde `node_modules` — deben copiarse via CLI
- ❌ No usar `<style scoped>` en componentes del registry
- ❌ No usar `require()` directamente — siempre `createRequire(import.meta.url)` en ESM
- ❌ No concatenar clases Tailwind con strings — siempre usar `cn()`
- ❌ No reinventar `cva` — usar `class-variance-authority` directamente
- ❌ No importar desde `@hemia/lume-core` en componentes del registry — importar desde el package del framework (`@hemia/lume-vue`)
- ❌ No agregar estilos hardcoded — todo debe referenciar CSS variables
- ❌ No crear packages `@hemia/lume-react`, `@hemia/lume-svelte`, `@hemia/lume-astro` aún — solo cuando se implementen

### Específico de @hemia/lume-vue
- ❌ **NO agregar dependencia a `fs-extra` o `fs`** — debe ser runtime-only (usable en browser)
- ❌ **NO crear funciones que copien archivos** — esa responsabilidad es exclusiva del CLI
- ❌ **NO duplicar lógica del CLI** — `@hemia/lume-vue` solo provee utilidades de runtime y helpers de resolución
- ✅ Solo incluir utilidades que puedan ejecutarse en cualquier entorno (browser, Node, Bun, Deno)

---

## ✅ Checklist al agregar un nuevo componente (Vue)

1. Crear carpeta `packages/registry/registry/vue/<nombre>/`
2. Crear `<nombre>.vue` con `<script setup lang="ts">`, variants dentro del script, y `cn()`
3. Crear `meta.json` con `"framework": "vue"`, archivos, deps y peerDeps
4. Documentar en `apps/docs/components/<nombre>.md`
5. Probar en `apps/web/`

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

- `@hemia/lume-react` → componentes React (mismo patrón que `@hemia/lume-vue`)
- `@hemia/lume-svelte` → componentes Svelte
- `@hemia/lume-astro` → componentes Astro
- Soporte multi-theme (dark mode, brand themes)
- Separar `@hemia/lume-core` en `@hemia/lume-runtime` + `@hemia/lume-tokens` si el scope crece mucho
- Registry remoto (HTTP) además del local (npm package)