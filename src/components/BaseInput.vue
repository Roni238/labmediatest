<template>
  <input 
    class="input" 
    :class="{ 'input--error': hasError }"
    type="text" 
    v-model="modelValue"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>();

defineProps<{
  placeholder?: string;
  hasError?: boolean;
}>();
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.input:focus {
  border-color: #42b983;
}

.input--error {
  border-color: #ef4444;
}
</style>
