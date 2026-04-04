<script setup lang="ts">
import { textfieldVariants, type TextfieldVariants } from "./textfield.variants"
import { cn } from "@hemia/lume-vue"
import { Field, FieldLabel, FieldDescription, FieldGroup } from "../field/index"

const props = defineProps<{
  label?: string
  description?: string
  error?: string
  for?: string
  variant?: TextfieldVariants["variant"]
  size?: TextfieldVariants["size"]
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  class?: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}
</script>

<template>
  <Field :class="props.class">
    <FieldLabel v-if="label" :for="for">{{ label }}</FieldLabel>
    <FieldGroup>
      <input
        :id="for"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="!!error"
        :class="cn(textfieldVariants({ variant: error ? 'error' : variant, size }), props.class)"
        @input="onInput"
      />
    </FieldGroup>
    <FieldDescription v-if="description && !error">{{ description }}</FieldDescription>
    <p v-if="error" class="text-[0.8rem] font-medium text-destructive">
      {{ error }}
    </p>
  </Field>
</template>