<template>
  <div class="tab-container">
      <div
          class="tab-content"
          :class="{ active: selectedTab === 'introduction' }"
          @click="selectTab('introduction')"
      >
        <img :src="introductionImage" alt="프로필 탭" class="tab-content-img" />
      </div>
      <div
          class="tab-content"
          :class="{ active: selectedTab === 'project' }"
          @click="selectTab('project')"
      >
        <img :src="projectImage" alt="프로젝트 탭" class="tab-content-img" />
      </div>
      <div
          class="tab-content"
          :class="{ active: selectedTab === 'career' }"
          @click="selectTab('career')"
      >
        <img :src="careerImage" alt="경력 탭" class="tab-content-img" />
      </div>
    <div
        class="tab-content"
        :class="{ active: selectedTab === 'blog' }"
        @click="selectTab('blog')"
    >
      <img :src="blogImage" alt="blog" class="tab-content-img" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedTab: String
  },
  methods: {
    selectTab(tabName) {
      this.$emit("tab-selected", tabName);
    }
  },
  computed: {
    introductionImage() {
      return this.selectedTab === "introduction" ? "/my_profile1.png" : "/my_profile.png";
    },
    projectImage() {
      return this.selectedTab === "project" ? "/my_project1.png" : "/my_project.png";
    },
    careerImage() {
      return this.selectedTab === "career" ? "/career1.png" : "/career.png";
    },
    blogImage() {
      return this.selectedTab === "blog" ? "/my_carrer1.png" : "/my_carrer.png";
    }
  },
};
</script>

<style lang="scss" scoped>
.tab-container {
  background-color: #A28974 ;
  display: grid;
  align-content: center;
  justify-content: center;
  height: 100%;
  gap: 3rem;
  @media (max-width: 1200px) {
    display: flex;
  }
}

.tab-content {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30%;
  background-color: #F3EBE6;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    animation: shakeAndScale 0.5s ease-in-out infinite;
  }
  @keyframes shakeAndScale {
    0% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.1) rotate(3deg); }
    50% { transform: scale(1.1) rotate(-3deg); }
    75% { transform: scale(1.1) rotate(2deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
}

.tab-content-img {
  width: 40px;
  height: 40px;
}

.tab-content.active {
  background-color: #f0f0f0;
  transform: scale(1.15);
  box-shadow: 0 0 10px #f0f0f0;
}

</style>
