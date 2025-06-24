<template>
  <div class="career-tab dark:bg-[#1e1e1e] transition-colors duration-300">
    <div class="career-tab-content">
      <h3 class="dark:text-[#dca673]">경력 사항</h3>
      <div class="career-list">
        <div class="career-item dark:border-[#dca673]">
          <span class="date dark:text-[#e0e0e0]">구직중</span>
        </div>

        <div class="project dark:bg-[#2a2a2a]">
          <div class="project-item">
            <img src="/bitcamp.png" class="career-image" />
            <div class="project-item-title dark:text-[#e0e0e0]">네이버 데브옵스 비트캠프 (23.10 ~ 24.04)</div>
          </div>
          <p class="dark:text-[#e0e0e0]">
            📌 <strong>개발언어:</strong>
            <span class="badge dark:bg-[#444] dark:text-[#e0e0e0]">
              Front : Thymeleaf, React, Javascript, Html, Css |
              Back : Spring, SpringBoot, Node.js |
              Server : NaverCloud, Mysql, Ubuntu
            </span>
          </p>
          <ul>
            <li class="dark:text-[#e0e0e0]">Secondstory</li>
            <li class="dark:text-[#e0e0e0]">사용 언어: Java, JavaScript, HTML/CSS3</li>
            <li class="dark:text-[#e0e0e0]">개발 환경: Java17, Gradle, SpringBoot, JQuery, Thymeleaf</li>
            <li class="dark:text-[#e0e0e0]">서버 / 배포 환경: NaverCloud, MySQL, ObjectStorage</li>
            <li class="dark:text-[#e0e0e0]">주요 역할: 메인 페이지 구현</li>
            <li class="dark:text-[#e0e0e0]">주요 배운 점: 비동기 요청(AJAX) 활용, 쿠키를 이용한 사용자 경험 개선, 협업툴 활용</li>
          </ul>

          <ul>
            <li class="dark:text-[#e0e0e0]">Nc4All</li>
            <li class="dark:text-[#e0e0e0]">사용 언어: Java, HTML, CSS, JavaScript</li>
            <li class="dark:text-[#e0e0e0]">개발 환경: Java17, SpringBoot, Node.js, React</li>
            <li class="dark:text-[#e0e0e0]">서버 / 배포 환경: NaverCloud, MySQL, ObjectStorage</li>
            <li class="dark:text-[#e0e0e0]">주요 역할: 메인 페이지, 관리자 페이지 개발</li>
            <li class="dark:text-[#e0e0e0]">주요 배운 점: React와 JPA/QueryDsl 활용, 반응형 디자인 구현, 관리자 시스템 개발</li>
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
  background-color: #F3EBE6;
  border-radius: 10px;
  overflow: auto;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
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
  color: #D17A22;
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
  color: #3E3E3E;
}

p {
  font-size: 1rem;
  margin: 5px 0;
  color: #4A3C3A;
}

.project {
  padding: 15px;
  border-radius: 10px;
  background-color: #EDE0D4;
}

.project-item-title {
  font-size: 1.3rem;
  margin: 1.25rem 0;
  color: #4A3C3A;
}

.badge {
  background-color: white;
  color: #3E3E3E;
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
  color: #3E3E3E;
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
  background: #d2b6aa;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.career-tab::-webkit-scrollbar-thumb:hover {
  background: #888;
}

.dark .career-tab::-webkit-scrollbar-track {
  background: #2a2a2a;
}

.dark .career-tab::-webkit-scrollbar-thumb {
  background: #666;
}
</style>
