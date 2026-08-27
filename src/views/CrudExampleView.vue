<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

import CrudCreateForm from '@/components/exercise/CrudCreateForm.vue'
import CrudTable from '@/components/exercise/CrudTable.vue'
import CrudEditDialog from '@/components/exercise/CrudEditDialog.vue'
import PageTitle from '@/components/exercise/PageTitle.vue'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const items = ref([])
const isLoading = ref(false)

const createTitle = ref('')

const dialogVisible = ref(false)
const editId = ref(null)
const editTitle = ref('')
const editBody = ref('')

// GET
const handleRead = async () => {
  isLoading.value = true

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        _limit: 5,
      },
    })

    items.value = response.data

    ElMessage.success('게시글을 불러왔습니다.')
  } catch (error) {
    console.error(error)
    ElMessage.error('게시글을 불러오지 못했습니다.')
  } finally {
    isLoading.value = false
  }
}

// POST
const handleCreate = async () => {
  if (!createTitle.value.trim()) {
    ElMessage.warning('제목을 입력해주세요.')
    return
  }

  try {
    const payload = {
      title: createTitle.value,
      body: '새로 등록한 게시글입니다.',
      userId: 1,
    }

    const response = await axios.post(BASE_URL, payload)

    items.value.unshift(response.data)
    createTitle.value = ''

    ElMessage.success('게시글을 추가했습니다.')
  } catch (error) {
    console.error(error)
    ElMessage.error('게시글 추가에 실패했습니다.')
  }
}

// 수정창 열기
const openEditDialog = (item) => {
  editId.value = item.id
  editTitle.value = item.title
  editBody.value = item.body

  dialogVisible.value = true
}

// PUT
const handleUpdate = async () => {
  try {
    const payload = {
      id: editId.value,
      title: editTitle.value,
      body: editBody.value,
      userId: 1,
    }

    const response = await axios.put(`${BASE_URL}/${editId.value}`, payload)

    const index = items.value.findIndex((item) => item.id === editId.value)

    if (index !== -1) {
      items.value[index] = response.data
    }

    dialogVisible.value = false

    ElMessage.success('게시글을 수정했습니다.')
  } catch (error) {
    console.error(error)
    ElMessage.error('게시글 수정에 실패했습니다.')
  }
}

// DELETE
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('게시글을 삭제하시겠습니까?', '삭제 확인', {
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      type: 'warning',
    })

    await axios.delete(`${BASE_URL}/${id}`)

    items.value = items.value.filter((item) => item.id !== id)

    ElMessage.success('게시글을 삭제했습니다.')
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      console.error(error)
      ElMessage.error('게시글 삭제에 실패했습니다.')
    }
  }
}

onMounted(() => {
  handleRead()
})
</script>

<template>
  <section class="crud-page">
    <PageTitle
      title="JSONPlaceholder CRUD"
      description="Element Plus를 활용한 CRUD 예제 페이지입니다."
    />
    <CrudCreateForm v-model="createTitle" @create="handleCreate" @refresh="handleRead" />
    <CrudTable
      :items="items"
      :is-loading="isLoading"
      @edit="openEditDialog"
      @delete="handleDelete"
    />
    <CrudEditDialog
      v-model:visible="dialogVisible"
      v-model:title="editTitle"
      v-model:body="editBody"
      @submit="handleUpdate"
    />
  </section>
</template>

<style scoped>
.crud-page {
  width: 100%;
  padding: 30px;
  background-color: var(--color-bg);
}
.page-header {
  margin-bottom: 20px;
}
.page-header h2 {
  margin-bottom: 8px;
  color: var(--color-text);
}
.page-header p {
  color: var(--color-text-muted);
}
</style>
