<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="page-title">
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<style scoped>
.page-title {
  padding: 30px;
  background-color: var(--color-bg);
  text-align: center;
}
.page-title h2 {
  margin-bottom: 10px;
  color: var(--color-text);
}
.page-title p {
  color: var(--color-text-muted);
}
</style>
