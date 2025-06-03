<template lang="html">
  <div class="cp-esm-module-root">
    <div v-if="isLoading" width="128px" height="128px"> Loading ... </div>
    <div class="cp-esm-module-error text-center" v-if="error"> {{ error }}</div>
    <div :id="mountPoint" class="cp-esm-module-container"  ref="esmModuleRoot"></div>
  </div>  
</template>

<script>
/**
  * ESModuleBridge Component
  *
  * This component serves as a bridge between the main Client Portal application and ESM (ECMAScript Module)
  * based webapps. It dynamically loads and mounts external JavaScript modules into the
  * specified container.
  * The ESM module being loaded is expected to export a mountModule method that accepts:
  * - A DOM element to mount into
  * - A configuration object containing route information
*/

import { loadEsmModule } from '../utils/ESMLoader';

export default {
  name: 'ESModuleBridge',
  mounted() {
    setTimeout(() => {
    this.loadMicroFrontend()
    }, 1000);
  },

  props: {
    // Custom mount point ID
    mountPoint: {
      type: String,
      default: 'esmModuleMountPoint'
    },

    // Base route for the micro frontend
    baseRoute: {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      isLoading: true,
      error: null,
      esmModule: null
    }
  },

  computed: {
    moduleName() {
      return this.$route.meta?.moduleName;
    }
  },
  
  methods: {
    async loadMicroFrontend() {
      try {
        this.isLoading = true
        this.error = null;
      this.esmModule = await loadEsmModule({ moduleName: this.moduleName || "fa.book.of.businesss" });
        if(this.esmModule == null) {
          throw Error(`${this.moduleName} esm import  | failed to fetch module`);
        }
        if(this.esmModule?.mountModule == null) {
          throw Error(`${this.moduleName} esm import  | missing mountModule API`);
        }
        this.esmModule.mountModule(document.getElementById(this.mountPoint), { routeName: this.$route.path });
        this.isLoading = false;
      } catch (error) {
        console.error(`${this.$route.meta.esmModule} mount error: `, error);
        this.error = error?.message;
        this.isLoading = false;
      }
    }
},
  beforeDestroy() {
    /** TODO | add the esm module unmount logic if required */
  }

}

</script>

/** cleanup styles once esm module mount functionality is tested */
<style scoped>
.cp-esm-module-container {
  position: relative;
  width: 100%;
  min-height: 200px;
}

.text-center {
  text-align: center;
}
</style>
