<script setup>
import { useThemeStore } from '@/stores/themeStore'
const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <button @click="toggleTheme">
    {{ themeStore.theme === 'dark' ? '🌙' : '☀️' }}
  </button>
</template>

<style scoped>
button {
  background-color: var(--color-control-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-control-text);
  padding: 8px 10px;
  cursor: pointer;
  font-size: 10px;
}
button:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text);
  background-color: var(--color-control-hover);
}
</style>
