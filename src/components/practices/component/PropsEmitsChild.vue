<script setup>
const props = defineProps({
  parentData: {
    type: String,
    required: true,
  },
  cnt: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update-request', 'update-cnt'])

const sendNotification = () => {
  const payload = 'Child에서 가공한 새로운 데이터'
  emit('update-request', payload)
}

const increaseCnt = () => {
  const newCnt = props.cnt + 1
  console.log('부모에게 새로운 카운트 전달', newCnt)
  emit('update-cnt', newCnt)
}
</script>

<template>
  <div class="child-container">
    <h2>하위 컴포넌트 (Child)</h2>
    <p>
      수신된 Props 데이터: <strong>{{ parentData }}</strong>
    </p>
    <p>카운트: {{ cnt }}</p>
    <br />
    <button @click="sendNotification">상위 컴포넌트로 갱신 요청 (Emit)</button>
    <button @click="increaseCnt">카운트 증가</button>
  </div>
</template>

<style scoped>
.child-container {
  border: 2px dashed #3498db;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
}
</style>
