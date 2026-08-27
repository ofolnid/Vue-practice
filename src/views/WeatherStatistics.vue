<script setup>
import { storeToRefs } from 'pinia'
import PageTitle from '@/components/exercise/PageTitle.vue'
import StatCard from '@/components/exercise/StatCard.vue'
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import EmptyState from '@/components/exercise/EmptyState.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import WeatherDistribution from '@/components/exercise/WeatherDistribution.vue'
import { ElSkeleton } from 'element-plus'

// 온도 단위 변환을 위한 configStore 가져오기
const configStore = useConfigStore()

// 날씨 데이터를 가져오기 위한 weatherStore 가져오기
const weatherStore = useWeatherStore()

// weatherStore에서 상태값 가져오기
const { weatherList, isLoading, errorMessage } = storeToRefs(weatherStore)

// 컴포넌트가 마운트될 때 날씨 데이터가 없으면 가져옴
onMounted(() => {
  if (weatherList.value.length === 0) {
    weatherStore.fetchWeatherList()
  }
})

// 평균 기온 계산
const averageTemp = computed(() => {
  // NaN 방어
  if (weatherList.value.length === 0) return 0

  const total = weatherList.value.reduce((sum, city) => {
    return sum + city.temp
  }, 0)

  return total / weatherList.value.length
})

// 가장 더운 도시 계산
const hottestCity = computed(() => {
  // 없을 경우 null 반환
  if (weatherList.value.length === 0) return null

  return weatherList.value.reduce((max, city) => {
    return city.temp > max.temp ? city : max
  })
})

// 가장 습한 도시 계산
const mostHumidCity = computed(() => {
  // 없을 경우 null 반환
  if (weatherList.value.length === 0) return null

  return weatherList.value.reduce((max, city) => {
    return city.humidity > max.humidity ? city : max
  })
})

// 풍속이 가장 높은 도시
const windiestCity = computed(() => {
  if (weatherList.value.length === 0) return null

  return weatherList.value.reduce((max, city) => {
    return city.wind > max.wind ? city : max
  })
})

// 날씨 상태별 도시 수 계산
const weatherDistribution = computed(() => {
  return weatherList.value.reduce((acc, city) => {
    acc[city.status] = (acc[city.status] || 0) + 1
    return acc
  }, {})
})

// // 강수확률이 가장 높은 도시 계산
// const highestRainCity = computed(() => {
//   return weatherList.value.reduce((max, city) => {
//     return city.rainProbability > max.rainProbability ? city : max
//   })
// })

// // 우산이 필요한 도시 목록 계산
// const umbrellaCities = computed(() => {
//   return weatherList.value.filter((city) => city.rainProbability >= 60)
// })
</script>

<template>
  <section class="statistics-page">
    <PageTitle title="날씨 통계" description="전체 날씨 데이터 통계를 확인할 수 있습니다." />
    <div class="statistics-grid">
      <el-skeleton v-if="isLoading" :rows="3" animated />
      <EmptyState v-else-if="errorMessage" :message="errorMessage" />
      <EmptyState
        v-else-if="weatherList.length === 0"
        message="통계에 사용할 날씨 데이터가 없습니다."
      />

      <template v-else>
        <StatCard
          label="평균 기온"
          :value="`${configStore.convertTemp(averageTemp).toFixed(1)}${configStore.unitSymbol}`"
        />
        <StatCard
          label="가장 더운 지역"
          :value="hottestCity.name"
          :sub-value="`${configStore.convertTemp(hottestCity.temp).toFixed(1)}${configStore.unitSymbol}`"
        />
        <StatCard
          label="가장 습한 지역"
          :value="mostHumidCity.name"
          :sub-value="`${mostHumidCity.humidity}%`"
        />

        <StatCard
          label="가장 바람이 센 지역"
          :value="windiestCity.name"
          :sub-value="`${windiestCity.wind}m/s`"
        />
        <!-- <StatCard
      label="최고 강수확률 지역"
      :value="highestRainCity.name"
      :sub-value="`${highestRainCity.rainProbability}%`"
      /> -->
      </template>

      <WeatherDistribution :distribution="weatherDistribution" />
    </div>

    <!-- <div class="umbrella-section">
      <h3>우산이 필요한 지역</h3>

      <ul v-if="umbrellaCities.length">
        <li v-for="city in umbrellaCities" :key="city.id">
          <span>{{ city.name }}</span>
          <strong>{{ city.rainProbability }}%</strong>
        </li>
      </ul>

      <EmptyState v-if="umbrellaCities.length === 0" message="우산이 필요한 지역이 없습니다." />
    </div> -->
  </section>
</template>

<style scoped>
.statistics-page {
  width: 100%;
  background-color: var(--color-bg);
}
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 30px;
  background-color: var(--color-bg);
}
.umbrella-section {
  padding: 30px;
  background-color: var(--color-bg);
}
.umbrella-section h3 {
  margin-bottom: 16px;
  color: var(--color-text);
}
.umbrella-section ul {
  padding: 0;
  margin: 0;
}
.umbrella-section li {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  margin-top: 8px;
  list-style: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
}
.umbrella-section li span {
  color: var(--color-text-secondary);
}
.umbrella-section li strong {
  color: var(--color-text);
}
</style>
