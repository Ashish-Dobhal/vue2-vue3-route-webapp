<template>
  <div>
    <h1>About Page</h1>
    <button @click="goHome">Go Home (via parent)</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const onParentNavigate = inject('onParentNavigate')

function goHome() {
  if (onParentNavigate) onParentNavigate('/')
}
</script>
