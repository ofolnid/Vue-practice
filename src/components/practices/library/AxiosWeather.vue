<script setup>
import ref from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)

const handleFetchWeather = async () => {
  // 비동기 통신 시작 (로딩 상태 true)
  isLoading.value = true

  // api 키를 .env 파일에서 가져와 사용
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=35.158582&lon=126.804975&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric&lang=kr`

  try {
    const response = await axios.get(URL)
    console.log('Axios 통신 응답 전체 객체:', response)
    console.log('백엔드가 준 핵심 날씨 데이터(JSON):', response.data)
    weatherData.value = response.data
  } catch (error) {
    console.error('통신 중 에러가 발생했습니다:', error)
    alert('데이터를 가져오지 못했습니다. API 키 활성화 여부나 주소를 확인하세요.')
  } finally {
    // 종료시 무조건 실행 - 로딩 상태 false
    isLoading.value = false
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>Axios 통신 검증</h2>
    <!-- 데이터를 가져오는 동안은 버튼을 사용할 수 없음 -->
    <button @click="handleFetchWeather" :disabled="isLoading">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 가져오기' }}
    </button>

    <div v-if="weatherData" class="result-card">
      <p>
        위치: <strong>{{ weatherData.name }}</strong>
      </p>
      <p>
        현재 기온: <strong>{{ weatherData.main.temp }}°C</strong> (정상 섭씨 변환 완료)
      </p>
      <p>
        날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong>
      </p>
      <p>
        습도: <strong>{{ weatherData.main.humidity }}%</strong>
      </p>
    </div>
    <div v-else>
      <p>아직 가져온 데이터가 없습니다. 버튼을 눌러 통신을 가동하세요.</p>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  background: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  line-height: 1.8;
}
.result-card strong {
  color: #0284c7;
}
</style>
