<template>
  <div>
  <v-card class="v-card">
    <div class="dialog-container">
      <v-card-title class="v-card-title">
        <span class="headline">{{ blog.title }}</span>
      </v-card-title>

      <div class="blog-content">
        <div class="content-group">
          <p class="blog-contents" v-html="sanitizedContent"></p>
        </div>

        <div class="content-group">
          <div class="tags">
            <span v-for="(tag, index) in blog.tags" :key="index" class="tag">#{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="button-group">
        <button v-if="isLoggedIn" @click="deleteBlogs" class="delete-btn">삭제</button>
        <button v-if="isLoggedIn" @click="editBlog" class="put-btn">수정</button>
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
import DOMPurify from 'dompurify';

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
  mounted() {
    this.realToken = sessionStorage.getItem('sws-access');
    this.$nextTick(() => {
      const images = this.$el.querySelectorAll('.blog-contents img');
      images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.hegiht = 'auto';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '0 auto';
      });
    });
  },
  computed: {
    sanitizedContent() {
      return DOMPurify.sanitize(this.blog.content, {ALLOWED_TAGS: ['img', 'p', 'b', 'i', 'strong', 'em']});
    },
    isLoggedIn() {
        return sessionStorage.getItem('sws-access') !== null;
    }
  },
  methods: {
    async deleteBlogs() {
      if (!this.realToken) {
        alert("로그인 후 시도해주세요.");
        return;
      }
      if (!confirm("정말 삭제하시겠습니까?")) return;
      try {
        await axios.delete(`http://127.0.0.1:8000/blog/${this.blog.id}`, {
          headers: { 'Authorization': `Bearer ${this.realToken}` }
        });
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

.dialog-container {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  flex-grow: 1;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3E3E3E;
  font-family: 'Noto Sans', sans-serif;
  @media (max-width: 700px) {
    font-size: 1.25rem;
  }
}

.blog-content {
  display: grid;
  gap: 1rem;
  flex-grow: 1;
}

.blog-contents {
  min-height: 300px;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
  font-family: 'Noto Sans', sans-serif;
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
  @media (max-width: 700px) {
    font-size: 14px;
  }
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
  font-family: 'Noto Sans', sans-serif;
  @media (max-width: 700px) {
    font-size: 10px;
  }
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
  font-family: 'Noto Sans', sans-serif;
  @media (max-width: 700px) {
    font-size: 14px;
    padding: 0.6rem 0.8rem;
  }
}
.delete-btn {
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  border: 1px solid red;
  color: red;
  cursor: pointer;
  font-family: 'Noto Sans', sans-serif;
  @media (max-width: 700px) {
    font-size: 14px;
    padding: 0.6rem 0.8rem;
  }
}
.cancel-btn {
  font-family: 'Noto Sans', sans-serif;
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 10px;
  background-color: #ccc;
  color: #333;
  cursor: pointer;
  @media (max-width: 700px) {
    font-size: 14px;
    padding: 0.6rem 0.8rem;
  }
}


.cancel-btn:hover {
  background-color: #aaa;
}

.blog_create {
  z-index: 100 !important;
  max-width: 1165px;
  width: 100%;
}


.blog-contents::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.blog-contents::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.blog-contents::-webkit-scrollbar-thumb {
  background: #CEC4CD;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.blog-contents::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
