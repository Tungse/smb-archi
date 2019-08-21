<template>
  <div class="home">
    <h2>Get a tip for free</h2>
    <Tipp :text="tipp"></Tipp>
    <button>Next</button>
    <router-link to="/add">
      <button>Create</button>
    </router-link>
  </div>
</template>

<script>
import Tipp from '@/components/Tipp'

export default {
  name: 'home',
  mounted() {
    fetch('http://localhost:3000/home')
      .then(function(response) {
        return response.json()
      })
      .then((myJson) => {
        this.tipp = myJson.tipp.title
      });
  },
  data() {
    return {
      tipp: 'loading ...'
    }
  },
  components: {
    Tipp
  }
}
</script>
