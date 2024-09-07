<template>
  <div class="mb-5">
    <div class="px-0">

      <a
          class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          href="#"
      >
        <div class="px-4 py-2">
          <font-awesome-icon
              :icon="['fab', 'google']"
              size="lg"
          />
        </div>
        <span class="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Google</span>
      </a>

      <a
          class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          href="#"
      >
        <div class="px-4 py-2">
          <font-awesome-icon
              :icon="['fab', 'facebook']"
              size="lg"
          />
        </div>
        <span class="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Facebook</span>
      </a>


    </div>
    <Divider
        align="center"
    >
      <small class="uppercase ">Ou entre com seu email</small>
    </Divider>
  </div>
</template>
<script
    lang="ts"
    setup
>

</script>


<style scoped>

</style>