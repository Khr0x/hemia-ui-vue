# Card

Un componente de tarjeta flexible para agrupar contenido relacionado con encabezados, descripciones y acciones. Implementa el patrón de diseño de shadcn/ui.

## Instalación

```bash
bunx --bun hemia-lume@latest add card
```

## Uso Básico

```vue
<script setup lang="ts">
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Título</CardTitle>
      <CardDescription>Descripción</CardDescription>
    </CardHeader>
    <CardContent>
      Contenido aquí
    </CardContent>
    <CardFooter>
      <Button>Acción</Button>
    </CardFooter>
  </Card>
</template>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `'default' \| 'sm'` | `'default'` | Tamaño de la tarjeta |
| `class` | `string` | `''` | Clases CSS adicionales |

### Sub-componentes

| Componente | Props | Descripción |
|------------|-------|-------------|
| `CardHeader` | `class?: string` | Contenedor para título y descripción |
| `CardTitle` | `class?: string` | Título en negrita |
| `CardDescription` | `class?: string` | Descripción en color muted |
| `CardContent` | `class?: string` | Área de contenido principal |
| `CardFooter` | `class?: string` | Contenedor para botones de acción |
| `CardAction` | `class?: string` | Botones de acción posicionados arriba a la derecha |

## Tamaños

### Default

Tarjeta con padding estándar de `p-6`.

```vue
<Card>
  <CardHeader>
    <CardTitle>Tarjeta Completa</CardTitle>
    <CardDescription>Con todos los elementos</CardDescription>
  </CardHeader>
  <CardContent>
    Contenido más detallado aquí
  </CardContent>
  <CardFooter>
    <Button>Confirmar</Button>
  </CardFooter>
</Card>
```

### Small

Tarjeta con padding reducido de `p-4`, ideal para acciones rápidas.

```vue
<Card size="sm">
  <CardHeader>
    <CardTitle>Acción Rápida</CardTitle>
    <CardDescription>Descripción corta</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button size="sm" class="w-full">Guardar</Button>
  </CardFooter>
</Card>
```

## Ejemplos

### Con acciones (CardAction)

Los botones de acción se posicionan automáticamente en la esquina superior derecha.

```vue
<Card>
  <CardAction>
    <Button size="sm" variant="ghost">...</Button>
  </CardAction>
  <CardHeader>
    <CardTitle>Configuración</CardTitle>
    <CardDescription>Administra tus preferencias</CardDescription>
  </CardHeader>
  <CardContent>
    Ajusta la configuración de tu cuenta.
  </CardContent>
</Card>
```

### Footer con acciones

El footer muestra botones de acción al final de la tarjeta.

```vue
<Card>
  <CardHeader>
    <CardTitle>Confirmar Acción</CardTitle>
    <CardDescription>¿Estás seguro de continuar?</CardDescription>
  </CardHeader>
  <CardContent>
    Esta acción no se puede deshacer.
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Cancelar</Button>
    <Button size="sm">Confirmar</Button>
  </CardFooter>
</Card>
```

### Tarjeta pequeña con botón ancho

En tarjetas `size="sm"`, los botones en el footer ocupan todo el ancho (`w-full`).

```vue
<Card size="sm">
  <CardHeader>
    <CardTitle>Guardar</CardTitle>
    <CardDescription>Guardar cambios</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button size="sm" class="w-full">Guardar Ahora</Button>
  </CardFooter>
</Card>
```

### Tarjeta simple

Solo con encabezado y contenido.

```vue
<Card>
  <CardHeader>
    <CardTitle>Tarjeta Básica</CardTitle>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">
      Una tarjeta simple solo con título y contenido.
    </p>
  </CardContent>
</Card>
```

### Clase personalizada

```vue
<Card class="border-primary">
  <CardHeader>
    <CardTitle>Borde Personalizado</CardTitle>
  </CardHeader>
</Card>

<Card class="shadow-lg">
  <CardHeader>
    <CardTitle>Sombra Grande</CardTitle>
  </CardHeader>
</Card>

<Card class="bg-primary/5">
  <CardHeader>
    <CardTitle>Background Personalizado</CardTitle>
  </CardHeader>
</Card>
```

## Comportamiento

- **Sizes**: `default` usa `p-6`, `sm` usa `p-4`
- **CardAction**: Se posiciona absolutamente en `top-4 right-4` (o `top-2 right-2` en size sm)
- **CardFooter en sm**: Ocupa todo el ancho con `grid grid-cols-1 gap-2` y fondo `bg-muted/50`
- **CardHeader en sm**: Añade `pr-8` para dejar espacio al CardAction
- **Border-radius**: Usa `rounded-xl` estándar de shadcn
- **Background**: Usa `bg-card` y `text-card-foreground` del sistema de tokens

## Notas técnicas

- Utiliza provide/inject para comunicar el tamaño entre componentes
- El footer en tamaño sm tiene fondo diferenciado similar a AlertDialog
- Compatible con Tailwind CSS
- Todos los sub-componentes soportan la prop `class` para personalización