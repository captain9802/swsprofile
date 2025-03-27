<template>
  <div class="tab-content-myprofile">
    <div class="tab-content">
      <div class="profile-container">
        <div class="introduce-section">
          <div class="text-with-line">
            <div class="text-with-line-text">INTRODUCE</div>
          </div>
          <div class="introduce">
            안녕하세요, 개발자 손우성입니다.
            저는 FrontEnd 분야에서 다양한 프로젝트를 진행하고 있으며,<br> 주로 Vue와 React를 사용하고 있습니다.<br>
            프론트엔드 외에도 SpringBoot, Laravel를 활용한 백엔드 경험과 AWS, NaverCloud를<br> 이용한 배포 작업 경험이 있습니다.
            새로운 기술에 도전하며 그 과정에서 배우는 것을 즐기고,<br> 사용자 경험을 중심으로 한 디자인과 개발에 많은 관심을 두고 있습니다.<br>
            또한, 다양한 기술을 습득하고 이를 제 프로젝트에 적용하는 것을 좋아하며,<br> 매일 새로운 오류를 해결하며 성장하는 개발자가 되기 위해 끊임없이 노력하고 있습니다.<br>
            앞으로도 계속해서 배우고, 성장해 나가겠습니다. 감사합니다! 😊
          </div>
        </div>
        <div class="tags-section">
          <div class="text-with-line">
            <div class="text-with-line-text">TAGS</div>
          </div>
          <div class="tags">
            #React #Node,Js #Javascript #Html #Jpa #jQuery
            #Css #Vue #MySQL #AWS #Nginx #SpringBoot #Thymeleaf #Laravel
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
          <div class="text-with-line-text">BackEnd Stack</div>
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
          { name: "PHP", img: "/stack/php.png" },
          { name: "Laravel", img: "/stack/Laravel.png" },
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
  background-color: #8B5E3B;
}

.text-with-line::before {
  flex: 0.05;
}

.text-with-line-text {
  font-size: 18px;
  font-weight: bold;
  margin: 0 1rem;
  color: #8B5E3B;
}

.introduce {
  font-size: 16px;
  line-height: 1.7;
  font-weight: 600;
  color: #3E3E3E;

}
.tags {
  font-size: 15px;
  line-height: 1.6;
  color: #3E3E3E;
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
  color: #3E3E3E;

  @media (max-width: 1200px) {
    padding: 0;
  }
  @media (max-width: 1200px) {
    width: 89px;
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
