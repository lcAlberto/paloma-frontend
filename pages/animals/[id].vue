<template>
  <p>Animal: {{ id }}</p>
</template>

<script
    lang="ts"
    setup
>
const route = useRoute()
const id = route.params
</script>

<style scoped>

</style>