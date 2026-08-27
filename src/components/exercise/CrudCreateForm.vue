<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

// 이벤트 발생을 위한 emit 정의
const emit = defineEmits(['update:modelValue', 'create', 'refresh'])

const updateValue = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <el-card class="create-card">
    <div class="create-area">
      <el-input
        :model-value="modelValue"
        placeholder="새 게시글 제목을 입력하세요"
        clearable
        @input="updateValue"
      />

      <el-button type="primary" @click="emit('create')"> 추가 </el-button>
      <el-button @click="emit('refresh')"> 새로고침 </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.create-card {
  margin-bottom: 12px;
}
.create-area {
  display: flex;
  gap: 8px;
}
</style>
