<script setup>
import axios from 'axios'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import EmptyState from '@/components/exercise/EmptyState.vue'

const router = useRouter()

// 온도 단위 변환을 위한 configStore 가져오기
const configStore = useConfigStore()

// OpenWeatherMap 검색을 위한 도시 목록
const cityList = [
  {
    id: 'city_01',
    name: '서울',
    query: 'Seoul',
  },
  {
    id: 'city_02',
    name: '수원',
    query: 'Suwon',
  },
  {
    id: 'city_03',
    name: '부산',
    query: 'Busan',
  },
]

// OpenWeatherMap API에서 날씨 상태를 한글로 변환하는 함수 (번역 품질 이슈)
const getWeatherStatus = (main) => {
  const statusMap = {
    Clear: '맑음',
    Clouds: '흐림',
    Rain: '비',
    Drizzle: '이슬비',
    Thunderstorm: '뇌우',
    Snow: '눈',
    Mist: '안개',
    Fog: '안개',
    Haze: '연무',
  }

  return statusMap[main] || main
}

const weatherList = ref([])

const searchQuery = ref('')

const selectedCityInfo = ref('카드를 클릭하거나 검색해보세요.')

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
// OpenWeatherMap API 호출 함수
const fetchWeather = async (city) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city.query,
      appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  const data = response.data

  // 날씨 데이터를 필요한 형태로 가공하여 반환
  return {
    id: city.id,
    name: city.name,

    temp: data.main.temp,
    humidity: data.main.humidity,
    status: getWeatherStatus(data.weather[0].main),
    wind: data.wind.speed,
  }
}

// 모든 도시의 날씨 데이터를 가져오는 함수
const fetchWeatherList = async () => {
  const responses = await Promise.all(cityList.map((city) => fetchWeather(city)))

  console.log(responses)
  weatherList.value = responses
}

// 컴포넌트가 마운트될 때 날씨 데이터를 가져옴
onMounted(() => {
  fetchWeatherList()
})

// 검색어 변경 이벤트 처리
const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

// 카드 선택 이벤트 처리
const handleSelectCard = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

// 상세보기 버튼 클릭 이벤트 처리
const handleClickDetail = (cityId) => {
  router.push(`/weather/${cityId}`)
}

// 검색 결과 수 계산
const searchResultCount = computed(() => {
  return filteredWeatherList.value.length
})

// 검색 필터링된 도시 목록 계산
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
        <p class="average-temp">
          전체 도시 평균 기온: {{ configStore.convertTemp(averageTemp)
          }}{{ configStore.unitSymbol }}
        </p>
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
.weather-app {
  width: 600px;
  background-color: var(--color-bg);
  color: var(--color-text);
}
.weather-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
}
.weather-list h3,
.average-temp {
  color: var(--color-text);
}
.detail-box {
  text-align: center;
  padding: 20px 30px;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
}
</style>
