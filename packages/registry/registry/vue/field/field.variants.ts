import { cva, type VariantProps } from "@hemia/lume-vue"

export const fieldVariants = cva("grid gap-1.5 rounded-lg", {
  variants: {
    orientation: {
      horizontal: "grid-cols-[1fr,auto]",
      vertical: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

export const fieldLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export const fieldDescriptionVariants = cva("text-[0.8rem] text-muted-foreground")

export const fieldLegendVariants = cva("text-sm font-medium leading-none")

export const fieldGroupVariants = cva(
  "flex flex-wrap items-center gap-2 has-[input:focus]:rounded-lg has-[input:focus]:border-ring has-[input:focus]:ring-3 has-[input:focus]:ring-ring/50"
)

export const fieldSeparatorVariants = cva("h-px bg-border")

export type FieldVariants = VariantProps<typeof fieldVariants>
export type FieldLabelVariants = VariantProps<typeof fieldLabelVariants>
export type FieldDescriptionVariants = VariantProps<typeof fieldDescriptionVariants>
export type FieldLegendVariants = VariantProps<typeof fieldLegendVariants>
export type FieldGroupVariants = VariantProps<typeof fieldGroupVariants>
export type FieldSeparatorVariants = VariantProps<typeof fieldSeparatorVariants>