<script setup>
import EmptyState from '@/components/exercise/EmptyState.vue'
import InfoRow from '@/components/exercise/InfoRow.vue'
import PageTitle from '@/components/exercise/PageTitle.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { ElSkeleton } from 'element-plus'

const route = useRoute() // 현재 라우트(경로, params, query 등) 정보 조회
const router = useRouter() // 페이지 이동 등 라우터 기능 사용

// 온도 단위 변환을 위한 configStore 가져오기
const configStore = useConfigStore()

// 도시 목록을 가져오기 위해 weatherStore 가져오기
const weatherStore = useWeatherStore()

// 디테일 페이지에서 보여줄 도시 상세 정보 관리
const cityData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

// 라우터를 이용해 메인 페이지로 이동
const goHome = () => {
  router.push({ name: 'WeatherHome' })
}

// console.log(0 == '0') // lint 테스트를 위한 코드

// 타임스탬프를 시각으로 변환하는 함수
const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(async () => {
  // 라우트에서 경로 파라미터(cityId) 조회
  const id = route.params.cityId

  const city = weatherStore.cityList.find((item) => item.id === id)

  if (!city) {
    errorMessage.value = '해당 지역을 찾을 수 없습니다.'
    return
  }

  isLoading.value = true

  try {
    cityData.value = await weatherStore.fetchWeatherDetail(city)
  } catch (error) {
    console.error(error)
    errorMessage.value = '상세 날씨 정보를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="detail-page">
    <PageTitle title="상세 날씨 정보" description="선택한 지역의 상세 기상 정보를 확인합니다." />
    <div class="detail-section">
      <el-skeleton v-if="isLoading" :rows="3" animated />
      <EmptyState v-else-if="errorMessage" :message="errorMessage" />

      <div v-else-if="cityData" class="detail-card">
        <div class="main-weather">
          <div class="weather-header">
            <div>
              <span class="weather-label">현재 날씨</span>
              <h3>{{ cityData.name }}</h3>
            </div>

            <span class="weather-status">
              {{ cityData.status }}
            </span>
          </div>

          <div class="temperature-area">
            <strong>
              {{ configStore.convertTemp(cityData.temp).toFixed(1) }}{{ configStore.unitSymbol }}
            </strong>

            <p>
              체감
              {{ configStore.convertTemp(cityData.feelsLike).toFixed(1)
              }}{{ configStore.unitSymbol }}
            </p>
          </div>
        </div>

        <div class="info-grid">
          <InfoRow label="대기질" :value="cityData.airQuality" />
          <InfoRow label="습도" :value="`${cityData.humidity}%`" />
          <InfoRow label="기압" :value="`${cityData.pressure} hPa`" />
          <InfoRow label="풍속" :value="`${cityData.wind} m/s`" />
          <InfoRow label="가시거리" :value="`${(cityData.visibility / 1000).toFixed(1)} km`" />
          <InfoRow label="일출" :value="formatTime(cityData.sunrise)" />
          <InfoRow label="일몰" :value="formatTime(cityData.sunset)" />
          <InfoRow label="기상 상태" :value="cityData.status" />
        </div>
      </div>

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
  padding: 24px;
  margin-bottom: 12px;

  border: 1px solid var(--color-border);
  border-radius: 12px;
  background-color: var(--color-surface);
}
.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.weather-label {
  display: block;
  margin-bottom: 6px;
  color: var(--color-text-muted);
  font-size: 14px;
}
.weather-header h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 20px;
}
.weather-status {
  padding: 6px 10px;
  border-radius: 6px;
  background-color: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 14px;
}
.temperature-area {
  text-align: center;
  margin-bottom: 24px;
}
.temperature-area strong {
  display: block;
  color: var(--color-text);
  font-size: 42px;
  line-height: 1;
}
.temperature-area p {
  margin: 10px 0 0;
  color: var(--color-text-muted);
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
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
