<template>
  <div>
    <h1>Posts page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app_btns">
      <my-button @click="showDialog"> Create post </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </my-dialog>
    <PostList
      v-if="!isLoading"
      :posts="searchedAndSortedPosts"
      @remove="removePost" />
    <div v-else>Posts loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page_wrapper">
      <div
        v-for="page in totalPages"
        :key="page"
        class="page"
        :class="{ 'current-page': page === pageNumber }"
				@click="changePage(page)">
        {{ page }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: "",
      searchQuery: "",
      pageNumber: 1,
      pageLimit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "Sort by title" },
        { value: "body", name: "Sort by body" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(page) {
    // 	this.pageNumber = page;
    // 	this.fetchPosts();
    // },
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.pageNumber,
              _limit: this.pageLimit,
            },
          }
        );
        this.totalPages = Math.ceil(
          Number(response.headers["x-total-count"]) / this.pageLimit
        );
        this.posts = response.data;
      } catch (e) {
        alert("error");
      } finally {
        this.isLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.pageNumber += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.pageNumber,
              _limit: this.pageLimit,
            },
          }
        );
        this.totalPages = Math.ceil(
          Number(response.headers["x-total-count"]) / this.pageLimit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("error");
      }
    },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    searchedAndSortedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {},
  async mounted() {
    await this.fetchPosts();
  },
};
</script>

<style>
.app_btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.page_wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid grey;
  padding: 10px;
}
.current-page {
  border: 2px solid black;
}
</style>
