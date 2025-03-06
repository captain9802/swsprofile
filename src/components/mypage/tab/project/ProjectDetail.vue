<template>
  <v-card class="v-card" :key="project.index">
    <v-img class="v-img" :src="project.main" cover alt="Project Image"></v-img>
    <v-card-title class="v-card-title">
      <span class="project-name">{{ project.name }}</span>
      <span class="v-date">({{ projectInfo.date }})</span>
      <div class="project-tech">주 기술 : {{ projectInfo.tech }}</div>
    </v-card-title>
    <div v-if="!hasHiddenImages">
      <span class="project-img" @click="toggleImageSlider">프로젝트 상세 이미지 보기 {{ isSliderOpen ? '▲' : '▼' }}</span>
      <div v-if="imageSliderOpen" class="image-slider-container">
        <button class="prev-button" @click="prevSlide" :disabled="index === 0">
          <img class="img-prev" :src="index === 0 ? '/cprev.png' : '/prev.png'" alt="이전 버튼">
        </button>
        <div class="image-slider">
          <div class="image-slide" v-for="(img, i) in visibleImages" :key="i">
            <img
                :src="img"
                alt="project"
                class="image-item"
                @click="openImage(img)"
            />
          </div>
        </div>
        <button class="next-button" @click="nextSlide" :disabled="index + visibleCount >= images[project.index].length">
          <img class="img-next" :src="index + visibleCount >= images[project.index].length ? '/cnext.png' : '/next.png'" alt="다음 버튼">
        </button>
      </div>
    </div>
    <v-card-subtitle class="v-card-subtitle">{{ projectInfo.description }}</v-card-subtitle>
    <v-card-subtitle class="v-card-description">{{ projectInfo.features }}</v-card-subtitle>
    <div v-if="selectedImage" class="image-modal" @click="closeImage">
      <img :src="selectedImage" alt="Expanded Image" class="expanded-image"/>
    </div>
  </v-card>
</template>

