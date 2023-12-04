<script setup lang="ts">
import { onMounted } from 'vue'
import { createDrag} from '../../dist/index.js'


let drag:any = null
const handleClick = ()=> {
    drag.add()
  }

onMounted(() => {
  drag = createDrag({$el: '#container'})
})

</script>

<template>
  <div id="wrap">
    <div class="operate">
      <el-button  @click="handleClick">add</el-button>
    </div>
    <div id="container"></div>
  </div>
</template>

<style scoped lang="scss">
#wrap {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 1fr;
}

.operate {
  border-bottom: 1px solid #f1f1f1;
}
#container {
 
}
</style>
