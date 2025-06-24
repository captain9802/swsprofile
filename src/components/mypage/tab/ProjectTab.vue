<template>
  <div class="projects dark:bg-[#1e1e1e] transition-colors duration-300">
    <div class="projects-content">
      <div class="slider-container">
        <div class="title dark:text-[#b8926a]">{{ currentProject.name }}</div>
        <div class="sub-title dark:text-[#e0e0e0]">{{ currentProject.description }}</div>
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
        <div class="progress-container">
          <div class="progress-bar dark:bg-[#333]">
            <div class="progress dark:bg-[#e2a95f]" :style="progressStyle"></div>
            <div class="progress-time dark:text-[#e0e0e0]">{{ timerText }}</div>
          </div>
        </div>
        <div class="controls">
          <button @click="prevSlide"><img src="/jongnol/prev1.png" class="prev-button" /></button>
          <button @click="togglePlay">
            <img
                class="play-button"
                :class="{'hovered': isPlaying === false, 'hovers': isPlaying === true}"
                :src="isPlaying ? '/jongnol/pause1.png' : '/jongnol/play1.png'"
            />
          </button>
          <button @click="nextSlide"><img src="/jongnol/next1.png" class="next-button" /></button>
        </div>
        <v-dialog v-model="isDetailOpen" attach="body" class="custom-dialog">
          <div class="mini-button">
            <div class="mini-button-control">
              <img @click="showPrevProject" src="/jongnol/miniprev.png" class="prev-button-mini" />
              <img @click="showNextProject" src="/jongnol/mininext.png" class="next-button-mini" />
            </div>
            <img @click="closeDialog" src="/jongnol/cancel.png" class="cancel-button-mini" />
          </div>
          <ProjectDetail v-if="selectedProject" :project="selectedProject" />
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import ProjectDetail from "@/components/mypage/tab/project/ProjectDetail.vue";
import { VDialog } from 'vuetify/components';

export default {
  components: { VDialog, ProjectDetail },
  setup() {
    const projects = ref([
      { name: "SWS-Jlpt", description: "Jlpt 일본어 학습을 위한 대화 공부 사이트.", image: "/jongnol/jlpt1.png", main: "/jongnol/jlpt0.png", index: 0 },
      { name: "SWS-Portfolio", description: "개발자 손우성을 소개하는 포트폴리오 사이트.", image: "/jongnol/project1.png", main: "/jongnol/1.png", index: 1 },
      { name: "JNL – JongNoL", description: "사용자가 직접 퀴즈를 만들고 공유하며, 다른 사람들이 이를 풀면서 재미와 지식을 동시에 얻을 수 있는 서비스.", image: "/jongnol/project2.png", main: "/jongnol/3.png", index: 2 },
      { name: "NC4All-NextClassForAll", description: "누구나 강사가 되어 자신만의 강의를 올릴 수 있는 개발자들을 위한 온라인 강의 서비스.", image: "/jongnol/project3.png", main: "/jongnol/2.png", index: 3 },
      { name: "secondSTORY", description: "자신의 중고 물품들을 경매를 통해 사람들에게 거래할 수 있게 도와주는 다양한 기능을 제공하는 웹 서비스.", image: "/jongnol/project4.png", main: "/jongnol/main3.png", index: 4 },
    ]);

    const currentIndex = ref(0);
    const isDetailOpen = ref(false);
    const selectedProject = ref(null);
    const timer = ref(0);
    const timerText = ref("0:00");
    const isPlaying = ref(false);
    let timeoutId = null;
    let intervalId = null;
    let progressPercentage = 0;
    let timerCount = 0;

    const currentProject = computed(() => projects.value[currentIndex.value]);

    const sliderStyle = computed(() => ({
      transform: `translateX(${- (currentIndex.value - 1) * 33.33}%)`,
      transition: 'transform 0.6s ease-in-out',
    }));

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
          setTimeout(() => nextSlide(), 500);
        }
      }, 1000);
    };

    onMounted(() => {
      startTimer();
      isPlaying.value = true;
    });

    onBeforeUnmount(() => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    });

    const changeSlide = (index) => {
      if (index === currentIndex.value) {
        openDetail(projects.value[index]);
        if (!isPlaying.value) return;
        togglePlay();
      } else {
        currentIndex.value = index;
        timerCount = 0;
        timerText.value = "0:00";
        progressStyle.value = { width: "0%", transition: "none" };
        if (!isPlaying.value && !isDetailOpen.value) isPlaying.value = true;
        startTimer();
      }
    };

    const selectedIndex = computed(() => projects.value.findIndex(p => p.index === selectedProject.value?.index));

    const showNextProject = () => {
      const nextIndex = (selectedIndex.value + 1) % projects.value.length;
      openDetail(projects.value[nextIndex]);
      nextSlide();
    };

    const showPrevProject = () => {
      const prevIndex = (selectedIndex.value - 1 + projects.value.length) % projects.value.length;
      openDetail(projects.value[prevIndex]);
      prevSlide();
    };

    const closeDialog = () => {
      isDetailOpen.value = false;
    };

    watch(isDetailOpen, (newValue) => {
      if (!newValue) togglePlay();
    });

    const getCardStyle = (index) => ({
      opacity: index === currentIndex.value ? 1 : 0.5,
      transform: index === currentIndex.value ? "scale(1)" : "scale(0.8)",
      transition: "opacity 0.6s ease, transform 0.6s ease"
    });

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % projects.value.length;
      if (!isPlaying.value) return;
      progressPercentage = 0;
      timerCount = 0;
      timerText.value = "0:00";
      progressStyle.value = { width: "0%", transition: "none" };
      startTimer();
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
      if (!isPlaying.value) return;
      progressPercentage = 0;
      timerCount = 0;
      timerText.value = "0:00";
      progressStyle.value = { width: "0%", transition: "none" };
      startTimer();
    };

    const openDetail = (project) => {
      selectedProject.value = project;
      isDetailOpen.value = true;
    };

    const togglePlay = () => {
      if (isDetailOpen.value && isPlaying.value) {
        clearInterval(intervalId);
        progressStyle.value = { width: `${progressPercentage}%`, transition: "none" };
        isPlaying.value = !isPlaying.value;
        return;
      }
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
      closeDialog,
      showPrevProject,
      showNextProject,
    };
  },
};
</script>

