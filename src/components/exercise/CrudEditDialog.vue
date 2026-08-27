<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    default: '',
  },
})

// 이벤트 발생을 위한 emit 정의
const emit = defineEmits(['update:visible', 'update:title', 'update:body', 'submit'])

const closeDialog = () => {
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog
    :model-value="visible"
    title="게시글 수정"
    width="500"
    @update:model-value="emit('update:visible', $event)"
  >
    <div class="edit-form">
      <el-input :model-value="title" placeholder="제목" @input="emit('update:title', $event)" />
      <el-input
        :model-value="body"
        type="textarea"
        :rows="4"
        placeholder="내용"
        @input="emit('update:body', $event)"
      />
    </div>
    <template #footer>
      <el-button @click="closeDialog"> 취소 </el-button>
      <el-button type="primary" @click="emit('submit')"> 수정 완료 </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
