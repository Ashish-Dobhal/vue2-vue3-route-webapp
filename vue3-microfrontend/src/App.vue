<template>
  <div class="micro-app">
    <header v-if="showHeader">
      <h1>{{ title }}</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About Us</router-link> |
        <router-link to="/test">Test</router-link>
      </nav>
    </header>

    <main>
      <div> {{ 'Hello' }}</div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MicroApp',
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Micro Frontend'
    }

  },
  setup() {
    const router = useRouter();
    return { router };
  }
});
</script>

<style>
.micro-app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

nav {
  padding: 10px 0;
}

nav a {
  margin: 0 10px;
}
</style>