<style scoped>
.projects {
  width: 100%;
  background-color: #F3EBE6;
  border-radius: 10px;
  height: 100%;
  overflow: auto;
  align-content: center;
}

.projects-content {
  padding: 20px;
}

.slider-container {
  text-align: center;
  position: relative;
  max-width: 1050px;
  justify-items: center;
  margin: auto;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  white-space: pre-line;
  color: #8B5E3B;
  @media (max-width: 700px) {
    font-size: 1.25rem;
  }
}

.sub-title {
  font-size: 1.4rem;
  font-weight: 500;
  margin: 1.25rem 0;
  white-space: pre-line;
  color: #4A3C3A;
  @media (max-width: 1200px) {
    font-weight: bold;
  }
  @media (max-width: 700px) {
    font-size: 1rem;
    font-weight: bold;
  }
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
  @media (max-width: 700px) {
    max-width: 350px;
    max-height: 350px;
  }
}

.progress-time {
  color: #4A3C3A;
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
  color: #3E3E3E;
}

.play-button {
  width: 60px;
  display: flex;
  @media (max-width: 700px) {
    width: 50px;
  }
}

.play-button.hovered:hover {
  content: url('/jongnol/play.png');
}

.play-button.hovers:hover {
  content: url('/jongnol/pause.png');
}

.next-button:hover {
  content: url('/jongnol/next.png');
}

.prev-button:hover {
  content: url('/jongnol/prev.png');
}

.next-button-mini:hover {
  content: url('/jongnol/next.png');
}

.prev-button-mini:hover {
  content: url('/jongnol/prev.png');
}

.cancel-button-mini:hover {
  content: url('/jongnol/cancel1.png');
}

.prev-button,
.next-button {
  width: 45px;
  display: flex;
  @media (max-width: 700px) {
    width: 35px;
  }
}

.progress-container {
  display: flex;
  justify-content: center;
}

.progress-bar {
  margin: 2.25rem 0;
  height: 0.825rem;
  background-color: #ddd;
  width: 350px;
  border-radius: 10px;
  @media (max-width: 700px) {
    max-width: 250px;
  }
}

.progress {
  height: 100%;
  background-color: #C48A3A;
  border-radius: 10px;
  transition: width 10s linear;
}

.custom-dialog {
  z-index: 100 !important;
  max-width: 1165px;
  width: 100%;
}

.prev-button-mini,
.next-button-mini,
.cancel-button-mini {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.mini-button {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
}

.mini-button-control {
  display: flex;
  gap: 1rem;
}

</style>
