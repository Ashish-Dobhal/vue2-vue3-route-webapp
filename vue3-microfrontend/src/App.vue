<template>
  <div class="micro-app">
    <header v-if="showHeader">
      <h3>{{ title }}</h3>
    </header>

    <main>
      <!-- <span> {{ router.currentRoute }}</span> 
      <span> {{  counterStore.count || 'Wont Work' }} </span>
      <div class="routes-list">
        <h4>Available Routes:</h4>
        <ul>
          <li v-for="route in routes" :key="route.path">
            <span :class="{ 'active-route': isRouteActive(route) }">
              {{ route.path }} - {{ route.name || 'unnamed' }}
            </span>
          </li>
        </ul>
      </div> -->
      <nav>
        <router-link
          to="/parentB"
          :class="{ 'active-route': router.currentRoute.value.path == ('/parentB') }"
        >Home</router-link> |
        <router-link
          to="/parentB/about"
          :class="{ 'active-route': router.currentRoute.value.path == ('/parentB/about') }"
        >About Us</router-link>
      </nav>
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
import { useCounterStore } from '../stores/counter';
export default defineComponent({
  name: 'MicroApp',
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Book of Business Container'
    }
  },
  setup() {
    const router = useRouter();
    const routes = ref<RouteRecordNormalized[]>([]);
    const counterStore = useCounterStore();
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
      isRouteActive,
      counterStore
    };
  }
});
</script>

<style scoped>
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
  color: green !important;
  font-weight: bold !important;
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
