<template>
  <div class="tipp">
    <em>{{ text }}</em>
  </div>
</template>

<script>
export default {
  name: 'Tipp',
  props: {
    text: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tipp {
    margin-bottom: 50px;

    em {
      display: inline-block;
      padding: 50px;
      border: 1px dashed #ccc;
    }
  }
</style>
