<template>
  <div class="bg-purple-700 h-screen">
    <slot />
  </div>
</template>
<script setup lang="ts">
onMounted(() => {
  console.log('layout gest')
})

</script>


<style scoped>

</style>