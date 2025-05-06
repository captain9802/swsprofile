# 🌐 sws-portfolio - Frontend

**sws-portfolio.com**은 손우성 개발자의 포트폴리오 사이트로, Vue 3 기반으로 개발된 정적 웹 애플리케이션입니다.

> 프로젝트, 블로그, 경력, 자기소개 등을 담은 개인 소개 페이지이며, Laravel 기반 백엔드와 연동되어 게시글 작성 기능 등을 제공합니다.

---

## 🚀 주요 기능

* 🏠 메인(Home) 페이지
* 🧑‍💼 경력, 자기소개 소개 섹션
* 📚 블로그 게시글 열람 및 관리
* 🎨 반응형 UI 및 인터랙션
* 🌐 백엔드 API와 통신하여 게시글 CRUD 지원

---

## 📁 폴더 구조 (요약)

```
src/
├── assets/            # 이미지 및 정적 리소스
├── components/        # 공통 UI 컴포넌트
├── main/              # 메인 페이지 구성 (Home.vue)
├── sup/               # 블로그, 리뷰 등 서브 페이지
│   ├── BlogReview.vue
│   └── Dialog.vue
├── App.vue            # 전체 앱 레이아웃
└── main.js            # 진입점 (Vue 앱 마운트)
```

---

## 🛠 기술 스택

| 항목    | 기술                 |
| ----- | ------------------ |
| 프레임워크 | Vue 3              |
| 라우팅   | X   |
| 상태관리  | Composition API 기반 |
| 스타일   | CSS, 자체 모듈         |
| 빌드 도구 | Vite               |

---

## ⚙️ 실행 방법

```bash
git clone https://github.com/사용자명/sws-portfolio-frontend.git
cd sws-portfolio-frontend
npm install
npm run dev
```

> 기본 주소: [http://localhost:5173](http://localhost:5173)

`.env` 파일을 통해 API 서버 주소 등을 설정할 수 있습니다.

---

## 🔗 연동 백엔드

* Backend: [sws-portfolio-backend](https://github.com/사용자명/sws-portfolio-backend)
* 인증 및 블로그 관련 데이터는 Laravel API를 통해 처리됩니다.

---

## 👨‍💻 개발자

* 손우성 ([@captain9802](https://github.com/captain9802))

---
