<template>
  <div>
        <h1> {{ 'ParentBComponent' }}</h1>
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ParentBComponent',
  data() {
    return {
      // Component data goes here
    };
  },
  props: {
    // Component props go here
  },
  computed: {
    // Computed properties go here
  },
  methods: {
    // Component methods go here
  },
  mounted() {
    // Code to run when component is mounted
  }
}
</script>

<style scoped>
/* Component styles go here */
</style>
