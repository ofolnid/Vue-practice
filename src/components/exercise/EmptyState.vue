<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="empty-state">
    {{ message }}
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: 20px 30px;
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}
</style>
