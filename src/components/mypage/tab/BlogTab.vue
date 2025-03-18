<template>
  <div class="blog-tab">
    <div class="blog-tab-content">
      <div class="blog-tab-header">
        <div class="blog-tab-write">
        <div class="blog-tab-title">개발 Blog</div>
        <button class="write-button" @click="openDialog">작성하기</button>
        </div>
        <div class="blog-search">
          <span class="search-icon">
            <img src="/search.png" alt="Search Icon" />
          </span>
          <input
              type="text"
              class="search-input"
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
            :class="{'selected': selectedTags.includes(tag)}"
            @click="toggleTag(tag)"
            :disabled="selectedTags.length >= 3 && !selectedTags.includes(tag)">
          #{{ tag }}
        </button>
      </div>
      <!-- 블로그 목록 -->
      <div class="blog-list">
        <div class="blog-item" v-for="(blog, index) in filteredBlogs" :key="index">
          <img :src="blog.image" alt="이미지 오류" class="blog-image" />
          <div class="blog-info">
            <h2 class="blog-title" v-bind:title="blog.title">{{ blog.title }}</h2>
            <div class="blog-tags">
              <span class="tag" v-for="(tag, idx) in blog.tags" :key="idx">#{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="isDialogVisible" class="blog_create">
      <Dialog :isVisible="isDialogVisible" @close-dialog="closeDialog" />
    </v-dialog>
  </div>
</template>

<script>
import Dialog from './blog/Dialog.vue';
import { VDialog } from 'vuetify/components';
import ProjectDetail from "@/components/mypage/tab/project/ProjectDetail.vue";

export default {
  name: "BlogTab",
  components: {
    ProjectDetail,
    Dialog,VDialog
  },
  data() {
    return {
      searchQuery: "",
      availableTags: ['HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Node', 'Laravel'],
      selectedTags: [],
      blogPosts: [
        {
          image: "/bitcamp.png",
          title: "테스트 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
          tags: ["React", "JavaScript", "Web Development"]
        },
        {
          image: "/example2.jpg",
          title: "테스트 2",
          tags: ["PHP", "Laravel", "Backend"]
        },
        {
          image: "/example3.jpg",
          title: "테스트 3",
          tags: ["SpringBoot", "Java", "API"]
        },
        {
          image: "/example4.jpg",
          title: "테스트 4",
          tags: ["정보처리기사", "IT", "자격증"]
        },
        {
          image: "/example5.jpg",
          title: "테스트 5",
          tags: ["Vue", "Frontend", "UI/UX"]
        }
      ],
      isDialogVisible: false,
    };
  },
  computed: {
    filteredBlogs() {
      if (this.selectedTags.length === 0) {
        return this.blogPosts;
      }

      return this.blogPosts.filter(blog => {
        return this.selectedTags.some(tag => blog.tags.includes(tag));
      });
    }
  },
  methods: {
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        console.log("검색 실행:", this.searchQuery);
      } else {
        console.log("검색어를 입력하세요.");
      }
    },
    closeDialog() {
      this.isDialogVisible = false;
    },
    openDialog() {
      this.isDialogVisible = true;
    }
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
}

.blog-tab-content {
  padding: 20px;
  max-width: 1127px;
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
  &:hover {
    background-color: #A28974;
  }
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
}

.search-icon {
  display: flex;
  align-items: center;
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
  height: 44px;
}

.search-button {
  background-color: #D17A22;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  width: 50px;
  height: 34px;
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

.blog-tab-write {
  display: flex;
  width: 100%;
}

@media (min-width: 1200px) and (max-width: 1350px) {
  .blog-tab-write {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .write-button {
    margin: 0;
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

@media (max-width: 715px) {
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
}

.write-button:hover {
  background-color: #b56119;
}

.blog_create {
  z-index: 100 !important;
  max-width: 1165px;
  width: 100%;
}

</style>
