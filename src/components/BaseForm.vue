<template>
  <form class="base-form">
    <div class="base-form__content">
      <slot></slot>
    </div>
  </form>
</template>

<script setup lang="ts">
</script>

<style scoped>
.base-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: max-content;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
}

.base-form__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
</style> 