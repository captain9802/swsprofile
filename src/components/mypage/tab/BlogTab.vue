<template>
  <div class="blog-tab dark:bg-neutral-900 dark:text-white">
    <div class="blog-tab-content">
      <div class="blog-tab-header">
        <div class="blog-tab-write">
          <div class="blog-tab-title text-[#D17A22] dark:text-orange-300">개발 Blog</div>
          <button v-if="isLoggedInState" class="write-button" @click="openDialog">작성하기</button>
          <button v-else class="write-button" @click="loginDialogOpen = true">로그인</button>
        </div>
        <div class="blog-search dark:bg-neutral-800 dark:border-neutral-700">
          <span class="search-icon">
            <img :src="isDarkMode ? '/search-dark.png' : '/search.png'" alt="Search Icon" />
          </span>
          <input
              type="text"
              class="search-input dark:bg-neutral-800 dark:text-white"
              placeholder="검색어 입력..."
              v-model="searchQuery"
              @keyup.enter="handleSearch"
          />
          <button class="search-button" @click="handleSearch">검색</button>
        </div>
      </div>
      <div class="tag-selecte">
        <button
            v-for="(tag, index) in availableTags"
            :key="index"
            :class="[selectedTags.includes(tag) ? 'selected' : '', 'dark:bg-neutral-700 dark:text-white dark:border-neutral-600']"
            @click="toggleTag(tag)"
            :disabled="selectedTags.length >= 3 && !selectedTags.includes(tag)"
        >
          #{{ tag }}
        </button>
      </div>
      <div class="blog-list">
        <div class="blog-item dark:bg-neutral-800 dark:text-white" v-for="(blog, index) in blogs" :key="index" @click="selectBlog(blog)" :class="{ appear: isVisible }">
          <img :src="blog.image" alt="이미지 오류" class="blog-image" />
          <div class="blog-info">
            <h2 class="blog-title" v-bind:title="blog.title">{{ blog.title }}</h2>
            <div class="blog-tags">
              <span class="tag" v-for="(tag, idx) in blog.tags" :key="idx">#{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagep-button">
          <img :src="isDarkMode ? '/pagep1-dark.png' : '/pagep.png'" alt="좌 버튼" class="prev-button"/>
        </button>
        <span class="page-number dark:text-neutral-300">{{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagen-button">
          <img :src="isDarkMode ? '/pagen1-dark.png' : '/pagen.png'" alt="우 버튼" class="next-button"/>
        </button>
      </div>
    </div>
    <v-dialog v-model="isDialogVisible" class="blog_create">
      <Dialog :isVisible="isDialogVisible" @close-dialog="closeDialog" />
    </v-dialog>
    <v-dialog v-model="reviewDialogVisible" class="blog_create">
      <BlogReview v-if="selectedBlog" :blog="selectedBlog" @close-dialog="closeReviewDialog" />
    </v-dialog>
    <Login :isOpen="loginDialogOpen" @close="loginDialogOpen = false" @login="handleLogin" />
  </div>
</template>

<script>
import Dialog from './blog/Dialog.vue';
import { VDialog } from 'vuetify/components';
import axios from 'axios';
import BlogReview from "@/components/mypage/tab/blog/BlogReview.vue";
import Login from "@/components/mypage/tab/login/Login.vue";
import {useToast} from "vue-toastification";
import { ref } from 'vue';

export default {
  name: "BlogTab",
  components: {
    Login,
    BlogReview,
    Dialog,
    VDialog
  },

  data() {
    return {
      isLoggedInState: ref(sessionStorage.getItem('sws-access') !== null),
      isOwner: false,
      currentPage: 1,
      itemsPerPage: 12,
      totalPages: 0,
      searchQuery: "",
      availableTags: [
        'HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Laravel',
        'jQuery', 'Java', 'Spring Boot',
        'AWS', 'Nginx', 'Ubuntu', 'MySQL'
      ],
      selectedTags: [],
      blogs: [],
      isDialogVisible: false,
      reviewDialogVisible: false,
      selectedBlog: null,
      loginDialogOpen: false,
      isVisible: false,
    };
  },
  mounted() {
    this.fetchBlogs();
    setTimeout(() => {
      this.isVisible = true;
    }, 200);
  },
  methods: {
    async fetchBlogs() {
      const toast = useToast();
      try {
        const response = await axios.get('http://127.0.0.1:8000/blog', {
          params: {
            page: this.currentPage,
            limit: this.itemsPerPage,
            search: this.searchQuery.trim(),
            tags: this.selectedTags.join(',')
          }
        });
        this.blogs = response.data.blogs.map(blog => ({
          ...blog,
          tags: blog.tags ? this.cleanTags(JSON.parse(blog.tags)) : []
        }));
        this.totalPages = Math.ceil(response.data.totalCount / this.itemsPerPage);
      } catch (error) {
        toast.error("게시글들을 불러오지 못했습니다.");
      }
    },
    cleanTags(tagsArray) {
      return tagsArray
          .map(tag => tag.replace(/[\n#"]/g, "").trim())
          .filter(tag => tag.length > 0);
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.fetchBlogs();
    },
    handleSearch() {
      this.currentPage = 1;
      this.fetchBlogs();
    },
    closeDialog() {
      this.isDialogVisible = false;
      this.fetchBlogs();
    },
    closeReviewDialog() {
      this.reviewDialogVisible = false;
      this.selectedBlog = null;
      this.fetchBlogs();
    },
    selectBlog(blog) {
      this.selectedBlog = blog;
      this.reviewDialogVisible = true;
    },
    openDialog() {
      this.isDialogVisible = true;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchBlogs();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchBlogs();
      }
    },
    async  handleLogin(credentials) {
      const toast = useToast();
      try {
        const response = await axios.post("http://127.0.0.1:8000/blog/login", credentials);
        if (response.data.status === 403) {
          sessionStorage.setItem("sws-access", response.data.token);
          toast.success(response.data.message);
          this.isLoggedInState = true;
          this.loginDialogOpen = false;
        }
      } catch (error) {
        if(error.status === 422) {
          toast.error("이메일 형식이 아닙니다.");
        } else if (error.status === 401 || error.status === 402) {
          toast.error(error.response.data.message);
        }
      }
    },
  }
};
</script>


<style scoped>
.blog-tab {
  background-color: #F3EBE6;
  border-radius: 10px;
  overflow: auto;
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease;
}

.blog-tab-content {
  padding: 20px;
  max-width: 1127px;
  overflow: auto;
}

.blog-tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 715px) {
  .blog-tab-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .blog-tab-title {
    font-size: 1.5rem;
  }

  .blog-search {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .search-input {
    flex: 1;
  }
}

.tag-selecte {
  margin: 1rem 0;
}

.tag-selecte button {
  padding: 5px 10px;
  margin: 5px;
  background-color: #EDE0D4;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.825rem;
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
@media (max-width: 610px) {
  .tag-selecte button {
    font-size: 10px;
  }
}

.blog-tab-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #D17A22;
}
@media (max-width: 610px) {
  .blog-tab-title {
    font-size: 1.5rem;
  }
}

.blog-search {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 44px;
}

.search-icon img {
  width: 20px;
  height: 20px;
}
.search-input {
  border: none;
  outline: none;
  padding: 5px 10px;
  font-size: 1rem;
  width: 300px;
  font-weight: 500;
}
.search-button {
  background-color: #D17A22;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  width: 60px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-button:hover {
  background-color: #b56119;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.blog-item {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.blog-item:hover {
  transform: scale(1.05);
}
.blog-item.appear {
  transform: translateY(0);
  opacity: 1;
}
.blog-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 10px;
}
.blog-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #3E3E3E;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
}
.tag {
  color: #3E3E3E;
  padding: 1px 1px;
  border-radius: 15px;
  font-size: 0.9rem;
}
@media (max-width: 610px) {
  .blog-title {
    font-size: 1rem;
  }
  .tag {
    font-size: 14px;
  }
}
.blog-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}
.write-button {
  background-color: #D17A22;
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-left: auto;
  margin-right: 1rem;
}
.write-button:hover {
  background-color: #b56119;
}
.blog-tab-write {
  display: flex;
  width: 100%;
}

@media (min-width: 1200px) and (max-width: 1350px),
(max-width: 715px) {
  .blog-tab-write {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .write-button {
    font-size: 14px;
    margin: 0;
    padding: 4px 8px;
  }
  .search-button {
    font-size: 0.825rem;
  }
  .blog-tab-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .blog-tab-title {
    font-size: 1.5rem;
  }
  .blog-search {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .search-input {
    flex: 1;
  }
}

.blog_create {
  z-index: 100 !important;
  max-width: 1165px;
  width: 100%;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 1rem;
}
.prev-button,
.next-button {
  width: 20px;
  height: 20px;
}
.page-number {
  color: #4A3C3A;
}
.prev-button:hover {
  content: url('/pagep1.png');
}
.next-button:hover {
  content: url('/pagen1.png');
}
.pagen-button,
.pagep-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.pagep-button:disabled,
.pagen-button:disabled,
.prev-button:disabled {
  cursor: not-allowed;
}

.blog-tab::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.blog-tab::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.blog-tab::-webkit-scrollbar-thumb {
  background: #CEC4CD;
  border-radius: 10px;
  transition: background 0.3s ease;
}
.blog-tab::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (prefers-color-scheme: dark) {
  .blog-tab {
    background-color: #1f1f1f;
  }
  .blog-tab-content {
    color: #f0f0f0;
  }
  .blog-tab-title {
    color: #ffb347;
  }
  .blog-search {
    background: #2c2c2c;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.05);
  }
  .search-input {
    background: transparent;
    color: #fff;
  }
  .search-button {
    background-color: #ff8c00;
  }
  .search-button:hover {
    background-color: #cc7000;
  }
  .tag-selecte button {
    background-color: #3a3a3a;
    color: #fff;
    border: 1px solid #666;
  }
  .tag-selecte button:hover {
    background-color: #555;
  }
  .tag-selecte button.selected {
    background-color: #ff8c00;
    color: white;
  }
  .tag-selecte button:disabled {
    background-color: #555;
    color: #999;
  }
  .blog-item {
    background-color: #2b2b2b;
    color: #f0f0f0;
    box-shadow: 0 2px 6px rgba(255, 255, 255, 0.05);
  }
  .blog-title {
    color: #f9f9f9;
  }
  .tag {
    color: #ccc;
  }
  .write-button {
    background-color: #ff8c00;
  }
  .write-button:hover {
    background-color: #cc7000;
  }
  .page-number {
    color: #ccc;
  }
  .pagen-button,
  .pagep-button {
    background-color: #3a3a3a;
  }
  .blog-tab::-webkit-scrollbar-track {
    background: #2a2a2a;
  }
  .blog-tab::-webkit-scrollbar-thumb {
    background: #888;
  }
  .blog-tab::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
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

.dark .blog-title {
  color: #ffffff;
}

.dark .tag {
  color: #ffffff;
}
</style>
