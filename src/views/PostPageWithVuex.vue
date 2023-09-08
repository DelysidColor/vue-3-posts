<template>
  <div>
    <h1>Posts page with store</h1>
    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Search..." />
    <div class="app_btns">
      <my-button @click="showDialog"> Create post </my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions" />
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
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MySelect from "@/components/UI/MySelect.vue";

export default {
  components: {
    MyButton,
    MyInput,
    MySelect,
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPageNumber: "post/setPageNumber",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
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
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isLoading: (state) => state.post.isLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      pageNumber: (state) => state.post.pageNumber,
      pageLimit: (state) => state.post.pageLimit,
      totalPages: (state) => state.post.posttotalPagess,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      searchedAndSortedPosts: "post/searchedAndSortedPosts",
    }),
  },
  mounted() {
    this.fetchPosts();
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
