<template>
  <div>
  <v-card class="v-card">
    <div class="dialog-container">
      <v-card-title class="v-card-title">
        <!-- 블로그 이미지 표시 -->
        <v-img :src="blog.image" max-width="40" class="v-img"></v-img>
        <span class="headline">{{ blog.title }}</span>
      </v-card-title>

      <div class="blog-content">
        <div class="content-group">
          <label>대표 이미지</label>
          <v-img :src="blog.image" max-width="100" class="v-img"></v-img>
        </div>

        <div class="content-group">
          <label>내용</label>
          <p class="blog-contents">{{ blog.content }}</p>
        </div>

        <div class="content-group">
          <label>태그</label>
          <div class="tags">
            <span v-for="(tag, index) in blog.tags" :key="index" class="tag">#{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="button-group">
        <button @click="deleteBlogs" class="delete-btn">삭제</button>
        <button @click="editBlog" class="put-btn">수정</button>
        <button @click="closeReviewDialog" class="cancel-btn">닫기</button>
      </div>
    </div>
  </v-card>
    <v-dialog v-model="putDialogVisible" class="blog_create">
      <Dialog :isVisible="putDialogVisible" @close-dialog="closeputDialog" :blog="blog" />
    </v-dialog>
  </div>
</template>

<script>
import Dialog from "@/components/mypage/tab/blog/Dialog.vue";
import { VCard, VCardTitle, VImg, VDialog } from 'vuetify/components';
import axios from "axios";

export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  components: {
    Dialog,
    VCard,
    VCardTitle,
    VImg,
    VDialog
  },
  data() {
    return {
      putDialogVisible: false,
    };
  },
  methods: {
    async deleteBlogs() {
      if (!confirm("정말 삭제하시겠습니까?")) return;
      try {
        await axios.delete(`http://127.0.0.1:8000/blog/${this.blog.id}`);
        this.$emit('close-dialog');
      } catch (error) {
        console.error('게시글을 삭제하는데 실패했습니다:', error);
      }
    },
    editBlog() {
      this.putDialogVisible = true;
    },
    closeReviewDialog() {
      this.$emit('close-dialog');
    },
    closeputDialog() {
      this.putDialogVisible = false;
    }
  }
};
</script>



<style scoped>
.v-card {
  margin: 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.v-card-title {
  padding: 0;
}

.v-img {
  margin-right: 1rem;
}

.dialog-container {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3E3E3E;
}

.blog-content {
  display: grid;
  gap: 1rem;
}

.blog-contents {
  min-height: 300px;
  overflow: auto;
  max-height: 500px;
}

.content-group {
  display: flex;
  flex-direction: column;
}

.content-group label {
  font-weight: bold;
  color: #3E3E3E;
}

.content-group p {
  font-size: 1rem;
  color: #555;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #EDE0D4;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.825rem;
  color: #3E3E3E;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.put-btn {
  padding: 0.5rem 0.8rem;
  border: 1px solid green;
  border-radius: 10px;
  color: green;
  cursor: pointer;
}
.delete-btn {
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  border: 1px solid red;
  color: red;
  cursor: pointer;
}
.cancel-btn {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 10px;
  background-color: #ccc;
  color: #333;
  cursor: pointer;
}


.cancel-btn:hover {
  background-color: #aaa;
}

.blog_create {
  z-index: 100 !important;
  max-width: 1165px;
  width: 100%;
}
</style>
