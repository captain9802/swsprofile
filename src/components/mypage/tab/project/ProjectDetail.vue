<template>
  <v-card class="v-card">
    <v-card-title class="v-card-title">{{ project.name }}</v-card-title>
    <v-card-subtitle class="v-card-subtitle">{{ formattedDescription }}</v-card-subtitle>
  </v-card>
</template>

<script>
import { VCard, VCardTitle, VCardSubtitle } from "vuetify/components";

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
  },
  computed: {
    formattedDescription() {
      switch (this.project.index) {
        case 0:
          return `🚀 메롱`;
        case 1:
          return `🔥 ${this.project.index}`;
        case 2:
          return `🎯 ${this.project.index}`;
        case 3:
          return `‘secondStory’ 는 자신의 중고 물품들을 경매를 통해 사람들에게 거래 할 수 있게 도와주는 다양한 기능을 제공하는 웹 서비스입니다.
          소비자는 다양한 종류의 제고의 물품이 등록될 수 있어 여러 카테고리를 통해 원하는 제품을 찾을 수 있고, 여러 판매자가 참여함으로써 동일한 제품도 다양한 가격대와 상태로 제공 될 수 있습니다.`;
        default:
          return this.project.index;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.v-card {
  padding: 20px;
  margin: 20px;
  white-space: pre-line;
}

.v-card-title {
  font-size: 1.5em;
  font-weight: bold;
  text-align: left;
  padding: 0;
  white-space: pre-line;
}

.v-card-subtitle {
  color: #777;
  text-align: left;
  padding: 0;
  white-space: pre-line;
}
</style>
