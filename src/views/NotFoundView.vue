<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
// 메인 이동
const goHome = () => {
  router.push({ name: 'WeatherHome' })
}
</script>
<template>
  <section class="not-found">
    <div class="page-title">404</div>

    <h2>페이지를 찾을 수 없습니다.</h2>

    <p>요청하신 페이지가 존재하지 않습니다.</p>

    <button @click="goHome">메인으로 이동</button>
  </section>
</template>

<style scoped>
.not-found {
  width: 100%;
  padding: 60px 30px;
  background-color: var(--color-bg);
  color: var(--color-text);
  text-align: center;
}
.page-title {
  font-size: 60px;
  font-weight: 700;
  color: var(--color-text-muted);
  margin-bottom: 10px;
}
.not-found h2 {
  margin-bottom: 12px;
  color: var(--color-text);
}
.not-found p {
  color: var(--color-text-secondary);
}
.not-found button {
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  cursor: pointer;
}
.not-found button:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text);
  background-color: var(--color-control-hover);
}
</style>
