<template>
  <div v-if="posts.length > 0">
    <h3>Posts list</h3>

    <transition-group name="post-list">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)" />
    </transition-group>
  </div>
  <h3 style="color: red" v-else>Post list is empty</h3>
</template>

<script>
import Post from "@/components/Post.vue";
export default {
  components: { Post },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.8s ease;
}
</style>
