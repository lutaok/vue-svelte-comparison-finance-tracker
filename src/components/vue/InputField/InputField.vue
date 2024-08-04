<script lang="ts">
interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
}
</script>

<script lang="ts" setup>
const value = defineModel<string | null>("value");
const error = defineModel<string | null>("error");

const { id, label, name, maxLength, pattern, placeholder, required } = defineProps<InputFieldProps>();
</script>

<template>
  <label id="{id}-input-label" class="flex flex-col gap-1">
    {{ label }}
    <input
      :id="`${id}-input`"
      :required="required"
      :name="name"
      type="text"
      :placeholder="placeholder"
      :pattern="pattern"
      class="p-1 text-black placeholder:text-slate-800 placeholder:text-opacity-30"
      :maxlength="maxLength"
      v-model="value"
      @input="error = null"
    />
  </label>
</template>
