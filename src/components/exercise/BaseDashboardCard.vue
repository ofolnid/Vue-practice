<script setup></script>

<template>
  <div class="dashboard-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.dashboard-card {
  width: 100%;
  padding: 30px;
  background-color: var(--color-bg);
  color: var(--color-text);
  text-align: center;
}
</style>