<script>
import { VCard, VCardTitle, VCardSubtitle, VImg } from 'vuetify/components';

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VImg,
  },
  data() {
    return {
      imageSliderOpen: false,
      selectedImage: null,
      visibleCount: this.getVisibleCount(),
      isSliderOpen: false,
      index: 0,
      images: [
        // 각 프로젝트에 맞는 이미지 배열
        [
          "/second/second0.jpg",
          "/second/second1.png",
          "/second/second2.png",
          "/second/second3.png",
          "/second/second4.png",
          "/second/second6.png",
        ],
        [
          "/jongnol/4.png",
          "/second/second1.png",
          "/second/second2.png",
          "/second/second3.png",
          "/second/second4.png",
          "/second/second6.png",
        ],
        [
          "/nc4/nc40.png",
          "/nc4/nc41.png",
          "/nc4/nc42.png",
          "/nc4/nc44.png",
          "/nc4/nc45.png",
          "/nc4/nc46.png",
          "/nc4/nc47.png",
          "/nc4/nc48.png",
          "/nc4/nc49.png",
          "/nc4/nc410.png",
          "/nc4/nc411.png",
          "/nc4/nc412.png",
        ],
        [
          "/second/second0.jpg",
          "/second/second1.png",
          "/second/second2.png",
          "/second/second3.png",
          "/second/second4.png",
          "/second/second6.png",
        ],
      ],
    };
  },
  computed: {
    visibleImages() {
      return this.images[this.project.index].slice(this.index, this.index + this.visibleCount);
    },
    hasHiddenImages() {
      return this.images[this.project.index].length === 0;
    },
    projectInfo() {
      const projects = {
        0: {
          date: "아직 모름",
          description: "이 프로젝트는 Vue.js와 Vuetify를 활용한 UI 개발 프로젝트입니다.",
          features: "📌 반응형 UI, 📊 데이터 시각화, 🔧 실시간 업데이트",
          tech: "Vue.js, Vuetify",
        },
        1: {
          date: "아직 모름",
          description: "Vuetify를 활용한 프론트엔드 디자인 시스템 프로젝트입니다.",
          features: "🎨 커스텀 디자인, 📦 컴포넌트 재사용, 🚀 최적화된 성능",
          tech: "Vue.js, Vuetify",
        },
        2: {
          date: "24. 02 ~ 24. 04 / 3人",
          description: "'NC4All’은 누구나 강사가 되어 자신만의 강의를 올릴 수 있는 개발자들을 위한 온라인 강의 웹 서비스입니다.",
          features:
              "구현했던 페이지 및 기능 :\n\n" +

              "● 메인 페이지 구성\n\n" +
              "- 실시간 인기 강의 - 백엔드에서 평균 별점과 리뷰 수를 받아와 높은 별점과 많은 리뷰 수를 가진 강의부터 표시.\n" +
              "- 최근 등록된 강의 - 강의 등록 순서대로 최신 강의를 표시.\n" +
              "- 랜덤 추천 강의 - MySQL RAND() 함수로 페이지가 렌더링될 때마다 새로운 강의를 랜덤으로 표시.\n" +
              "- 최근 리뷰 - 최신 리뷰를 동적으로 표시, 최대 10개의 리뷰를 스크롤을 통해 표시.\n" +
              "- React의 useState를 사용하여 슬라이드 인덱스를 관리하고, 클릭 이벤트로 인덱스를 업데이트.\n\n" +
              "● 관리자 페이지 구성\n\n" +
              "- 관리자 페이지는 useEffect를 사용하여 렌더링 시 관리자 권한을 확인하고, 권한이 없는 경우 리디렉션합니다.\n" +
              "- 오늘의 정보 섹션: 신규 가입, 강사 승인 대기, 문의 대기, 신고 내역 수 등을 표시.\n" +
              "- Recharts 그래프: 회원, 신규 가입자, 탈퇴 회원 수의 변동 사항을 시각화하여 표시.\n" +
              "- 공지사항 및 게시판 현황: 각 항목을 클릭하여 상세 정보를 확인 가능.\n" +
              "- 문의 및 신고 현황: 미처리된 문의 및 신고를 빠르게 처리 가능.\n" +
              "- 최근 가입자 및 강사 등록 신청 현황: 가입자 정보 및 강사 신청자를 관리.\n\n" +
              "● 마이페이지 구성\n\n" +
              "- 마이페이지는 Mui Tabs 및 Tab 컴포넌트를 사용하여 탭을 관리하고, useState를 통해 탭 변경 시 해당 값을 업데이트.\n" +
              "- 계정 정보: 프로필 이미지 변경 및 닉네임 변경, 이미지 업로드 후 FormData로 POST 요청.\n" +
              "- 강사 신청: 신청 버튼 클릭 시 강사 권한 대기 상태로 변경, 관리자가 권한을 변경하여 강사 등록.\n" +
              "- 회원 탈퇴: 탈퇴 요청 시 서버에 DELETE 요청을 보내고, 탈퇴 후 로그인이 불가능한 상태로 처리.\n" +
              "- 수강목록: 사용자가 수강 중인 강의를 확인하고 페이지네이션을 통해 탐색 가능.\n" +
              "- 구매내역: 구매 기록을 확인하고, 배열이 비어 있지 않으면 테이블에 행을 추가하여 표시.\n" +
              "- 포인트: 사용자의 포인트 변동 내역과 누적 포인트를 페이지네이션을 통해 확인.\n" +
              "- 문의내역: 사용자가 문의를 작성하고, 관리자의 답변 상태를 실시간으로 표시. 문의가 처리되면 완료 문구와 답변 내용 확인 가능.",
          tech: "Java17, SpringBoot, React, Node.js, NginX, NaverCloud, MySQL, JavaScript, HTML/CSS3",
        },
        3: {
          date: "24. 01 ~ 24. 02 / 5人",
          description:
              "‘secondStory’는 자신의 중고 물품들을 경매를 통해 사람들에게 거래할 수 있도록 도와주는 다양한 기능을 제공하는 웹 서비스입니다.",
          features:
              "구현했던 페이지 및 기능 :\n\n" +
              "● 마이페이지 및 검색 구성\n\n" +
              "- 상품 등록 / 해제 - 사용자 인터페이스를 향상시키기 위해 AJAX를 사용하여 비동기적으로 관심 상품을 등록/해제 가능하게 구현.\n\n" +
              "- 최근 본 상품 - 쿠키를 사용하여 사용자가 본 상품을 저장하고 AJAX로 새로고침 없이 실시간으로 표시.\n\n" +
              "- 상품 검색 - 프론트에서 입력된 값을 백엔드로 보내고, 상품 제목과 일치하는 항목을 찾아 결과를 다시 프론트로 반환.\n\n",
          tech: "Java17, SpringBoot, Thymeleaf, JQuery, NaverCloud, MySQL, JavaScript, HTML/CSS3",
        },
      };
      return projects[this.project.index] || {
        title: "알 수 없는 오류",
        description: "기본 설명입니다.",
        features: "오류",
        tech: "알 수 없음",
      };
    },
  },
  methods: {
    toggleImageSlider() {
      this.imageSliderOpen = !this.imageSliderOpen;
      this.isSliderOpen = !this.isSliderOpen;
    },
    openImage(img) {
      this.selectedImage = img;
    },
    closeImage() {
      this.selectedImage = null;
    },
    nextSlide() {
      if (this.index + this.visibleCount < this.images[this.project.index].length) {
        this.index += this.visibleCount;
      }
    },
    prevSlide() {
      if (this.index > 0) {
        this.index -= this.visibleCount;
      }
    },
    getVisibleCount() {
      if (window.innerWidth > 1150) return 6;
      if (window.innerWidth > 1000) return 5;
      if (window.innerWidth > 850) return 4;
      if (window.innerWidth > 499) return 3;
      return 2;
    },
    handleResize() {
      this.visibleCount = this.getVisibleCount();
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped lang="scss">
.v-card {
  padding: 20px;
  white-space: pre-line;
  gap: 1rem;
  display: grid;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.2}s;
    }
  }
}

