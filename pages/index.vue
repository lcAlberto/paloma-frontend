<template>
  <div>
    <font-awesome-icon :icon="['fas', 'user']" />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'guest'
})

onMounted(() => {
  console.log('index page');
})
</script>


<style scoped>

</style>