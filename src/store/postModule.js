export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    searchedAndSortedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPageNumber(state, pageNumber) {
      state.pageNumber = pageNumber;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.pageNumber,
              _limit: state.pageLimit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(Number(response.headers["x-total-count"]) / state.pageLimit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        alert("error");
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit("setPageNumber", state.pageNumber + 1);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.pageNumber,
              _limit: state.pageLimit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(Number(response.headers["x-total-count"]) / state.pageLimit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        alert("error");
      }
    },
  },
  namespaced: true,
};
