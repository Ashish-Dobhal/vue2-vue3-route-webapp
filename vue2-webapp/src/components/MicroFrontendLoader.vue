<template>
  <div class="micro-frontend-loader">
    <!-- Optional loading indicator -->
    <div v-if="isLoading" class="loading">
      Loading Micro Frontend...
    </div>

    <!-- Error display -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Micro Frontend Mount Point -->
    <div 
      :id="mountPointId" 
      ref="microFrontendRoot"
      class="micro-frontend-container"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'MicroFrontendLoader',
  
  props: {
    // Configuration for micro frontend
    config: {
      type: Object,
      required: false,
      validator: (config) => {
        return config.url && config.routeName
      }
    },
    
    // Custom mount point ID
    mountPointId: {
      type: String,
      default: 'micro-frontend-root'
    }
  },
  
  data() {
    return {
      isLoading: true,
      error: null,
      microFrontendApp: null
    }
  },
  
  methods: {
        parseRoute(fullPath) {
      // Remove hash and base route
      const cleanRoute = fullPath
        .replace(/^#/, '')
        .replace(this.baseRoute, '')
        .replace(/^\//, '')

      return cleanRoute || ''
    },
    async loadMicroFrontend() {
      try {
        // Reset previous state
        this.isLoading = true
        this.error = null
        
        const initialRoute = this.parseRoute(window.location.hash);
        // Use global loading function
        if (window.loadMicroFrontend) {
          await window.loadMicroFrontend({
            url: this.config?.url || '',
            routeName:  initialRoute,
            mountPoint: this.mountPointId
          })
        } else {
          throw new Error('Micro Frontend loader not available')
        }
        
        this.isLoading = false
        this.$emit('loaded')
      } catch (error) {
        console.error('Micro Frontend Load Error:', error)
        this.error = error.message
        this.isLoading = false
        this.$emit('error', error)
      }
    },
    
    // Optional: Unmount method
    unmountMicroFrontend() {
      if (this.microFrontendApp && typeof this.microFrontendApp.$destroy === 'function') {
        this.microFrontendApp.$destroy()
        this.microFrontendApp = null
      }
    }
  },
  
  mounted() {
    setTimeout(() => {
    this.loadMicroFrontend()
    }, 1000)
  },
  
  beforeDestroy() {
    this.unmountMicroFrontend()
  }
}
</script>

<style scoped>
.micro-frontend-loader {
  position: relative;
  width: 100%;
  min-height: 200px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
}

.micro-frontend-container {
  width: 100%;
  height: 100%;
}
</style>
