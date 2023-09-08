import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/Main.vue";
import PostsPage from "@/views/PostsPage.vue";
import About from "@/views/About.vue";
import CurrentPage from "@/views/CurrentPage.vue";
import PostPageWithVuex from "@/views/PostPageWithVuex";
import PostsPageCompositionApi from "@/views/PostsPageCompositionApi";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostsPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: CurrentPage,
  },
  {
    path: "/store",
    component: PostPageWithVuex,
  },
  {
    path: "/api",
    component: PostsPageCompositionApi,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
