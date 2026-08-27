<script setup>
import { useConfigStore } from '@/stores/configStore'
import { computed } from 'vue'
const configStore = useConfigStore()
const configUnit = computed(() => (configStore.unit === 'celsius' ? '섭씨' : '화씨'))
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: {{ configUnit }}({{ configStore.unitSymbol }})</span>
    <button class="btn-toggle" @click="configStore.toggleUnit">단위 변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-secondary);
}
.btn-toggle {
  background-color: var(--color-control-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-control-text);
  padding: 8px 10px;
  cursor: pointer;
}
.btn-toggle:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text);
  background-color: var(--color-control-hover);
}
</style>
