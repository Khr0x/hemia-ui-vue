<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@hemia/lume-vue"
import { Field, FieldLabel, FieldDescription, FieldGroup } from "../field/index"

const textfieldVariants = cva(
  "flex h-9 w-full min-w-0 rounded-lg border border-lume-input bg-transparent px-2.5 py-1 text-base transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-lume-foreground placeholder:text-lume-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-lume-input/50 disabled:opacity-50 md:text-sm dark:bg-lume-input/30 dark:disabled:bg-lume-input/80 focus-within:ring-2 focus-within:ring-lume-primary/25",
  {
    variants: {
      variant: {
        default: "",
        error: "bg-lume-background border-lume-destructive",
      },
      size: {
        default: "",
        sm: "h-8",
        lg: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const textfieldIconVariants = cva(
  "text-lume-muted-foreground flex shrink-0 items-center",
  {
    variants: {
      size: {
        default: "size-4",
        sm: "size-3.5",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type TextfieldVariants = VariantProps<typeof textfieldVariants>
type TextfieldIconVariants = VariantProps<typeof textfieldIconVariants>

const props = defineProps<{
  label?: string
  description?: string
  error?: string
  forId?: string
  variant?: TextfieldVariants["variant"]
  size?: TextfieldVariants["size"]
  iconSize?: TextfieldIconVariants["size"]
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  class?: string
  prependIcon?: any
  prependInnerIcon?: any
  appendInnerIcon?: any
  appendIcon?: any
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}

// Compute padding classes for input based on inner icon presence
const getInputPaddingClass = () => {
  const padding = []
  if (props.prependInnerIcon) {
    padding.push("ps-1.5")
  } else {
    padding.push("ps-[var(--tf-padding-x)]")
  }
  if (props.appendInnerIcon) {
    padding.push("pe-1.5")
  } else {
    padding.push("pe-[var(--tf-padding-x)]")
  }
  return padding.join(" ")
}
</script>

<template>
  <Field :class="props.class">
    <FieldLabel v-if="label" :for="forId">{{ label }}</FieldLabel>
    
    <FieldGroup>
      
      <component
        v-if="prependIcon"
        :is="prependIcon"
        class="text-lume-muted-foreground flex shrink-0 items-center"
        :class="iconSize === 'sm' ? 'size-3.5' : iconSize === 'lg' ? 'size-5' : 'size-4'"
      />
      
      <div
        :aria-invalid="!!error"
        :class="cn(
          textfieldVariants({ variant: error ? 'error' : variant, size }),
          'flex flex-1 items-center',
          error
            ? 'border-lume-destructive ring-2 ring-lume-destructive/20 dark:border-lume-destructive/50 dark:ring-lume-destructive/40'
            : 'focus-within:ring-2 focus-within:border-lume-ring focus-within:ring-lume-ring/50'
        )"
      >
        <component
          v-if="prependInnerIcon"
          :is="prependInnerIcon"
          class="text-lume-muted-foreground flex shrink-0 items-center"
          :class="[
            iconSize === 'sm' ? 'size-3.5' : iconSize === 'lg' ? 'size-5' : 'size-4',
            'me-1.5'
          ]"
        />
        <input
          :id="forId"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="cn(
            'flex-1 bg-transparent placeholder:text-lume-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 w-full min-w-0 outline-none focus:outline-none focus-visible:outline-none',
            getInputPaddingClass()
          )"
          :style="{ '--tf-padding-x': '0.625rem' }"
          @input="onInput"
        />
        <component
          v-if="appendInnerIcon"
          :is="appendInnerIcon"
          class="text-lume-muted-foreground flex shrink-0 items-center"
          :class="[
            iconSize === 'sm' ? 'size-3.5' : iconSize === 'lg' ? 'size-5' : 'size-4',
            'ms-1.5'
          ]"
        />
      </div>
      
      <component
        v-if="appendIcon"
        :is="appendIcon"
        class="text-lume-muted-foreground flex shrink-0 items-center"
        :class="iconSize === 'sm' ? 'size-3.5' : iconSize === 'lg' ? 'size-5' : 'size-4'"
      />
    </FieldGroup>
    
    <FieldDescription v-if="description && !error">{{ description }}</FieldDescription>
    <p v-if="error" class="text-[0.8rem] font-medium text-lume-destructive">
      {{ error }}
    </p>
  </Field>
</template>