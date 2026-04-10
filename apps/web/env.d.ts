/// <reference types="vite/client" />
/// <reference types="@tailwindcss/vite" />

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

declare module "@/components/ui/alert" {
  import type { Component } from "vue"
  const Alert: Component
  const AlertTitle: Component
  const AlertDescription: Component
  const AlertAction: Component
  export { Alert, AlertTitle, AlertDescription, AlertAction }
}

declare module "@/components/ui/alert-dialog" {
  import type { Component } from "vue"
  const AlertDialog: Component
  const AlertDialogTrigger: Component
  const AlertDialogContent: Component
  const AlertDialogHeader: Component
  const AlertDialogFooter: Component
  const AlertDialogTitle: Component
  const AlertDialogDescription: Component
  const AlertDialogAction: Component
  const AlertDialogCancel: Component
  export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel }
}

