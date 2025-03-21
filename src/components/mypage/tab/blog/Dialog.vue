<template>
  <v-card class="v-card">
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
          <textarea id="content" v-model="newBlog.content" placeholder="내용을 입력하세요" required></textarea>
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
import { VCard, VCardTitle, VCardSubtitle, VImg } from 'vuetify/components';

export default {
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
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VImg,
  },
  data() {
    return {
      newBlog: {
        title: this.blog ? this.blog.title : '',
        content: this.blog ? this.blog.content : '',
        tags: this.blog ? this.blog.tags : [],
        image: this.blog ? this.blog.image : null
      },
      availableTags: [
        'HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Node', 'Laravel',
        'jQuery', 'Thymeleaf', 'Zustand', 'Redux', 'Framer-Motion',
        'Styled Component', 'React Chart', 'Java', 'Spring Boot', 'Gradle',
        'AWS', 'Naver Cloud', 'Nginx', 'Ubuntu', 'MySQL', '일본어', '정보처리기사', '코딩테스트'
      ],
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newBlog.image = file;
      }
    },
    toggleTag(tag) {
      if (this.newBlog.tags.includes(tag)) {
        this.newBlog.tags = this.newBlog.tags.filter(t => t !== tag);
      } else if (this.newBlog.tags.length < 3) {
        this.newBlog.tags.push(tag);
      }
    },
    submitBlog() {
      const blogData = {
        title: this.newBlog.title,
        content: this.newBlog.content,
        tags: this.newBlog.tags,
        image: this.newBlog.image
      };

      if (this.blog) {
        axios.put(`http://127.0.0.1:8000/blog/update/${this.blog.id}`, blogData)
            .then(response => {
              console.log('블로그 글 수정 성공:', response.data);
              this.$emit('close-dialog');
            })
            .catch(error => {
              console.error('블로그 글 수정 실패:', error);
            });
      } else {
        axios.post('http://127.0.0.1:8000/blog/add', blogData)
            .then(response => {
              console.log('블로그 글 작성 성공:', response.data);
              this.$emit('close-dialog');
            })
            .catch(error => {
              console.error('블로그 글 작성 실패:', error);
            });
      }
    },
    closeDialog() {
      this.$emit('close-dialog');
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

.dialog-form {
  display: grid;
  gap: 1rem;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3E3E3E;
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

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #3E3E3E;
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
  font-size: 1rem;
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
}

.tag-selecte button:hover {
  background-color: #A28974;
}

.tag-selecte button.selected {
  background-color: #8B5E3B;
  color: white;
}

.tag-selecte button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
