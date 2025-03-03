<template>
  <v-card>
    <v-card-title>{{ project.name }}</v-card-title>
    <v-card-subtitle>{{ project.description }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      project: {
        name: "테스트 제목",  // 제목을 '테스트 제목'으로 설정
        description: "테스트입니다",  // 설명을 '테스트입니다'로 설정
      },
    };
  },
};
</script>

<style scoped lang="scss">
.v-card {
  margin: 20px;
  padding: 20px;
  max-width: 400px;
}

.v-card-title {
  font-size: 1.5em;
  font-weight: bold;
}

.v-card-subtitle {
  color: #777;
}

.v-img {
  width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>
