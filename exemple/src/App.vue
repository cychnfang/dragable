<script setup lang="ts">
import { onMounted } from 'vue'
import { createDrag } from '../../dist/index.js'


onMounted(() => {
  const drag = createDrag({$el: '#container'})
})

</script>

<template>
  <div id="container">
    exemple
  </div>
</template>

<style scoped lang="scss">
#container {
  width: 100vw;
  height: 100vh;
}
</style>
