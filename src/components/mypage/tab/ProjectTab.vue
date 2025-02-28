<template>
  <div class="slider-container">
    <h2 class="title">앨범 슬라이드</h2>

    <div class="slider">
      <div class="slides" :style="sliderStyle">
        <div
            v-for="(project, index) in projects"
            :key="index"
            class="project-card"
            :style="getCardStyle(index)"
        >
          <img :src="project.image" :alt="project.name" class="project-image" />
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="prevSlide">«</button>
      <button @click="openDetail(projects[1])" class="play-button">▶</button>
      <button @click="nextSlide">»</button>
    </div>

    <div class="progress-bar">
      <div class="progress" :style="progressStyle"></div>
    </div>

    <ProjectDetail v-if="isDetailOpen" :project="selectedProject" @close="isDetailOpen = false" />
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import ProjectDetail from "@/components/mypage/tab/project/ProjectDetail.vue";

export default {
  components: { ProjectDetail },
  setup() {
    const projects = ref([
      { name: "앨범 A", description: "A 앨범 설명", image: "/jongnol/title.png" },
      { name: "앨범 B", description: "B 앨범 설명", image: "/jongnol/project2.png" },
      { name: "앨범 C", description: "C 앨범 설명", image: "/jongnol/project3.png" },
      { name: "앨범 D", description: "D 앨범 설명", image: "/jongnol/project4.png" },
      { name: "앨범 E", description: "E 앨범 설명", image: "/jongnol/project5.png" },
    ]);

    const currentIndex = ref(0);
    const isDetailOpen = ref(false);
    const selectedProject = ref(null);
    const timer = ref(0);
    const progressStyle = ref({ width: '0%' });

    const sliderStyle = computed(() => {
      return {
        transform: `translateX(${- (currentIndex.value - 1) * 33.33}%)`,
        transition: 'transform 0.6s ease-in-out'
      };
    });

    const startTimer = () => {
      setInterval(() => {
        if (timer.value < 10) {
          timer.value++;
          progressStyle.value = { width: `${(timer.value / 10) * 100}%` };
        } else {
          nextSlide();
        }
      }, 1000);
    };

    const resetTimer = () => {
      timer.value = 0;
      progressStyle.value = { width: '0%' };
    };

    const getCardStyle = (index) => {
      if (index === currentIndex.value) {
        return { opacity: 1, transform: 'scale(1)', transition: 'opacity 0.6s ease, transform 0.6s ease' };
      }
      else {
        return { opacity: 0.5, transform: 'scale(0.8)', transition: 'opacity 0.6s ease, transform 0.6s ease' };
      }
    };

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % (projects.value.length);
      resetTimer();
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
      resetTimer();
    };

    const openDetail = (project) => {
      selectedProject.value = project;
      isDetailOpen.value = true;
    };

    onMounted(() => {
      startTimer();
    });


    return {
      currentIndex,
      isDetailOpen,
      selectedProject,
      projects,
      nextSlide,
      prevSlide,
      openDetail,
      progressStyle,
      sliderStyle,
      getCardStyle,
    };
  },
};
</script>

<style scoped>
.slider-container {
  text-align: center;
  position: relative;
  max-width: 1050px;
  margin: auto;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
}

.slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-height: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
}

.slides {
  display: flex;
  width: 100%;
}

.project-card {
  flex: 1 0 33.33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-image {
  max-width: 400px;
  max-height: 400px;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.play-button {
  font-size: 1.5rem;
}

.progress-bar {
  margin-top: 20px;
  height: 5px;
  background-color: #ddd;
  width: 100%;
}

.progress {
  height: 100%;
  background-color: #4caf50;
}
</style>
