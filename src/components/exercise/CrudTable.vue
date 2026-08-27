<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

// 이벤트 발생을 위한 emit 정의
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <el-card>
    <el-table v-loading="isLoading" :data="items" style="width: 100%">
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="title" label="제목" />
      <el-table-column label="관리" width="170">
        <template #default="{ row }">
          <el-button size="medium" @click="emit('edit', row)"> 수정 </el-button>
          <el-button size="medium" type="danger" @click="emit('delete', row.id)"> 삭제 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
