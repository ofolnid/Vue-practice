<script setup>
import { useThemeStore } from '@/stores/themeStore'
import { ElSwitch } from 'element-plus'

const themeStore = useThemeStore()
</script>

<template>
  <el-switch
    v-model="themeStore.theme"
    active-value="dark"
    inactive-value="light"
    active-text="Dark"
    inactive-text="Light"
  />
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
