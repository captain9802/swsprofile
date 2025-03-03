<template>
  <div class="tab-container">
      <div
          class="tab-content"
          :class="{ active: selectedTab === 'introduction' }"
          @click="selectTab('introduction')"
      >
        <img src="/my_profile.png" alt="프로필 탭" class="tab-content-img" />
      </div>
      <div
          class="tab-content"
          :class="{ active: selectedTab === 'project' }"
          @click="selectTab('project')"
      >
        <img src="/my_project.png" alt="프로젝트 탭" class="tab-content-img" />
      </div>
      <div
          class="tab-content"
          :class="{ active: selectedTab === 'career' }"
          @click="selectTab('career')"
      >
        <img src="/my_carrer.png" alt="경력 탭" class="tab-content-img" />
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
  }
};
</script>

<style lang="scss" scoped>
.tab-container {
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
  background-color: #f0f0f0;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ddd;
    transform: scale(1.1);
  }
}

.tab-content-img {
  width: 40px;
  height: 40px;
}

.tab-content.active {
  background-color: #f0f0f0;
  transform: scale(1.15);
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}

</style>
