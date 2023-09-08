import axios from "axios";
import { onMounted, ref } from "vue";

export default function usePosts(pageLimit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: pageLimit,
          },
        }
      );
      totalPages.value = Math.ceil(
        Number(response.headers["x-total-count"]) / pageLimit
      );
      posts.value = response.data;
    } catch (e) {
      alert("error");
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetching);

  return {
    posts,
    isLoading,
    totalPages,
  };
}
