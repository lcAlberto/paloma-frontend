<template>
  <div class="bg-primary-700">
    <h1>Header Auth</h1>
    <slot />
  </div>
</template>
<script setup lang="ts">
onMounted(() => {
  console.log('layout default');
})
</script>


<style scoped>

</style>