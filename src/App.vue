<script setup>
import { ref, watch, onMounted } from 'vue'
import Home from "@/main/Home.vue"

const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

watch(isDark, (val) => {
  localStorage.setItem('theme', val ? 'dark' : 'light')
})
</script>

<template>
  <div id="app" class="min-h-screen bg-white text-black dark:bg-[#121212] dark:text-white transition-all">
    <button
        @click="toggleDark"
        class="fixed top-4 right-4 z-50 px-4 py-2 text-sm rounded shadow-md bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {{ isDark ? '☀️ Light' : '🌙 Dark' }}
    </button>
    <Home />
  </div>
</template>

<style>
header {
  line-height: 1.5;
}
</style>
