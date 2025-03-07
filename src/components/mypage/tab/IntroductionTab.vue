<template>
  <div class="tab-content-myprofile">
    <div class="tab-content">
      <div class="profile-container">
        <div class="introduce-section">
          <div class="text-with-line">
            <div class="text-with-line-text">INTRODUCE</div>
          </div>
          <div class="introduce">
            안녕하세요. 저는 개발자 손우성입니다.<br />
            현재 FrontEnd 직군에서 프로젝트를 진행하고 있습니다.<br />
            Vue와 React를 활용한 개발을 좋아하며, 새로운 기술에 대한 도전을 즐깁니다.<br />
            프론트엔드뿐만 아니라 Springboot를 활용한 BackEnd 경험도 보유하고 있으며,<br />
            배포의 경험도 보유하고 있습니다.<br />
            또한 디자인과 개발의 접점에서 사용자 경험을 고려한 인터페이스 구현을 중요하게 생각합니다.<br />
            <br />
            기술 트렌드에 관심이 많아, 새로운 기술을 빠르게 습득하고 적용하는 것을 즐깁니다.<br />
            더 좋은 서비스와 효율적인 개발 방법을 고민하며,<br />
            매일 성장하는 개발자가 되기 위해 노력하고 있습니다.<br />
            잘 부탁드립니다! 😊<br />
          </div>
        </div>
        <div class="tags-section">
          <div class="text-with-line">
            <div class="text-with-line-text">TAGS</div>
          </div>
          <div class="tags">
            #React #Node,Js #Javascript #Html #Jpa #jQuery
            #Css #Vue #MySQL #AWS #Nginx #SpringBoot #Thymeleaf
          </div>
        </div>
      </div>
      <div class="stack-container">
        <div class="text-with-line">
          <div class="text-with-line-text">FrontEnd Stack</div>
        </div>
        <div class="stack-list">
          <div class="stack-item" v-for="stack in frontendStacks" :key="stack.name">
            <img :src="stack.img" :alt="stack.name" />
            <span>{{ stack.name }}</span>
          </div>
        </div>
      </div>
      <div class="stack-container">
        <div class="text-with-line">
          <div class="text-with-line-text">BacktEnd Stack</div>
        </div>
        <div class="stack-list">
          <div class="stack-item" v-for="stack in backendStacks" :key="stack.name">
            <img :src="stack.img" :alt="stack.name" />
            <span>{{ stack.name }}</span>
          </div>
        </div>
      </div>
      <div class="stack-container">
        <div class="text-with-line">
          <div class="text-with-line-text">Server & Cloud</div>
        </div>
        <div class="stack-list">
          <div class="stack-item" v-for="stack in serverStacks" :key="stack.name">
            <img :src="stack.img" :alt="stack.name" />
            <span>{{ stack.name }}</span>
          </div>
        </div>
      </div>
      <div class="stack-container">
        <div class="text-with-line">
          <div class="text-with-line-text">Collaboration Tools</div>
        </div>
        <div class="stack-list">
          <div class="stack-item" v-for="stack in collaboratorStacks" :key="stack.name">
            <img :src="stack.img" :alt="stack.name" />
            <span>{{ stack.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroductionTab",
  data() {
    return {
      frontendStacks: [
        { name: "Javascript", img: "/stack/JavaScript.png" },
        { name: "Vue", img: "/stack/Vue.png" },
        { name: "Jquery", img: "/stack/jquery.png" },
        { name: "React", img: "/stack/React.png" },
        { name: "Thymeleaf", img: "/stack/Thymeleaf.png" },
        { name: "Zustand", img: "/stack/Zustand.png" },
        { name: "Redux", img: "/stack/Redux.png" },
        { name: "Framer-Motion", img: "/stack/framer.png" },
        { name: "Styled Component", img: "/stack/Styled Component.png" },
        { name: "React Chart", img: "/stack/chart.png" },
        { name: "HTML", img: "/stack/html.png" },
        { name: "CSS", img: "/stack/css.png" },
      ],
      backendStacks: [
          { name: "Java", img: "/stack/java.png" },
          { name: "Spring Boot", img: "/stack/Springboot.png" },
          { name: "Node.js", img: "/stack/node.png" },
          { name: "Gradle", img: "/stack/gradle.png" },
      ],
      serverStacks: [
          { name: "AWS ", img: "/stack/AWS.png" },
          { name: "Naver Cloud", img: "/stack/naver.png" },
          { name: "Nginx", img: "/stack/nginx.png" },
          { name: "Ubuntu", img: "/stack/ubuntu.png" },
          { name: "MySql", img: "/stack/mysql.png" },
      ],
      collaboratorStacks: [
          { name: "GitHub", img: "/stack/github.png" },
          { name: "Jira", img: "/stack/jira.png" },
          { name: "Pisxo", img: "/stack/pisxo.png" },
          { name: "Figma", img: "/stack/figma.png" },
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-content-myprofile {
  width: 100%;
  background-color: #F3EBE6;
  border-radius: 10px;
  height: 100%;
  overflow: auto;
}

.tab-content {
  padding: 1.5rem;
  max-width: 1100px;
}

.profile-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  @media (max-width: 1200px) {
    display: grid;
  }
}

.introduce-section {
  flex: 3;
}

.tags-section {
  flex: 1;
}

.text-with-line {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}

.text-with-line::before,
.text-with-line::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: black;
}

.text-with-line::before {
  flex: 0.05;
}

.text-with-line-text {
  font-size: 18px;
  font-weight: bold;
  margin: 0 1rem;
  color: #12100E;
}

.introduce {
  font-size: 16px;
  line-height: 1.7;
  font-weight: 600;
  color: #12100E;

}
.tags {
  font-size: 15px;
  line-height: 1.6;

}

.stack-container {
  margin-top: 2rem;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
}

.stack-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  padding: 10px;
  text-align: center;
  font-size: 15px;
  height: 100%;
  overflow: hidden;

  @media (max-width: 1200px) {
    width: 100px;
    padding: 0;
  }
}

.stack-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}

.stack-item span {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.tab-content-myprofile::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.tab-content-myprofile::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.tab-content-myprofile::-webkit-scrollbar-thumb {
  background: #CEC4CD;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.tab-content-myprofile::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
