<template>
  <div class="career-tab">
    <div class="career-tab-content">
      <h3>경력 사항</h3>
      <div class="career-list">
        <div class="career-item">
          <span class="date">구직중</span>
        </div>

        <div class="project">
          <div class="project-item">
          <img src="/bitcamp.png" class="career-image"/>
          <div class="project-item-title">네이버 데브옵스 비트캠프 (23.10 ~ 24.04)</div>
          </div>
          <p>📌 <strong>개발언어:</strong> <span class="badge">Front : Thymeleaf, React, Javascript, Html, Css | Back : Spring, SpringBoot, Node.js | Server : NaverCloud, Mysql, Ubuntu </span></p>
          <ul>
            <li>Foundry 사업부 반도체 B2B 시스템 2.0 고도화</li>
            <li>개발언어: Salesforce LWC (shadow DOM 기반 Frontend 개발언어) / APEX(JAVA 기반 자체 Backend 개발언어)</li>
            <li>Lightning Web component(es6 web component)를 통한 Frontend 개발</li>
            <li>LWC Redux 적용 및 Apex(서버통신) 공통처리 개발</li>
            <li>APEX(JAVA)와 SOQL(DB)을 통한 BackEnd 개발</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CareerTab"
};
</script>

<style scoped>
.career-tab {
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.career-tab-content {
  padding: 20px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.career-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.career-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.career-item {
  border-left: 4px solid black;
  padding-left: 10px;
}

.date {
  font-size: 1rem;
}

h4 {
  font-size: 1.5rem;
  margin: 5px 0;
}

p {
  font-size: 1rem;
  margin: 5px 0;
}

.project {
  padding: 15px;
  border-radius: 10px;
  background-color: orange;
}

.project-item-title {
  font-size: 1.3rem;
  margin: 1.25rem 0;
}

.badge {
  background-color: white;
  color: black;
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 0.9rem;
}

ul {
  margin-top: 10px;
  padding-left: 20px;
}

li {
  font-size: 1rem;
  line-height: 1.5;
}

.career-tab::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.career-tab::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.career-tab::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.career-tab::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
