<template>
  <v-card class="v-card">
    <v-img class="v-img" :src="project.main" cover alt="Project Image"></v-img>
    <v-card-title class="v-card-title">
      <span class="project-name">{{ project.name }}</span>
      <span class="v-date">({{ projectInfo.date }})</span>
      <div class="project-tech">주 기술 : {{projectInfo.tech}}</div>
    </v-card-title>
    <div><span class="project-img">프로젝트 상세 이미지 보기</span></div>
    <v-card-subtitle class="v-card-subtitle">{{ projectInfo.description }}</v-card-subtitle>
    <v-card-subtitle class="v-card-description">{{ projectInfo.features }}</v-card-subtitle>
  </v-card>
</template>

<script>
import { VCard, VCardTitle, VCardSubtitle, VImg  } from "vuetify/components";

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VImg,
  },
  computed: {
    projectInfo() {
      const projects = {
        0: {
          date: "아직 모름",
          mada: "🚀 프로젝트 ZERO",
          description: "이 프로젝트는 Vue.js와 Vuetify를 활용한 UI 개발 프로젝트입니다.",
          features: "📌 반응형 UI, 📊 데이터 시각화, 🔧 실시간 업데이트"
        },
        1: {
          date: "아직 모름",
          mada: "🔥 프로젝트 ONE",
          description: "Vuetify를 활용한 프론트엔드 디자인 시스템 프로젝트입니다.",
          features: "🎨 커스텀 디자인, 📦 컴포넌트 재사용, 🚀 최적화된 성능"
        },
        2: {
          date: "아직 모름",
          mada: "🎯 프로젝트 TWO",
          description: "sdsd",
          features: "📊 데이터 시각화, 🛠️ 맞춤 추천, ⚡ 빠른 응답 속도"
        },
        3: {
          date: "24. 01 ~ 24. 02 / 5人",
          mada: "📌 secondStory",
          description: "‘secondStory’는 자신의 중고 물품들을 경매를 통해 사람들에게 거래할 수 있도록 도와주는 다양한 기능을 제공하는 웹 서비스입니다.\n" +
              "소비자는 다양한 종류의 중고 물품이 등록될 수 있어 여러 카테고리를 통해 원하는 제품을 찾을 수 있고,\n 여러 판매자가 참여하여 동일한 제품도 다양한 가격대와 상태로 제공될 수 있습니다.`",
          features: "- 메인 페이지 구성 - 상품 등록 / 해제 - 사용자 인터페이스를 향상시키기 위해 AJAX를 사용하여 비동기적으로 관심 상품을 등록/해제 가능하게 구현.\n\n" +
                    "- 최근 본 상품 - 쿠키를 사용하여 사용자가 본 상품을 저장하고 AJAX로 새로고침 없이 실시간으로 표시.\n\n" +
                    "- 상품 검색 - 프론트에서 입력된 값을 백엔드로 보내고, 상품 제목과 일치하는 항목을 찾아 결과를 다시 프론트로 반환.\n\n",
          tech: "Java17, SpringBoot, Thymeleaf, JQuery, NaverCloud, MySQL, JavaScript, HTML/CSS3"
        }
      };
      return projects[this.project.index] || {
        title: "알 수 없는 오류",
        description: "기본 설명입니다.",
        features: "오류"
      };
    }
  }
};
</script>

<style scoped lang="scss">
.v-card {
  padding: 20px;
  white-space: pre-line;
  gap: 1rem;
  display: grid;
}

.v-img {
  border-radius: 12px;
}

.project-tech {
  font-size: 1rem;
  text-align: left;
}

.project-img {
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  justify-self: left;
}

.v-card-title {
  flex-direction: column;
  font-size: 1.5em;
  font-weight: bold;
  text-align: left;
  padding: 0;
  white-space: pre-line;
  align-items: baseline;
  gap: 0.5rem;
}

.v-date {
  font-size: 0.7em;
}

.v-card-subtitle {
  color: #777;
  text-align: left;
  padding: 0;
  white-space: pre-line;
  font-size: 14px;
}

.v-card-description {
  text-align: left;
  padding: 0;
  white-space: pre-line;
  font-size: 16px;
  color: black;
  font-weight: bold;
}
</style>
