<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="info-row">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
  </div>
</template>

<style scoped>
.info-row {
  display: flex;
  justify-content: space-between;

  padding: 14px 18px;
  margin-top: 8px;

  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
}
.info-row span {
  color: var(--color-text-muted);
}
.info-row strong {
  color: var(--color-text);
}
</style>
