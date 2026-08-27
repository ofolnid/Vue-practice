<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/exercise/NavBar.vue'
import { useThemeStore } from './stores/themeStore.js'

const themeStore = useThemeStore()
</script>

<template>
  <div class="app" :class="themeStore.theme">
    <NavBar />
    <!-- 라우트에 맞는 컴포넌트 표시 -->
    <RouterView />
  </div>
</template>

<style>
.app {
  max-width: 650px;
  min-height: 100vh;
  margin: 0 auto;

  background-color: var(--color-bg);
  color: var(--color-text);
}
</style>
