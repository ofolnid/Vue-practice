<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import EmptyState from './EmptyState.vue'

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

const searchQuery = ref('')

const selectedCityInfo = ref('카드를 클릭하거나 검색해보세요.')

// 검색어 변경 이벤트 처리
const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

// 카드 선택 이벤트 처리
const handleSelectCard = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

// 상세보기 버튼 클릭 이벤트 처리
const handleClickDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 검색 결과 수 계산
const searchResultCount = computed(() => {
  return filteredWeatherList.value.length
})

// 검색 필터링된 날씨 목록 계산
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) return weatherList.value

  return weatherList.value.filter((item) => item.name.includes(query))
})

// 평균 기온 계산
const averageTemp = computed(() => {
  const total = weatherList.value.reduce((sum, item) => {
    return sum + item.temp
  }, 0)

  return (total / weatherList.value.length).toFixed(1)
})

// 변화 감시 - watch로 상태바 문구 변경 감지
watch(selectedCityInfo, (newInfo) => {
  console.log(`[watch] 상태바 문구 변경: ${newInfo}`)
})

// 변화 감시 - watchEffect로 검색어 변화 감지
// dependencies를 자동으로 vue가 찾아줌
// 무조건 초기 한 번 실행 후, 이후 검색어가 변경될 때마다 실행
watchEffect(() => {
  console.log(`[watchEffect] 검색어 변경: ${searchQuery.value}`)
})
</script>

<template>
  <section class="weather-app">
    <BaseDashboardCard>
      <SearchBar :search-query :search-result-count @update-query="handleUpdateQuery" />
    </BaseDashboardCard>
    <BaseDashboardCard>
      <ul class="weather-list">
        <h3>지역별 날씨 현황</h3>
        <p class="average-temp">전체 도시 평균 기온: {{ averageTemp }}°C</p>
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
          :city-weather="city"
        />
        <EmptyState
          v-if="filteredWeatherList.length === 0"
          message="검색 결과와 일치하는 도시가 없습니다."
        />
      </ul>
    </BaseDashboardCard>
    <div class="detail-box">
      {{ selectedCityInfo }}
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
  color: #171717;
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.weather-app {
  width: 600px;
}
.weather-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
}
.detail-box {
  text-align: center;
  padding: 20px 30px;
  background-color: white;
}
</style>
