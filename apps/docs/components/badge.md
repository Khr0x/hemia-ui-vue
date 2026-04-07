# Badge

Un componente de insignia pequeño y flexible para mostrar estados, etiquetas, conteos y otros elementos de interfaz de usuario. Implementa el patrón de diseño de shadcn/ui.

## Instalación

```bash
bunx --bun hemia-lume@latest add badge
```

## Uso Básico

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="ghost">Ghost</Badge>
  <Badge variant="link">Link</Badge>
</template>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Variante de estilo de la insignia |
| `class` | `string` | `''` | Clases CSS adicionales |

## Variantes

### Default

Insignia con color primario.

```vue
<Badge variant="default">Default</Badge>
```

### Secondary

Insignia con color secundario.

```vue
<Badge variant="secondary">Secondary</Badge>
```

### Destructive

Insignia para estados de error o acciones destructivas.

```vue
<Badge variant="destructive">Error</Badge>
```

### Outline

Insignia con estilo outline (sin fondo).

```vue
<Badge variant="outline">Outline</Badge>
```

### Ghost

Insignia con estilo ghost (transparente con hover).

```vue
<Badge variant="ghost">Ghost</Badge>
```

### Link

Insignia con estilo de enlace.

```vue
<Badge variant="link">Link</Badge>
```

## Ejemplos

### Con botón

```vue
<template>
  <button class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm">
    Notificaciones
    <Badge variant="secondary">3</Badge>
  </button>
</template>
```

### Con tarjeta

```vue
<template>
  <div class="rounded-lg border p-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-semibold">Proyecto Activo</h3>
        <p class="text-sm text-muted-foreground">En progreso</p>
      </div>
      <Badge variant="default">Activo</Badge>
    </div>
  </div>
</template>
```

### Con clase personalizada

```vue
<template>
  <Badge class="rounded-full">Completamente-redondo</Badge>
  <Badge class="border-primary text-primary">Color-personalizado</Badge>
</template>
```

### Estados múltiples

```vue
<template>
  <Badge variant="default">Activo</Badge>
  <Badge variant="secondary">Pendiente</Badge>
  <Badge variant="destructive">Error</Badge>
  <Badge variant="outline">Borrador</Badge>
</template>
```

## Comportamiento

- **Tamaño**: El tamaño de fuente es `text-xs` (12px) con padding horizontal de `px-2.5` y vertical de `py-0.5`
- **Border-radius**: Tiene un borde redondeado estándar de `rounded-md`
- **Transiciones**: Las variantes ghost y link tienen transiciones de hover
- **Font-weight**: Utiliza `font-semibold` para mayor énfasis

## Notas técnicas

- Utiliza `class-variance-authority` (cva) para gestionar las variantes
- Soporta cualquier clase CSS adicional mediante la prop `class`
- Compatible con Tailwind CSS
- El contenido se renderiza dentro de un elemento `div