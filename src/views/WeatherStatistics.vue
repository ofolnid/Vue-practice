<script setup>
import PageTitle from '@/components/exercise/PageTitle.vue'
import StatCard from '@/components/exercise/StatCard.vue'
import { computed, ref } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import EmptyState from '@/components/exercise/EmptyState.vue'

const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    humidity: 70,
    rainProbability: 20,
    status: '맑음',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    humidity: 85,
    rainProbability: 80,
    status: '비',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    humidity: 75,
    rainProbability: 50,
    status: '구름',
  },
])

// 온도 단위 변환을 위한 configStore 가져오기
const configStore = useConfigStore()

// 평균 기온 계산
const averageTemp = computed(() => {
  const total = weatherList.value.reduce((sum, city) => {
    return sum + city.temp
  }, 0)

  return (total / weatherList.value.length).toFixed(1)
})

// 가장 더운 도시 계산
const hottestCity = computed(() => {
  return weatherList.value.reduce((max, city) => {
    return city.temp > max.temp ? city : max
  })
})

// 가장 습한 도시 계산
const mostHumidCity = computed(() => {
  return weatherList.value.reduce((max, city) => {
    return city.humidity > max.humidity ? city : max
  })
})

// 강수확률이 가장 높은 도시 계산
const highestRainCity = computed(() => {
  return weatherList.value.reduce((max, city) => {
    return city.rainProbability > max.rainProbability ? city : max
  })
})

// 우산이 필요한 도시 목록 계산
const umbrellaCities = computed(() => {
  return weatherList.value.filter((city) => city.rainProbability >= 60)
})
</script>

<template>
  <section class="statistics-page">
    <PageTitle title="날씨 통계" description="전체 날씨 데이터 통계를 확인할 수 있습니다." />
    <div class="statistics-grid">
      <StatCard
        label="평균 기온"
        :value="`${configStore.convertTemp(averageTemp)}${configStore.unitSymbol}`"
      />
      <StatCard
        label="가장 더운 지역"
        :value="hottestCity.name"
        :sub-value="`${configStore.convertTemp(hottestCity.temp)}${configStore.unitSymbol}`"
      />
      <StatCard
        label="가장 습한 지역"
        :value="mostHumidCity.name"
        :sub-value="`${mostHumidCity.humidity}%`"
      />
      <StatCard
        label="최고 강수확률 지역"
        :value="highestRainCity.name"
        :sub-value="`${highestRainCity.rainProbability}%`"
      />
    </div>

    <div class="umbrella-section">
      <h3>우산이 필요한 지역</h3>

      <!-- length가 0이 아닌 경우 -->
      <ul v-if="umbrellaCities.length">
        <li v-for="city in umbrellaCities" :key="city.id">
          <span>{{ city.name }}</span>
          <strong>{{ city.rainProbability }}%</strong>
        </li>
      </ul>

      <EmptyState v-if="umbrellaCities.length === 0" message="우산이 필요한 지역이 없습니다." />
    </div>
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
