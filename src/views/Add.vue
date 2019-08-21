<template>
  <div class="add">
    <h2>Add new tip</h2>
    <div>
      <textarea rows="5" cols="50">
      </textarea>
    </div>
    <router-link to="/">
      <button>Cancel</button>
    </router-link>
      <button>Save</button>
  </div>
</template>

<style scoped lang="scss">
  textarea {
    margin-bottom: 50px;
    width: 260px;
    height: 118px;
    border: 1px dashed #ccc;
  }
</style>
