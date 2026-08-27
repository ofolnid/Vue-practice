import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // 단위 상태를 관리하는 ref
  const unit = ref('celsius')
  // 단위 기호를 계산하는 computed 속성
  const unitSymbol = computed(() => (unit.value === 'celsius' ? '°C' : '°F'))
  const toggleUnit = () => {
    // celsius와 fahrenheit를 토글하는 로직
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }
  // 온도를 변환하는 함수
  const convertTemp = (temp) => {
    if (unit.value === 'fahrenheit') {
      return (Number(temp) * 9) / 5 + 32 // 화씨로 변환하여 반환
    }
    return Number(temp) // 섭씨일 경우 그대로 반환
  }

  return { unit, unitSymbol, toggleUnit, convertTemp }
})
