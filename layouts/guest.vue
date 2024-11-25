<template>
  <div class="relative">
    <div class="h-screen w-full bg-[url('~/assets/images/app/login.jpg')] bg-no-repeat bg-cover bg-fixed absolute"></div>
    <div class="bg-gradient h-screen w-full absolute top-0 flex justify-center items-center">
      <div class="w-11/12 flex justify-start items-center">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
// definePageMeta({
//   middleware: 'auth'
// })
</script>


<style scoped>
.bg-gradient {
  background-color: rgba(63, 21, 213, 0.5);
}
</style>