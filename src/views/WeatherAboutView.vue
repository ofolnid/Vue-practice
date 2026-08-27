<script setup>
import AboutCard from '@/components/exercise/AboutCard.vue'
import PageTitle from '@/components/exercise/PageTitle.vue'
</script>
<template>
  <section class="about-page">
    <PageTitle title="서비스 소개" description="Vue를 활용한 지역별 날씨 대시보드입니다." />
    <div class="about-section">
      <div class="about-grid">
        <AboutCard
          label="도시 검색"
          title="Search"
          description="도시 이름을 입력해 원하는 지역을 검색할 수 있습니다."
        />
        <AboutCard
          label="날씨 정보"
          title="Weather"
          description="지역별 기온과 강수확률을 확인할 수 있습니다."
        />
        <AboutCard
          label="생활 지수"
          title="Index"
          description="불쾌지수와 우산 필요 여부를 확인할 수 있습니다."
        />
        <AboutCard
          label="상세 조회"
          title="Detail"
          description="선택한 지역의 상세 날씨 정보를 확인할 수 있습니다."
        />
      </div>
    </div>
    <div class="tech-section">
      <h3>사용한 Vue 기능</h3>
      <div class="tech-list">
        <span>Props</span>
        <span>Emit</span>
        <span>Computed</span>
        <span>Watch</span>
        <span>WatchEffect</span>
        <span>Vue Router</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  width: 100%;
}
.about-section,
.tech-section {
  padding: 30px;
  background-color: var(--color-bg);
}
.about-section h3,
.tech-section h3 {
  margin-bottom: 16px;
  color: var(--color-text);
}
.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tech-list span {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
}
</style>
