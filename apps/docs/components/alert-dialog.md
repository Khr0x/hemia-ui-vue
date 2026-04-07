# Alert Dialog

Un componente de diálogo de alerta que requiere confirmación del usuario antes de ejecutar una acción destructiva. Implementa el patrón de diseño de shadcn/ui con una experiencia de usuario fluida y animaciones.

## Instalación

```bash
bunx --bun hemia-lume@latest add alert-dialog
```

## Uso Básico

```vue
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline">Show Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

## Props

### AlertDialog

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogTrigger

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Renderizar como hijo del elemento padre |
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogContent

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Tamaño del diálogo |
| `persistent` | `boolean` | `false` | Si es true, no se cierra al hacer click fuera |
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogHeader

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogFooter

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogTitle

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogDescription

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogAction

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive'` | `'default'` | Variante del botón |
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogCancel

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases CSS adicionales |

### AlertDialogMedia

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases CSS adicionales |

## Sub-componentes

### AlertDialog

Contenedor principal que gestiona el estado del diálogo.

```vue
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Open Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <!-- Contenido del diálogo -->
  </AlertDialogContent>
</AlertDialog>
```

### AlertDialogTrigger

Botón que abre el diálogo. Usa `asChild` para personalizar el elemento.

```vue
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <!-- ... -->
</AlertDialog>
```

### AlertDialogContent

Contenedor del contenido del diálogo con overlay y animaciones.

```vue
<AlertDialogContent class="max-w-md">
  <!-- ... -->
</AlertDialogContent>
```

### AlertDialogHeader

Contenedor para el título y descripción. Soporta un slot `#media` para mostrar iconos centrados.

```vue
<AlertDialogHeader>
  <template #media>
    <AlertDialogMedia>
      <IconComponent />
    </AlertDialogMedia>
  </template>
  <AlertDialogTitle>Confirm Action</AlertDialogTitle>
  <AlertDialogDescription>
    Are you sure you want to proceed?
  </AlertDialogDescription>
</AlertDialogHeader>
```

### AlertDialogFooter

Contenedor para los botones de acción.

```vue
<AlertDialogFooter>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
  <AlertDialogAction>Confirm</AlertDialogAction>
</AlertDialogFooter>
```

### AlertDialogTitle

Título del diálogo.

```vue
<AlertDialogTitle>Delete Item</AlertDialogTitle>
```

### AlertDialogDescription

Descripción del diálogo.

```vue
<AlertDialogDescription>
  This will permanently delete your data.
</AlertDialogDescription>
```

### AlertDialogAction

Botón de confirmación (estilo primario por defecto). Usa `variant="destructive"` para acciones destructivas.

```vue
<AlertDialogAction>Continue</AlertDialogAction>
<!-- Para acciones destructivas -->
<AlertDialogAction variant="destructive">Delete</AlertDialogAction>
```

### AlertDialogCancel

Botón de cancelación.

```vue
<AlertDialogCancel>Cancel</AlertDialogCancel>
```

## Ejemplos

### Confirmación de eliminación

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const deleted = ref(false)

function handleDelete() {
  deleted.value = true
  // Lógica de eliminación
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">Delete Account</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete">Yes, delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

### Con acciones personalizadas

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

function handleContinue() {
  console.log('Continuing...')
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button>Continue</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Continue to next step?</AlertDialogTitle>
        <AlertDialogDescription>
          You are about to proceed to the next step in the process.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Go Back</AlertDialogCancel>
        <AlertDialogAction @click="handleContinue">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

### Con clase personalizada

```vue
<AlertDialogContent class="max-w-sm">
  <!-- Contenido -->
</AlertDialogContent>
```

### Dialog persistente

```vue
<AlertDialogContent persistent>
  <AlertDialogHeader>
    <AlertDialogTitle>Dialog Persistente</AlertDialogTitle>
    <AlertDialogDescription>
      Este diálogo no se cerrará al hacer click fuera.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Cancelar</AlertDialogCancel>
    <AlertDialogAction>Confirmar</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
```

## Comportamiento

- **Overlay**: Un fondo oscuro con opacidad (80%) cubre toda la pantalla
- **Posicionamiento**: El diálogo se centra tanto horizontal como verticalmente
- **Animaciones**: 
  - Fade in/out para el overlay (200ms)
  - Scale y fade para el contenido del diálogo
- **Cierre**: Se cierra al hacer clic en el overlay o en el botón Cancel (excepto con `persistent`)
- **Tamaño sm**: El contenido se centra y los botones ocupan el ancho completo del diálogo

## Accesibilidad

- El overlay tiene el rol de presentación
- Los diálogos se cierran al presionar Escape
- Navegación por teclado completa
- Compatible con lectores de pantalla

## Notas técnicas

- Utiliza `Teleport` de Vue para renderizar el diálogo en el `body`
- Implementa `provide/inject` para gestionar el estado entre componentes
- Usa `Transition` de Vue para animaciones fluidas
- Las clases de Tailwind CSS usan el patrón de shadcn/ui