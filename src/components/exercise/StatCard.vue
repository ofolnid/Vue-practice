<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  subValue: {
    type: [String, Number],
    default: '',
  },
})
</script>

<template>
  <div class="stat-card">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
    <p v-if="subValue !== ''">{{ subValue }}</p>
  </div>
</template>

<style scoped>
.stat-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
}
.stat-card span {
  display: block;
  margin-bottom: 12px;
  color: var(--color-text-muted);
}
.stat-card strong {
  display: block;
  color: var(--color-text);
  font-size: 24px;
}
.stat-card p {
  margin-top: 6px;
  color: var(--color-text-secondary);
}
</style>
