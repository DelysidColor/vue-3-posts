<template>
  <div>
		<h1>{{ $store.state.post.pageLimit }}</h1>
    <!-- <h1>Posts page</h1>
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
    <div v-intersection="loadMorePosts" class="observer"></div> -->
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
    
  },
  computed: {

  },
  watch: {},
  async mounted() {
    // await this.fetchPosts();
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
