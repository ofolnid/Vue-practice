<script setup>
import { ref } from 'vue'

const message = ref('느린 네트워크에서도 안전하게 출력되는 메시지!')
</script>

<template>
  <!-- 
  마운트 전 원시 메세지가 보이지 않도록 함
  마운트 되면 사라짐 (보이게 됨) 
  -->
  <div v-cloak class="practice-section">
    <h2>v-cloak 디렉티브 학습</h2>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none !important;
}
</style>
