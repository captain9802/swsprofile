<template>
  <div class="slider-container">
    <div class="title">{{ currentProject.name }}</div>
    <div class="sub-title">{{ currentProject.description }}</div>
    <div class="slider">
      <div class="slides" :style="sliderStyle">
        <div
            v-for="(project, index) in projects"
            :key="index"
            class="project-card"
            :style="getCardStyle(index)"
            @click="changeSlide(index)"
        >
          <img :src="project.image" :alt="project.name" class="project-image" />
        </div>
      </div>
    </div>

    <div class="progress-bar">
      <div class="progress" :style="progressStyle"></div>
      <div class="progress-time">{{ timerText }}</div>
    </div>
    <div class="controls">
      <button @click="prevSlide"><img src="/jongnol/prev.png" class="prev-button"></button>
        <button @click="togglePlay">
          <img  class="play-button" :src="isPlaying ? '/jongnol/pause.png' : '/jongnol/play.png'"  />
        </button>
      <button @click="nextSlide"><img src="/jongnol/next.png"  class="next-button" ></button>
    </div>

    <v-dialog v-model="isDetailOpen" max-width="500px">
      <ProjectDetail/>
    </v-dialog>
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
    const timerText = ref("0:00");
    let timeoutId = null;
    let intervalId = null;
    const isPlaying = ref(false);
    const currentProject = computed(() => projects.value[currentIndex.value]);
    let progressPercentage = 0;
    let timerCount = 0;

    const sliderStyle = computed(() => {
      return {
        transform: `translateX(${- (currentIndex.value - 1) * 33.33}%)`,
        transition: 'transform 0.6s ease-in-out'
      };
    });

    const progressStyle = ref({ width: "0%", transition: "none" });

    const startTimer = () => {
      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        timer.value = timerCount;
        timerText.value = `0:${timer.value.toString().padStart(2, "0")}`;
        timerCount++;

        progressPercentage = Math.min((timerCount / 10) * 100, 100);
        progressStyle.value = {
          width: `${progressPercentage}%`,
          transition: "width 1s linear"
        };

        if (timerCount >= 11) {
          clearInterval(intervalId);
          setTimeout(() => {
            nextSlide();
          }, 500);
        }
      }, 1000);
    };


    onBeforeUnmount(() => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    });


    const changeSlide = (index) => {
      if (index === currentIndex.value) {
        openDetail(projects.value[index]);
      } else {
        currentIndex.value = index;
        timerCount = 0;
        progressStyle.value = { width: "0%", transition: "none" };
        startTimer();
      }
    };

    const getCardStyle = (index) => {
      if (index === currentIndex.value) {
        return { opacity: 1, transform: "scale(1)", transition: "opacity 0.6s ease, transform 0.6s ease" };
      } else {
        return { opacity: 0.5, transform: "scale(0.8)", transition: "opacity 0.6s ease, transform 0.6s ease" };
      }
    };

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % projects.value.length;
      timerCount = 0;
      progressStyle.value = { width: "0%", transition: "none" };
      startTimer();
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
      progressPercentage = 0;
      timerCount = 0;
      progressStyle.value = { width: "0%", transition: "none" };
      startTimer();
    };

    const openDetail = (project) => {
      selectedProject.value = project;
      isDetailOpen.value = true;
    };

    onMounted(() => {
      startTimer();
      isPlaying.value = true;
    });

    onBeforeUnmount(() => {
      if (intervalId) clearInterval(intervalId);
    });

    const togglePlay = () => {
      if (isPlaying.value) {
        clearInterval(intervalId);
        progressStyle.value = { width: `${progressPercentage}%`, transition: "none" };
      } else {
        startTimer();
      }

      isPlaying.value = !isPlaying.value;
    };


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
      currentProject,
      timerText,
      togglePlay,
      isPlaying,
      changeSlide,
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

.sub-title {
  font-size: 1.4rem;
  font-weight: lighter;
  margin: 1.25rem 0;
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
  gap: 2.25rem;
}

button {
  background: none;
  border: none;
  font-size: 3.25rem;
  cursor: pointer;
}

.play-button {
  width: 60px;
  display: flex;
}

.prev-button,
.next-button {
  width: 45px;
  display: flex;
}

.progress-bar {
  margin: 2.25rem 0;
  height: 0.825rem;
  background-color: #ddd;
  width: 350px;
  border-radius: 10px;
  justify-self: center;
}

.progress {
  height: 100%;
  background-color: black;
  border-radius: 10px;
  transition: width 10s linear;
}
</style>
