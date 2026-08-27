import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', () => {
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

  // 실제 날씨 데이터 목록
  const weatherList = ref([])

  // 로딩 상태
  const isLoading = ref(false)

  // 에러 상태
  const errorMessage = ref('')

  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

  // OpenWeatherMap 날씨 상태를 한글로 변환 (번역 품질 이슈)
  const getWeatherStatus = (main) => {
    const statusMap = {
      Clear: '맑음',
      Clouds: '구름',
      Rain: '비',
      Drizzle: '이슬비',
      Thunderstorm: '뇌우',
      Snow: '눈',
      Mist: '안개',
      Fog: '안개',
      Haze: '연무',
      Smoke: '연기',
      Dust: '먼지',
      Sand: '황사',
      Squall: '돌풍',
      Tornado: '토네이도',
    }

    return statusMap[main] || main
  }

  // 도시 하나의 실제 날씨 데이터 가져오기
  const fetchWeather = async (city) => {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city.query,
        appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
        units: 'metric',
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

  // 전체 도시 날씨 데이터 가져오기
  const fetchWeatherList = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const responses = await Promise.all(cityList.map((city) => fetchWeather(city)))

      weatherList.value = responses

      console.log('날씨 데이터 요청 완료:', weatherList.value)
    } catch (error) {
      console.error('날씨 데이터 요청 실패:', error)
      errorMessage.value = '날씨 데이터를 가져오지 못했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    cityList,
    weatherList,
    isLoading,
    errorMessage,
    fetchWeather,
    fetchWeatherList,
  }
})
