<template>
  <div>
    <form @submit.prevent>
      <h3>Create post</h3>
      <my-input v-focus v-model="post.title" type="text" placeholder="Title" />
      <my-input v-model="post.body" type="text" placeholder="body" />
      <my-button
        class="createpost-btn"
        style="align-self: flex-end; margin-top: 10px"
        @click="createPost"
        >Add post</my-button
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
