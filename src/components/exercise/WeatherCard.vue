<script setup>
import { useConfigStore } from '@/stores/configStore'

const { cityWeather } = defineProps({
  cityWeather: {
    type: Object,
    required: true,
    validator(value) {
      // cityWeather 객체의 속성 타입 검증
      return (
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        typeof value.temp === 'number' &&
        typeof value.humidity === 'number' &&
        // api에서 강우 확률을 제공하지 않음
        // typeof value.rainProbability === 'number' &&
        typeof value.status === 'string'
      )
    },
  },
})

// 온도 단위 변환을 위한 configStore 가져오기
const configStore = useConfigStore()

// 이벤트 발생을 위한 emit 정의
const emit = defineEmits(['selectCard', 'clickDetail'])

// 카드 클릭 시 이벤트 발생
const selectCard = () => {
  emit('selectCard', cityWeather.name)
}

// 상세보기 버튼 클릭 시 이벤트 발생
const clickDetail = () => {
  emit('clickDetail', cityWeather.id)
}

// 불쾌지수 계산 함수
const getDiscomfortIndex = (temp, humidity) => {
  return (0.81 * temp + 0.01 * humidity * (0.99 * temp - 14.3) + 46.3).toFixed(1)
}
</script>

<template>
  <li @click="selectCard">
    <h4>{{ cityWeather.name }} - {{ cityWeather.status }}</h4>
    <div class="badge-list">
      <span v-if="cityWeather.temp >= 25" class="badge hot">🔥 더움</span>
      <span v-else class="badge cool">❄️ 선선함</span>
      <span
        v-if="getDiscomfortIndex(cityWeather.temp, cityWeather.humidity) >= 80"
        class="badge discomport2"
      >
        😵 매우 불쾌
      </span>
      <span
        v-else-if="getDiscomfortIndex(cityWeather.temp, cityWeather.humidity) >= 75"
        class="badge discomport1"
      >
        😓 불쾌
      </span>
      <span v-else class="badge good"> 🙂 보통 </span>
      <!-- api에서 강우 확률을 제공하지 않음 -->
      <!-- <span v-if="cityWeather.rainProbability >= 60" class="badge umbrella"> ☂️ 우산 필수 </span> -->
    </div>
    <p>
      현재 기온: {{ configStore.convertTemp(cityWeather.temp).toFixed(1)
      }}{{ configStore.unitSymbol }}
    </p>
    <!-- api에서 강우 확률을 제공하지 않음 -->
    <!-- <p>강수확률: {{ cityWeather.rainProbability }}%</p> -->
    <p>
      불쾌지수:
      {{ getDiscomfortIndex(cityWeather.temp, cityWeather.humidity) }}
    </p>

    <button class="btn-detail" @click.stop="clickDetail">상세보기</button>
  </li>
</template>

<style scoped>
li {
  list-style: none;
  text-align: left;
  padding: 20px 30px;
  border-radius: 8px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  position: relative;
  cursor: pointer;
}
li h4 {
  color: var(--color-text);
}
li p {
  color: var(--color-text-secondary);
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
  background-color: var(--color-control-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-control-text);
  padding: 8px 10px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.btn-detail:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text);
  background-color: var(--color-control-hover);
}
</style>
