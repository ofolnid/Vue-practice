<script setup>
defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
  searchResultCount: {
    type: Number,
    default: 0,
  },
})

// 이벤트 발생을 위한 emit 정의
const emit = defineEmits(['update-query'])

// 검색어가 변경될 때 이벤트 발생
const updateQuery = (e) => {
  const newQuery = e.target.value
  emit('update-query', newQuery)
}
</script>

<template>
  <div class="search-bar">
    <h3>도시 검색</h3>
    <input
      type="text"
      :value="searchQuery"
      @input="updateQuery"
      placeholder="검색할 도시 이름을 입력하세요"
    />
    <p v-show="searchQuery" class="search-result">
      검색어: {{ searchQuery }} / 검색 결과: {{ searchResultCount }}개
    </p>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  padding-bottom: 30px;
  position: relative;
  color: var(--color-text);
}
.search-bar > input {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 16px;
  background-color: var(--color-surface);
  color: var(--color-text);
}
.search-bar > input::placeholder {
  color: var(--color-text-muted);
}
.search-bar > input:focus {
  outline: none;
  border-color: var(--color-border-hover);
}
.search-bar > p {
  font-size: 14px;
  color: var(--color-text-muted);
}
.search-result {
  position: absolute;
  left: 0;
  bottom: -10px;
}
</style>
