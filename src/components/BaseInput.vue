<template>
  <input 
    class="input" 
    :class="{ 'input--error': hasError }"
    :type="type" 
    :value="modelValue"
    @input="(e) => modelValue = (e.target as HTMLInputElement).value"
    :placeholder="placeholder"
    :maxlength="maxLength"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string;
  hasError?: boolean;
  type?: string;
  maxLength?: number;
}>(), {
  type: 'text',
  hasError: false
})

const modelValue = defineModel<string>()
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  font-family: 'Courier New', monospace;

  &--error {
    border-color: #ef4444;
  }
  &:focus {
    border-color: #42b983;
  }
  &::placeholder {
    color: #9ca3af;
    font-family: inherit;
  }
}
</style>