.v-img,
.v-card-title,
.project-tech,
.project-img,
.v-card-subtitle,
.v-card-description,
.image-slider-container {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;
}

.v-img {
  animation-delay: 0.2s;
}
.v-card-title {
  animation-delay: 0.4s;
}
.project-tech {
  animation-delay: 0.6s;
}
.project-img {
  animation-delay: 1s;
}
.v-card-subtitle {
  animation-delay: 1s;
}
.v-card-description {
  animation-delay: 1.2s;
}
.image-slider-container {
  animation-delay: 0.2s;
}
.image-item {
  animation-delay: 0.2s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-img {
  border-radius: 12px;
}

.project-tech {
  font-size: 1rem;
  text-align: left;

  @media (max-width: 700px) {
    font-size: 0.825rem;
  }
}

.project-img {
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  justify-self: left;
  font-weight: 600;

  @media (max-width: 700px) {
    font-size: 0.85rem;
  }
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

  @media (max-width: 700px) {
    font-size: 1.25rem;
  }
}

.v-date {
  font-size: 0.6em;
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

  @media (max-width: 700px) {
    font-size: 14px;
  }
}

.image-slider-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 700px) {
    gap: 0.8rem;
  }
}

.image-slider {
  display: flex;
  overflow: hidden;
  gap: 10px;
}

.image-item {
  width: 150px;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;

  @media (max-width: 700px) {
    width: 90px;
    height: 90px;
  }
}

.image-item:hover {
  transform: scale(1.1);
}

.prev-button,
.next-button {
  background-color: transparent;
  cursor: pointer;
}

.prev-button:disabled,
.next-button:disabled {
  cursor: not-allowed;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.expanded-image {
  max-width: 90%;
  max-height: 90%;
}

.img-next,
.img-prev {
  width: 30px;
  height: 30px;
}

.v-card::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.v-card::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.v-card::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.v-card::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>