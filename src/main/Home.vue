<template>
  <div class="layout">
    <div class="left">
      <MyIntroduction />
    </div>
    <div class="tab">
      <MyTab :selectedTab="selectedTab" @tab-selected="changeProjectContent" />
    </div>
    <div class="project">
      <component :is="selectedComponent" />
    </div>
  </div>
</template>

<script>
import MyIntroduction from "@/components/mypage/MyIntroduction.vue";
import MyTab from "@/components/mypage/MyTab.vue";
import IntroductionTab from "@/components/mypage/tab/IntroductionTab.vue";
import ProjectTab from "@/components/mypage/tab/ProjectTab.vue";
import CareerTab from "@/components/mypage/tab/CareerTab.vue";

export default {
  name: "MyPage",
  components: { MyTab, MyIntroduction, IntroductionTab, ProjectTab, CareerTab },
  data() {
    return {
      selectedTab: "introduction"
    };
  },
  computed: {
    selectedComponent() {
      return this.selectedTab === "project"
          ? ProjectTab
          : this.selectedTab === "career"
              ? CareerTab
              : IntroductionTab;
    }
  },
  methods: {
    changeProjectContent(tabName) {
      this.selectedTab = tabName;
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

.layout {
  display: flex;
  width: 100%;
  height: 100vh;

  @media (max-width: 1200px) {
    flex-direction: column; // 세로 정렬
    height: auto; // 높이 자동 조절
  }
}

.left {
  width: 678px;
  padding: 20px;
  background-color: #A28974;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0;
  }
}

.tab {
  width: 60px;
  background-color: #A28974;

  @media (max-width: 1200px) {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
  }
}

.project {
  flex-grow: 1;
  background-color: #A28974 ;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  color: #141111;
  @media (max-width: 1200px) {
    width: 100%;
    padding: 2rem 0;
  }
}
</style>
