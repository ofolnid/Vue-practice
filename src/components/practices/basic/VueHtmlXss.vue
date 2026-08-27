<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const message = ref('')

function showMessage() {
  message.value = inputValue.value
}
</script>

<template>
  <div class="practice-section">
    <h2>v-html XSS 학습</h2>
    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showMessage">확인</button>
    <!-- 사용자 입력을 텍스트로 전환하지 않고 그대로 출력 -> xss 위험 -->
    <div v-html="message"></div>
  </div>
</template>
