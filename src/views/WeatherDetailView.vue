<script setup>
import EmptyState from '@/components/exercise/EmptyState.vue'
import InfoRow from '@/components/exercise/InfoRow.vue'
import PageTitle from '@/components/exercise/PageTitle.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute() // 현재 라우트(경로, params, query 등) 정보 조회
const router = useRouter() // 페이지 이동 등 라우터 기능 사용

// 온도 단위 변환을 위한 configStore 가져오기
const configStore = useConfigStore()

const mockDetails = {
  city_01: {
    name: '대한민국 서울특별시',
    temp: 28,
    status: '맑음',
    humidity: '55%',
    wind: '2.5m/s',
  },
  city_02: {
    name: '경기도 수원시 영통구',
    temp: 24,
    status: '비',
    humidity: '85%',
    wind: '4.1m/s',
  },
  city_03: {
    name: '부산광역시 해운대구',
    temp: 26,
    status: '구름',
    humidity: '65%',
    wind: '5.0m/s',
  },
}

const cityData = ref(null)

// 라우터를 이용해 메인 페이지로 이동
const goHome = () => {
  router.push({ name: 'WeatherHome' })
}

// 라우트에서 경로 파라미터(cityId) 조회
onMounted(() => {
  const id = route.params.cityId

  if (mockDetails[id]) {
    cityData.value = mockDetails[id]
  }
})
</script>

<template>
  <section class="detail-page">
    <PageTitle title="상세 날씨 정보" description="선택한 지역의 상세 기상 정보를 확인합니다." />
    <div class="detail-section">
      <div v-if="cityData" class="detail-card">
        <h3>{{ cityData.name }}</h3>

        <div class="main-weather">
          <strong>{{ configStore.convertTemp(cityData.temp) }}{{ configStore.unitSymbol }}</strong>
          <span>{{ cityData.status }}</span>
        </div>

        <InfoRow label="습도" :value="cityData.humidity" />
        <InfoRow label="풍속" :value="cityData.wind" />
        <InfoRow label="기상 상태" :value="cityData.status" />
      </div>

      <EmptyState v-if="!cityData" message="해당 지역의 상세 정보가 존재하지 않습니다." />

      <button class="back-btn" @click="goHome">메인으로 이동</button>
    </div>
  </section>
</template>

<style scoped>
.detail-page {
  width: 100%;
}
.detail-section {
  padding-bottom: 20px;
  background-color: var(--color-bg);
  text-align: center;
}
.detail-card {
  padding: 30px;
  background-color: var(--color-bg);
  color: var(--color-text);
  text-align: left;
}
.detail-card h3 {
  margin-bottom: 20px;
  color: var(--color-text);
}
.main-weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  margin-bottom: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
}
.main-weather strong {
  font-size: 36px;
  color: var(--color-text);
}
.main-weather span {
  color: var(--color-text-muted);
}
.back-btn {
  margin-top: 20px;
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  cursor: pointer;
}
.back-btn:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text);
  background-color: var(--color-control-hover);
}
</style>
