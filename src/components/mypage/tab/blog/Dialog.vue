<template>
  <v-card class="v-card dark:bg-[#1e1e1e] dark:text-white">
    <div class="dialog-container">
      <v-card-title class="v-card-title">
        <v-img src="path_to_your_image.jpg" max-width="40" class="v-img"></v-img>
        <span class="headline">{{ blog ? '블로그 수정' : '글 작성' }}</span>
      </v-card-title>

      <form @submit.prevent="submitBlog" class="dialog-form">
        <div class="input-group">
          <label for="title">제목</label>
          <input type="text" id="title" v-model="newBlog.title" placeholder="제목을 입력하세요" required />
        </div>

        <div class="input-group">
          <label for="image">대표 이미지</label>
          <input type="file" id="image" @change="handleImageUpload" />
        </div>

        <div class="input-group">
          <label for="content">내용</label>
          <div ref="editor"></div>
        </div>

        <div class="tag-selecte">
          <button
              v-for="(tag, index) in availableTags"
              :key="index"
              :class="{'selected': newBlog.tags.includes(tag)}"
              @click.prevent="toggleTag(tag)"
              :disabled="newBlog.tags.length >= 3 && !newBlog.tags.includes(tag)">
            #{{ tag }}
          </button>
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn">{{ blog ? '수정' : '제출' }}</button>
          <button type="button" @click="closeDialog" class="cancel-btn">취소</button>
        </div>
      </form>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { VCard, VCardTitle, VCardSubtitle, VImg } from 'vuetify/components';
import DOMPurify from 'dompurify';
import {useToast} from "vue-toastification";

export default {
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VImg,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    blog: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newBlog: {
        title: this.blog ? this.blog.title : '',
        content: this.blog ? this.blog.content : '',
        tags: this.blog ? this.blog.tags : [],
        image: null,
      },
      availableTags: [
        'HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Laravel',
        'jQuery', 'Java', 'Spring Boot',
        'AWS', 'Nginx', 'Ubuntu', 'MySQL', '일본어', '코딩테스트'
      ],
      quillInstance: null
    };
  },
  mounted() {
    this.realToken = sessionStorage.getItem('sws-access');
    this.quillInstance = new Quill(this.$refs.editor, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['code', 'code-block']
        ]
      }
    });
    this.$nextTick(() => {
      const toolbar = document.querySelector('.ql-toolbar.ql-snow');
      if (toolbar) {
        toolbar.style.position = 'sticky';
        toolbar.style.top = '0';
        toolbar.style.zIndex = '1000';
        toolbar.style.backgroundColor = 'white';
        toolbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
      }
    });

    if (this.newBlog.content) {
      this.quillInstance.root.innerHTML = this.newBlog.content;
    }
  },
  methods: {
    handleImageUpload(event) {
      this.newBlog.image = event.target.files[0];
    },
    toggleTag(tag) {
      if (this.newBlog.tags.includes(tag)) {
        this.newBlog.tags = this.newBlog.tags.filter(t => t !== tag);
      } else if (this.newBlog.tags.length < 3) {
        this.newBlog.tags.push(tag);
      }
    },
    async submitBlog() {
      const toast = useToast();
      const sanitizedContent = DOMPurify.sanitize(this.quillInstance.root.innerHTML);
      const formData = new FormData();
      formData.append('title', this.newBlog.title);
      formData.append('content', sanitizedContent);
      formData.append('tags', JSON.stringify(this.newBlog.tags));

      if (this.newBlog.image) {
        formData.append('image', this.newBlog.image);
      }
      if (!this.realToken) {
        toast.error("토큰이 존재하지 않습니다.");
        return;
      }
      try {
        if (this.blog && this.realToken) {
          formData.append('_method', 'PUT');
          const response = await axios.post(`http://127.0.0.1:8000/blog/update/${this.blog.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data','Authorization': `Bearer ${this.realToken}` }
          });
          toast.success(response.data.message);
          this.$emit('close-dialog');
        } else {
          const response = await axios.post('http://127.0.0.1:8000/blog/add', formData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${this.realToken}` }
          });
          toast.success(response.data.message);
        }
        this.$emit('close-dialog');
      } catch (error) {
        if(error.status === 500) {
          toast.error(error.response.data.message);
        } else if (error.status === 401) {
          toast.error("정상적인 접근이 아닙니다.") ;
        } else {
          toast.error(error.response.data.message);
        }
      }
    },
    closeDialog() {
      this.$emit('close-dialog', 1);
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
.dark .v-card {
  background-color: #1e1e1e;
  color: white;
}

.v-card-title {
  padding: 0;
}

.v-img {
  margin-right: 1rem;
}

.dialog-form {
  display: grid;
  gap: 1rem;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3E3E3E;
}
.dark .headline {
  color: #ffffff;
}

.dialog-container {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: bold;
  color: #3E3E3E;
}
.dark .input-group label {
  color: #ffffff;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #3E3E3E;
  background-color: #fff;
}
.dark .input-group input,
.dark .input-group textarea {
  background-color: #2a2a2a;
  border: 1px solid #555;
  color: #ffffff;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: #D17A22;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn {
  background-color: #D17A22;
  color: white;
}

.submit-btn:hover {
  background-color: #b56119;
}

.cancel-btn {
  background-color: #ccc;
  color: #333;
}

.cancel-btn:hover {
  background-color: #aaa;
}

.tag-selecte {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-selecte button {
  padding: 5px 10px;
  background-color: #EDE0D4;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.825rem;
  transition: background-color 0.3s;
  color: #3E3E3E;
}
.dark .tag-selecte button {
  background-color: #2f2f2f;
  color: #e0e0e0;
  border: 1px solid #444;
}

.dark .tag-selecte button:hover {
  background-color: #3c3c3c;
}

.dark .tag-selecte button.selected {
  background-color: #555;
  color: #fff;
}

.dark .tag-selecte button:disabled {
  background-color: #3a3a3a;
  color: #999;
  cursor: not-allowed;
}

.tag-selecte button.selected {
  background-color: #8B5E3B;
  color: white;
}

.tag-selecte button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
.dark .tag-selecte button:disabled {
  background-color: #555;
}

.v-card::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.v-card::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.v-card::-webkit-scrollbar-thumb {
  background: #CEC4CD;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.v-card::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
