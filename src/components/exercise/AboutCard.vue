<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="about-card">
    <span>{{ label }}</span>
    <strong>{{ title }}</strong>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.about-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
}
.about-card span {
  display: block;
  margin-bottom: 12px;
  color: var(--color-text-muted);
}
.about-card strong {
  display: block;
  margin-bottom: 8px;
  color: var(--color-text);
  font-size: 22px;
}
.about-card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
