<script setup>
import { ref } from 'vue'
import PropsEmitsChild from './PropsEmitsChild.vue'

const message = ref('Parent 초기 메시지')
const cnt = ref(0)

const handleUpdateRequest = (newValue) => {
  message.value = newValue
}

const handleUpdateCnt = (newCnt) => {
  console.log(`${cnt.value}를 전달받은 ${newCnt}로 변경`)
  cnt.value = newCnt
}
</script>

<template>
  <div class="practice-section">
    <h2>Props & Emits</h2>
    <div class="parent-container">
      <h2>상위 컴포넌트 (Parent)</h2>
      <p>
        현재 로컬 데이터(State): <strong>{{ message }}</strong>
      </p>
      <br />
      <PropsEmitsChild
        :parent-data="message"
        :cnt
        @update-request="handleUpdateRequest"
        @update-cnt="handleUpdateCnt"
      />
    </div>
  </div>
</template>

<style scoped>
.parent-container {
  border: 2px solid #2ecc71;
  padding: 20px;
  background-color: #f8f9fa;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
