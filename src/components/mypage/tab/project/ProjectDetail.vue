<template>
  <v-card class="v-card dark:bg-[#1e1e1e] dark:text-white" :key="project.index">
    <v-img class="v-img" :src="project.main" contain alt="Project Image"></v-img>

    <v-card-title class="v-card-title">
      <span class="project-name dark:text-white">{{ project.name }}</span>
      <span class="v-date dark:text-gray-300">({{ projectInfo.date }})</span>
      <div class="project-tech dark:text-gray-300">주 기술 : {{ projectInfo.tech }}</div>
    </v-card-title>

    <div>
      <a v-if="project.index === 0"
         href="https://sws-jlpt.com/"
         target="_blank"
         class="project-url dark:text-blue-400 hover:underline">
        www.sws-jlpt.com
      </a>
      <a v-if="project.index === 1"
         href="https://sws-portfolio.com/"
         target="_blank"
         class="project-url dark:text-blue-400 hover:underline">
        www.sws-portfoilo.com
      </a>
      <a v-else-if="project.index === 2"
         href="https://jongnol.site"
         target="_blank"
         class="project-url dark:text-blue-400 hover:underline">
        www.jongnol.site
      </a>
    </div>

    <div v-if="!hasHiddenImages">
      <span class="project-img dark:text-gray-200" @click="toggleImageSlider">
        프로젝트 상세 이미지 보기 {{ isSliderOpen ? '▲' : '▼' }}
      </span>

      <div v-if="imageSliderOpen" class="image-slider-container">
        <button class="prev-button" @click="prevSlide" :disabled="index === 0">
          <img class="img-prev" :src="index === 0 ? '/cprev.png' : '/prev1.png'" alt="이전 버튼">
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
          <img class="img-next" :src="index + visibleCount >= images[project.index].length ? '/cnext.png' : '/next1.png'" alt="다음 버튼">
        </button>
      </div>
    </div>

    <v-card-subtitle class="v-card-subtitle dark:text-gray-300">
      {{ projectInfo.description }}
    </v-card-subtitle>
    <v-card-subtitle class="v-card-description dark:text-gray-300">
      {{ projectInfo.features }}
    </v-card-subtitle>

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
        [
          "/jlpt/1.png",
          "/jlpt/2.png",
          "/jlpt/3.png",
          "/jlpt/4.png",
          "/jlpt/5.png",
          "/jlpt/6.png",
          "/jlpt/7.png",
          "/jlpt/8.png",
          "/jlpt/9.png",
          "/jlpt/10.png",
          "/jlpt/11.png",
          "/jlpt/12.png",
          "/jlpt/13.png",
          "/jlpt/14.png",
          "/jlpt/15.png",
          "/jlpt/16.png",
          "/jlpt/17.png",
          "/jlpt/18.png",
        ],
        [
          "/sws/sws_0.png",
          "/sws/sws_1.png",
          "/sws/sws_2.png",
          "/sws/sws_3.png",
          "/sws/sws_4.png",
          "/sws/sws_5.png",
        ],
        [
          "/jongnol/project/Main.png",
          "/jongnol/project/메인 모바일.png",
          "/jongnol/project/홈 화면.png",
          "/jongnol/project/검색.png",
          "/jongnol/project/검색 모바일.png",
          "/jongnol/project/퀴즈 풀기전.png",
          "/jongnol/project/퀴즈 풀기.png",
          "/jongnol/project/퀴즈 등록 dialog.png",
          "/jongnol/project/문제 작성.png",
          "/jongnol/project/마이페이지 회원정보.png",
          "/jongnol/project/마이페이지 내 퀴즈.png",
          "/jongnol/project/로그인.png",
          "/jongnol/project/회원가입.png",
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
          date: "25. 03 ~ 25. 05 / 1人",
          description: "'SWS-JLPT'는 JLPT 일본어 단어·문법·문장을 AI와 함께 학습할 수 있도록 개발한 개인 프로젝트입니다. GPT API, JWT 인증, 컴포넌트 재사용, 학습 데이터 자동화 등 다양한 기술을 실전으로 구현한 프로젝트입니다.",
          features: "구현한 페이지 및 기능:\n\n" +
              "● 로그인 및 사용자 인증\n\n" +
              "- 카카오 소셜 로그인 연동 및 백엔드 인증 처리.\n" +
              "- JWT 기반 인증 시스템 구축으로 사용자별 학습 정보 분리.\n\n" +
              "● 메인 대화 페이지 (Chat)\n\n" +
              "- AI 캐릭터와 실시간 일본어 대화 구현 (GPT 연동).\n" +
              "- 문장 속 단어/문법 자동 분석 및 툴팁(TTS/뜻/번역/즐겨찾기) 제공.\n" +
              "- 캐릭터 설정(이름/성격/말투/목소리) 및 JLPT 레벨 설정 가능.\n\n" +
              "● 즐겨찾기 기능 (단어/문법/문장)\n\n" +
              "- 리스트(단어장, 문법장, 문장집) 단위로 항목을 저장/관리.\n" +
              "- 각 리스트는 카드형 UI로 출력되며, 제목 수정 및 삭제 가능.\n" +
              "- 문법·문장은 예시 문장과 함께 저장되며 자동 퀴즈와 연결.\n\n" +
              "● 퀴즈 기능 (단어/문법/문장)\n\n" +
              "- 즐겨찾기를 기반으로 한 맞춤형 퀴즈 제공 (4지선다, 빈칸 채우기 등).\n" +
              "- 정답/오답 결과 확인 및 복습 유도 UI 구현.\n\n" +
              "● 히라가나 / 가타카나 학습 및 게임\n\n" +
              "- 기본 문자를 카드 UI로 제공하며, 한국어 발음 함께 표시.\n" +
              "- 카드 클릭형 게임을 통해 재미있는 반복 학습 제공.\n\n" +
              "● 핵심 기술 요약\n\n" +
              "- GPT API 연동을 통한 실시간 일본어 분석 및 대화 처리.\n" +
              "- JWT 인증 시스템과 사용자별 DB 구조 설계.\n" +
              "- Laravel API + Vue 프론트 구조 완전 분리 및 통합 배포 (Nginx).\n" +
              "- 반응형 UI, 컴포넌트 재사용 구조 설계, 동적 퀴즈 로직 구현.\n\n" +
              "● 향후 예정 기능\n\n" +
              "- 대화 요약 및 메모리 기반 대화 지속 기능\n" +
              "- 이전 채팅 내역 불러오기 및 이어서 대화하기\n" +
              "- 설정값에 따라 목소리 스타일 변경 (TTS 설정 커스터마이징)\n" +
              "- 마이크 입력 기능 추가 (음성으로 AI 대화)\n" +
              "- 단어/문법 통계 기반 추천 학습 제공 (AI 피드백 기능)\n",
          tech: "Vue, Laravel, JavaScript, JWT, Nginx, AWS EC2, MySQL, GPT-3.5/4.0 API, Kakao Login, Ubuntu"
        },
        1: {
          date: "25. 02 ~ 25. 03 / 1人",
          description: "'SWS-Portfolio'는 손우성이라는 개발자를 소개하기 위해 만든 프로젝트입니다.",
          features: "구현한 페이지 및 기능:\n\n" +
              "● 메인 페이지 레이아웃 구성\n\n" +
              "- MyIntroduction 컴포넌트: 좌측에 배치하여 개인 소개 정보를 표시.\n" +
              "- MyTab 컴포넌트: 탭을 생성하고, 클릭 시 동적으로 내용을 변경하는 기능 구현.\n" +
              "- 동적 탭 전환: selectedTab을 이용해 탭 선택 시 관련된 컴포넌트를 동적으로 전환.\n\n" +
              "● 탭 전환 및 내용 동적 변경\n\n" +
              "- 탭 클릭 시 selectedTab이 변경되어, selectedComponent를 통해 관련 컴포넌트가 표시됨.\n" +
              "- @tab-selected 이벤트로 탭을 선택하고, changeProjectContent 메소드로 동적으로 콘텐츠를 출력.\n\n" +
              "● 커리어 탭 (CareerTab)\n\n" +
              "- 구직 상태와 프로젝트 경험을 표시.\n" +
              "- 각 프로젝트의 사용 언어, 개발 환경, 역할 등을 구체적으로 나열.\n\n" +
              "● 프로젝트 탭 (ProjectTab)\n\n" +
              "- 사용자가 참여한 프로젝트 목록을 동적으로 표시.\n" +
              "- 프로젝트 제목, 개발 기간, 기술 스택, 설명 등을 구체적으로 나열하고, 상세 보기 기능을 구현.\n\n" +
              "● 소개 탭 (IntroductionTab)\n\n" +
              "- 개발자 자기소개 및 기술 스택을 표시.\n\n" +
              "● 프로젝트 상세 페이지 (Project Detail)\n\n" +
              "- 각 프로젝트의 제목, 기간, 기술 스택, 설명 등을 포함한 상세 정보 제공.\n\n" +
              "● 블로그 탭 (BlogTab)\n\n" +
                  "- 사용자가 학습한 내용을 정리하여 게시글을 작성, 수정, 삭제 가능.\n" +
              "- 로그인한 사용자만 글 작성 가능하며, JWT 토큰을 활용한 인증 및 권한 관리.\n" +
              "- 게시글 클릭 시 상세 페이지(BlogReview)에서 내용 확인 가능.\n" +
              "- 제목 검색 및 태그 필터링 기능 제공 (최대 3개 태그 선택 가능).\n" +
              "- Quill 에디터를 활용하여 HTML 및 이미지 포함된 게시글 작성 가능.\n" +
              "- 모든 이미지는 AWS S3와 연동하여 저장 및 불러오기 처리.\n" +
              "- XSS 공격 방지를 위해 DOMPurify를 활용하여 HTML 내용 필터링.\n" +
              "- 페이지네이션을 지원하여 여러 개의 게시글을 효율적으로 관리.\n",
          tech: "Vue, NginX, AWS, JavaScript, HTML/CSS3, Ubuntu, Php, Laravel",
        },
        2: {
          date: "24. 11 ~ 25. 01 / 1人",
          description: "'JongNol’은 사용자가 직접 퀴즈를 만들고 공유하며, 다른 사람들이 이를 풀면서 재미와 지식을 동시에 얻을 수 있는 서비스입니다",
          features:
              "구현했던 페이지 및 기능 :\n\n" +
              "● 메인 페이지 구성\n\n" +
              "- 슬라이드 쇼 구현 - Framer Motion을 사용하여 3초마다 자동으로 전환되는 슬라이드 쇼를 구현.\n" +
              "- 애니메이션 구현 - 페이지 요소에 페이드 인 애니메이션을 적용하여 시각적 효과를 주었습니다.\n" +
              "- 반응형 디자인 - MUI 컴포넌트와 SCSS를 활용해 화면 크기에 따라 유동적으로 변화하는 레이아웃을 구현.\n\n" +
              "● 검색 페이지 구성\n\n" +
              "- 퀴즈 검색 기능 구현 - 사용자가 검색어를 입력하면 해당 검색어로 퀴즈 목록을 필터링하여 결과를 표시.\n" +
              "- 퀴즈 상세 보기 모달 - 퀴즈 카드 클릭 시 퀴즈의 상세 정보가 모달 형태로 나타나며, 퀴즈 시작을 위한 인터페이스 제공.\n\n" +
              "● 퀴즈 상세보기 및 미리보기\n\n" +
              "- 퀴즈 제목 및 설명 표시 - 퀴즈의 제목과 설명을 다이얼로그 상에 표시하여, 사용자가 퀴즈의 상세 정보를 쉽게 확인할 수 있도록 구현.\n" +
              "- 문제 수 선택 - 사용자가 퀴즈에서 풀 문제 수를 선택할 수 있도록 드롭다운 메뉴로 제공.\n\n" +
              "● 퀴즈 풀기 페이지\n\n" +
              "- 답안 저장 및 순차적 진행 - 사용자가 문제를 풀 때마다 답안을 로컬 스토리지에 저장하고, 새로고침 후에도 답안이 유지.\n" +
              "- 객관식 문제의 랜덤 순서 - 객관식 문제의 정답과 오답을 랜덤으로 섞어 사용자에게 보여주는 기능 구현.\n\n" +
              "● 퀴즈 등록\n\n" +
              "- 퀴즈 생성 다이얼로그 구성 - 퀴즈 제목, 설명, 썸네일 이미지를 삽입하고 데이터를 localStorage에 저장.\n" +
              "- 썸네일 이미지 업로드 - 사용자가 이미지를 업로드하면 FileReader를 이용해 Base64로 변환하여 저장.\n" +
              "- 문제 유형 선택 - 객관식과 주관식 문제 유형을 선택할 수 있도록 Tabs를 활용한 UI 구성.\n" +
              "- 데이터 저장 및 유효성 검사 - 사용자가 입력한 문제 데이터를 localStorage에 저장하고, 필수 입력값에 대한 유효성 검사.\n\n" +
              "● 마이페이지\n\n" +
              "- 회원정보 변경 - 프로필 이미지와 이름을 수정할 수 있으며, 변경 후 업데이트 버튼을 통해 정보를 저장.\n" +
              "- 회원탈퇴 - 회원탈퇴 버튼을 통해 유저 정보를 삭제.\n" +
              "- 유저 정보 기반 퀴즈 목록 조회 - 로그인한 사용자가 만든 퀴즈 목록을 서버에서 가져와 표시.\n" +
              "- 애니메이션 효과 - 퀴즈 카드가 부드럽게 나타나고, 마우스를 올리면 카드가 확대되는 효과 적용.\n\n" +
              "● 로그인\n\n" +
              "- 로그인 기능 - JWT 토큰으로 사용자 인증을 통해 로그인 후 홈페이지로 이동.\n" +
              "- 로그인 폼 - 아이디와 비밀번호 입력 필드를 구성하고, 폼 상태를 관리.\n\n" +
              "● 회원가입\n\n" +
              "- 회원가입 기능 - 아이디, 닉네임, 비밀번호를 입력받고 유효성 검사를 통해 회원가입 진행.\n" +
              "- 중복 확인 - 아이디와 닉네임 중복 여부를 서버에서 확인하고, 유효한 값만 사용하도록 설정.\n" +
              "- 비밀번호 유효성 검사 - 비밀번호의 유효성을 체크하고, 비밀번호 확인이 일치하는지 검증.",
          tech: "Java17, SpringBoot, React, Node.js, NginX, AWS, S3, MySQL, JavaScript, HTML/CSS3, Ubuntu",
        },
        3: {
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
        4: {
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
.project-url,
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
.project-url {
  animation-delay: 0.8s;
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
  position: sticky;
  border-radius: 12px;
}

.project-tech {
  font-size: 1rem;
  text-align: left;
  color: #3E3E3E;

  @media (max-width: 700px) {
    font-size: 0.825rem;
  }
}

.project-url {
  font-size: 1rem;
  color: #3E3E3E;
}

.project-img {
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  justify-self: left;
  font-weight: 600;
  color: #3E3E3E;

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
  color: #3E3E3E;

  @media (max-width: 700px) {
    font-size: 1.25rem;
  }
}

.v-date {
  font-size: 0.6em;

  @media (max-width: 450px) {
    display: block;
  }
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
  color: #3E3E3E;
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

.img-prev:hover {
  content: url('/prev.png');
}

.img-next:hover {
  content: url('/next.png');
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
  background: #CEC4CD;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.v-card::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>