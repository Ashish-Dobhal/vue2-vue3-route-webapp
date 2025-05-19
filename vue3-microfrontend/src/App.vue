<template>
  <div class="micro-app">
    <header v-if="showHeader">
      <h1>{{ title }}</h1>
      <nav>
        <router-link to="/parentB/home">Home</router-link> |
        <router-link to="/parentB/about">About Us</router-link>
      </nav>
    </header>

    <main>
      <!-- <div>Current Route: {{ router.currentRoute.value.path }}</div>
      <div class="routes-list">
        <h2>All Routes:</h2>
        <ul>
          <li v-for="route in routes" :key="route.path">
            {{ route.path }} - {{ route.components || 'unnamed' }}
            <span v-if="isRouteActive(route)" class="active-route">(active)</span>
          </li>
        </ul>
      </div> -->
      <div class="router-view-container">
        <router-view>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { RouteRecordNormalized, useRouter } from 'vue-router';

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
    const routes = ref<RouteRecordNormalized[]>([]);

    onMounted(() => {
      routes.value = router.getRoutes();
      console.log('Current route:', router.currentRoute.value);
      console.log('Available routes:', routes.value);
    });

    const isRouteActive = (route: RouteRecordNormalized) => {
      return router.currentRoute.value.path.startsWith(route.path);
    };

    return {
      router,
      routes,
      isRouteActive
    };
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

.active-route {
  color: green;
  font-weight: bold;
  margin-left: 5px;
}

.routes-list {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.routes-list ul {
  list-style-type: none;
  padding-left: 10px;
}

.routes-list li {
  margin: 5px 0;
}

.router-view-container {
  border: 1px solid #eaeaea;
  padding: 15px;
  margin-top: 20px;
  min-height: 200px;
}
</style>
