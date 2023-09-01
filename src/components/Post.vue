<template>
  <div class="post">
    <div>
			<div>{{ post.id }}</div>
      <div>Title: {{ post.title }}</div>
      <div>Body: {{ post.body }}</div>
    </div>
    <div class="post_btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
      <my-button @click="$emit('remove', post)">Delete</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    emits: ["remove"],
  },
  methods: {
    deletePost() {
      this.post;
    },
  },
};
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid teal;
  margin-top: 10px;
  padding: 5px;
}
.post_btns {
	display: flex;
}
</style>
