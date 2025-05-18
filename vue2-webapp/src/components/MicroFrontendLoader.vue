<template>
  <div>
    <button @click="loadRoute('/')">Home</button>
    <button @click="loadRoute('/about')">About</button>
    <div id="micro-frontend-root" style="margin-top:20px;"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.loadRoute('/about')
    })
    },

  data() {
    return {
      currentRoute: null
    }
  },
  methods: {
    async loadRoute(routeName) {
      // Optionally unmount previous route if your mount.js supports it
      // if (window.unmountVue3Route && this.currentRoute) {
      //   window.unmountVue3Route(this.currentRoute, document.getElementById('micro-frontend-root'))
      // }t
      if (window.loadVue3Route) {
        await window.loadVue3Route(routeName)
        this.currentRoute = routeName
      } else {
        alert('Micro-frontend loader not available!');
      }
    }
  }
}
</script>
