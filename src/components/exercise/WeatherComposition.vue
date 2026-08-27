<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

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

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 데이터의 기온과 습도로 불쾌지수 계산
const getDiscomfortIndex = (temp, humidity) => {
  return (0.81 * temp + 0.01 * humidity * (0.99 * temp - 14.3) + 46.3).toFixed(1)
}

// 검색 필터 추가 - computed 활용
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) return weatherList.value

  return weatherList.value.filter((item) => item.name.includes(query))
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

// 검색 결과 개수
const searchResultCount = computed(() => {
  return filteredWeatherList.value.length
})

// 평균 기온 계산
const averageTemp = computed(() => {
  const total = weatherList.value.reduce((sum, item) => {
    return sum + item.temp
  }, 0)

  return (total / weatherList.value.length).toFixed(1)
})
</script>

<template>
  <h2>과제 1: 날씨</h2>
  <section class="weather-app">
    <div class="search-bar">
      <h3>도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="(e) => (searchQuery = e.target.value)"
        placeholder="검색할 도시 이름을 입력하세요"
      />
      <p v-show="searchQuery">검색어: {{ searchQuery }} / 검색 결과: {{ searchResultCount }}개</p>
    </div>
    <hr />
    <ul class="weather-list">
      <h3>지역별 날씨 현황</h3>
      <p class="average-temp">전체 도시 평균 기온: {{ averageTemp }}°C</p>
      <li
        v-for="item in filteredWeatherList"
        :key="item.id"
        class="weather-item"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <h4>{{ item.name }} - {{ item.status }}</h4>
        <div class="badge-list">
          <span v-if="item.temp >= 25" class="badge hot">🔥 더움</span>
          <span v-else class="badge cool">❄️ 선선함</span>
          <span v-if="getDiscomfortIndex(item.temp, item.humidity) >= 80" class="badge discomport2">
            😵 매우 불쾌
          </span>
          <span
            v-else-if="getDiscomfortIndex(item.temp, item.humidity) >= 75"
            class="badge discomport1"
          >
            😓 불쾌
          </span>
          <span v-else class="badge good"> 🙂 보통 </span>
          <span v-if="item.rainProbability >= 60" class="badge umbrella"> ☂️ 우산 필수 </span>
        </div>
        <p>현재 기온: {{ item.temp }}</p>
        <p>강수확률: {{ item.rainProbability }}%</p>
        <p>
          불쾌지수:
          {{ getDiscomfortIndex(item.temp, item.humidity) }}
        </p>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </li>
      <p v-if="filteredWeatherList.length === 0" class="no-data">
        검색 결과와 일치하는 도시가 없습니다.
      </p>
    </ul>
    <div class="detail-box">
      {{ selectedCityInfo }}
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
  color: #171717;
}
li {
  list-style: none;
}
h3 {
  text-align: center;
  margin: 20px;
}
h4 {
  font-size: 18px;
  margin: 10px 0 20px;
}
.weather-app {
  width: 600px;
  padding: 20px;
  align-items: center;
  background-color: #efefef;
}
.search-bar {
  width: 100%;
  padding: 20px 30px;
  margin-bottom: 20px;
}
.search-bar > input {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: white;
}
.search-bar > input:focus {
  outline: none;
  border-color: #bbb;
}
.search-bar > p {
  font-size: 14px;
  color: #888;
}
.weather-list {
  padding: 20px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.weather-item {
  padding: 20px 30px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ddd;
  position: relative;
}
.weather-item:hover {
  border-color: #aaa;
  position: relative;
}
.badge-list {
  display: flex;
  gap: 4px;
  align-items: stretch;
}
.badge {
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
}

.hot {
  background-color: rgb(243, 70, 70);
}
.cool {
  background-color: rgb(102, 143, 255);
}
.discomport1 {
  background-color: #777;
}
.discomport2 {
  background-color: #555;
}
.good {
  background-color: #aaa;
}
.umbrella {
  background-color: rgb(200, 134, 227);
}
.btn-detail {
  border-color: transparent;
  background-color: #efefef;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #aaa;
  padding: 8px 10px;
  position: absolute;
  top: 20px;
  right: 20px;
}
.btn-detail:hover {
  border-color: #bbb;
  color: #666;
  background-color: #eee;
}
.detail-box {
  text-align: center;
  padding: 20px 30px;
  background-color: white;
}
.average-temp {
  text-align: right;
}
</style>
