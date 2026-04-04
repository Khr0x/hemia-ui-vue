/**
 * Templates for project initialization
 */

export const GLOBALS_CSS_TEMPLATE = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Color palette using HSL for easy theming */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 210 5% 80% / 30%;
    
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    
    /* Border radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius: 0.625rem;
  }

  .dark {
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 217.2 32.6% 50% / 30%;
    
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --radius: 0.625rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`

export const TAILWIND_CONFIG_TEMPLATE = `import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [],
} satisfies Config
`

export interface TemplateConfig {
  framework: string
  template?: string
  tailwindConfigPath: string
  globalsCssPath: string
  componentsPath: string
  utilsPath: string
}

/**
 * Get template configuration based on framework and template type
 */
export function getTemplateConfig(
  framework: string,
  template?: string
): TemplateConfig {
  // Default paths for different frameworks
  const configs: Record<string, Partial<TemplateConfig>> = {
    "vite-vue": {
      tailwindConfigPath: "tailwind.config.ts",
      globalsCssPath: "src/assets/globals.css",
      componentsPath: "src/components",
      utilsPath: "src/lib/utils"
    },
    nuxt: {
      tailwindConfigPath: "tailwind.config.ts",
      globalsCssPath: "assets/css/globals.css",
      componentsPath: "components",
      utilsPath: "utils"
    },
    next: {
      tailwindConfigPath: "tailwind.config.ts",
      globalsCssPath: "src/app/globals.css",
      componentsPath: "src/components",
      utilsPath: "src/lib/utils"
    }
  }

  const templateKey = template || `vite-${framework}`
  const config = configs[templateKey] || configs["vite-vue"]

  return {
    framework,
    template: templateKey,
    tailwindConfigPath: config.tailwindConfigPath!,
    globalsCssPath: config.globalsCssPath!,
    componentsPath: config.componentsPath!,
    utilsPath: config.utilsPath!
  }
}
