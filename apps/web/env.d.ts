/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vue shim for registry components
declare module "@/components/ui/field" {
  import type { Component } from "vue"
  const Field: Component
  const FieldLabel: Component
  const FieldDescription: Component
  const FieldGroup: Component
  const FieldLegend: Component
  const FieldSeparator: Component
  const FieldSet: Component
  export { Field, FieldLabel, FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet }
}

declare module "@/components/ui/textfield" {
  import type { Component } from "vue"
  const TextField: Component
  export { TextField }
}

