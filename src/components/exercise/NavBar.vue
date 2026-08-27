<script setup>
import { RouterLink } from 'vue-router'
import UnitToggler from './UnitToggler.vue'
import ThemeToggler from './ThemeToggler.vue'
</script>

<template>
  <nav class="nav-bar">
    <div class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/statistics">Statistics</RouterLink>
    </div>
    <div class="nav-tools">
      <UnitToggler />
      <ThemeToggler />
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  gap: 20px;
  background-color: var(--color-bg);
}
.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}
.nav-bar a {
  text-decoration: none;
  color: var(--color-text);
  padding: 4px 8px;
  border-radius: 4px;
}
.nav-bar a:hover {
  background-color: var(--color-control-bg);
}
.nav-bar a.router-link-active {
  color: var(--color-text);
  font-weight: 700;
}
.nav-tools {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
