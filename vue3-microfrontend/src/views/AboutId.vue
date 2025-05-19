<template>
  <div class="about-id">
    <h1>About Id View</h1>
  <span>ID: {{ $route.params.id }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent  } from 'vue';

export default defineComponent({
  name: 'AboutId',
  props: {
    // Define your props here
  },
})
</script>

<style scoped>
/* Your styles here */
</style>

