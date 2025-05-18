<template>
  <div>
    <h1>Home Page</h1>
    <button @click="goToAbout">Go to About (via parent)</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const onParentNavigate = inject('onParentNavigate') 

function goToAbout() {
  if (onParentNavigate) onParentNavigate('/about')
}
</script>
