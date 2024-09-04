<template>
  <div class="max-w-96">
    <Card>
      <template #content>
        <div class="flex mx-auto overflow-hidden bg-white dark:bg-gray-800 rounded-2xl">
          <div class="flex flex-col justify-center items-center gap-5 px-6 py-8">
            <div class="">
              <div class="flex justify-center mx-auto">
                <img
                    alt=""
                    class="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                >
              </div>

              <p class="mt-3 text-md text-center text-gray-600 dark:text-gray-200">
                Verifique a caixa de entrada do seu email
                <span class="font-bold">seu***@g***.com</span>.
                Nós enviamos um link para você prosseguir
              </p>
            </div>

            <div class="">
              <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <span class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
                Esse não é seu email?
              </span>

                <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>

              <div class="mt-4">
                <div class="flex items-center">
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-200">
                    Digite seu email corretamente para prosseguirmos
                  </p>
                </div>
              </div>

              <div class="mt-4">
                <label
                    class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    for="LoggingEmailAddress"
                >Email</label>
                <input
                    id="LoggingEmailAddress"
                    class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="email"
                />
              </div>

              <div class="mt-6">
                <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Enviar
                </button>
              </div>

              <div class="flex items-center justify-center mt-4">
                <a
                    class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    href="/"
                >
                  Lembrou da senha? Faça login
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script
    lang="ts"
    setup
>
definePageMeta({
  layout: 'guest'
})

const useTerms = ref(false)
</script>


<style scoped>

</style>