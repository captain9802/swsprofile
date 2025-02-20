<template>
  <div class="layout">
    <div class="left">
     <MyIntroduction/>
    </div>
    <div class="tab">
      <p>탭</p>
    </div>
    <div class="project">
      <p>프로젝트 소개</p>
    </div>
  </div>
</template>

<script>
import MyIntroduction from "@/components/mypage/MyIntroduction.vue";

export default {
  name: "MyPage",
  components: {MyIntroduction}
}
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
  width: 878px;
  background-color: #f4f4f4;
  padding: 20px;
}

.tab {
  width: 80px;
  background-color: #ddd;
}

.project {
  flex-grow: 1;
  background-color: #eaeaea;
  padding: 20px;
}
</style>
