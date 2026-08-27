<script setup>
defineProps({
  distribution: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="distribution-card">
    <h3>현재 날씨 분포</h3>

    <div class="distribution-list">
      <div v-for="(count, status) in distribution" :key="status" class="distribution-item">
        <span>{{ status }}</span>
        <strong>{{ count }}개 지역</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.distribution-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
  grid-column: span 2;
}
.distribution-card h3 {
  margin-bottom: 16px;
  color: var(--color-text);
}
.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.distribution-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 6px;
  background-color: var(--color-bg);
}
.distribution-item span {
  color: var(--color-text-secondary);
}
.distribution-item strong {
  color: var(--color-text);
}
</style>
