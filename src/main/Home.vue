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
}

.left {
  width: 678px;
  background-color: #eaeaea;
  padding: 20px;
}

.tab {
  width: 60px;
  background-color: #ddd;
}

.project {
  flex-grow: 1;
  background-color: #eaeaea;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  transition: background-color 0.3s ease;
}
</style>
