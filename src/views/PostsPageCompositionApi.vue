<template>
  <div>
    <h1>Posts page composition API</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app_btns">
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible"> /> </my-dialog>
    <PostList v-if="!isLoading" :posts="searchedAndSortedPosts" />
    <div v-else>Posts loading...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSearchedAndSortedPosts from "@/hooks/useSearchedAndSortedPosts";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "Sort by title" },
        { value: "body", name: "Sort by body" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isLoading } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, searchedAndSortedPosts } =
      useSearchedAndSortedPosts(sortedPosts);

    return {
      usePosts,
      useSortedPosts,
      useSearchedAndSortedPosts,
      posts,
      totalPages,
      isLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      searchedAndSortedPosts,
    };
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
