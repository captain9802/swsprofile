<template>
  <div class="layout min-h-screen bg-white text-black dark:bg-[#121212] dark:text-white transition-colors duration-300">
    <div class="left bg-[#A28974] dark:bg-[#2c2c2c] p-5">
      <MyIntroduction />
    </div>

    <div class="tab bg-[#A28974] dark:bg-[#2c2c2c]">
      <MyTab :selectedTab="selectedTab" @tab-selected="changeProjectContent" />
    </div>

    <div class="project bg-[#A28974] dark:bg-[#1e1e1e] text-black dark:text-white flex-grow p-5 flex items-center justify-center font-bold text-lg">
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
import BlogTab from "@/components/mypage/tab/BlogTab.vue";

export default {
  name: "MyPage",
  components: {
    MyTab,
    MyIntroduction,
    IntroductionTab,
    ProjectTab,
    CareerTab,
    Blog: BlogTab,
  },
  data() {
    return {
      selectedTab: "introduction",
    };
  },
  computed: {
    selectedComponent() {
      return (
          {
            project: ProjectTab,
            career: CareerTab,
            blog: BlogTab,
          }[this.selectedTab] || IntroductionTab
      );
    },
  },
  methods: {
    changeProjectContent(tabName) {
      this.selectedTab = tabName;
    },
  },
};
</script>

<style>
.layout {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: row;
  transition: all 0.3s ease;
}

@media (max-width: 1200px) {
  .layout {
    flex-direction: column;
    height: auto;
  }

  .left,
  .tab,
  .project {
    width: 100% !important;
  }

  .tab {
    height: 50px;
    display: flex;
    justify-content: center;
  }
}

.left {
  width: 678px;
}

.tab {
  width: 60px;
}

.project {
  flex-grow: 1;
}
</style>
