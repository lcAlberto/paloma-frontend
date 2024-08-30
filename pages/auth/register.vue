<template>
  <div class="w-1/2">
    <Card>
      <template #content>
        <div class="flex mx-auto overflow-hidden bg-white dark:bg-gray-800 rounded-2xl">
          <div class="flex flex-row justify-center items-center gap-5 px-6 py-8">
            <div class="w-1/2">
              <div class="flex justify-center mx-auto">
                <img
                    alt=""
                    class="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                >
              </div>

              <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Registre-se grtuitamente
              </p>
              <p class="mt-3 text-sm text-gray-600 dark:text-gray-200">
                Lorem ipsum ad nostra litora nullam et ut eget, nulla proin varius sollicitudin congue adipiscing
                pharetra inceptos, netus blandit diam ut aliquam eleifend molestie. mi facilisis accumsan netus torquent
                pellentesque litora feugiat risus, convallis scelerisque ultricies
              </p>
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
                Registrar com o Google
              </span>
              </a>
            </div>

            <Divider
                class="opacity-5"
                layout="vertical"
            />

            <div class="w-1/2">
              <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <span class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
                Ou Login com email
              </span>

                <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>

              <div class="mt-4">
                <label
                    class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    for="LoggingEmailAddress"
                >Nome</label>
                <input
                    id="LoggingEmailAddress"
                    class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="email"
                />
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

              <div class="mt-4">
                <div class="flex justify-between">
                  <label
                      class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      for="loggingPassword"
                  >Senha</label>
                </div>

                <input
                    id="loggingPassword"
                    class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                />
              </div>

              <div class="mt-4">
                <div class="flex justify-between">
                  <label
                      class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      for="loggingPassword"
                  >Confirme a Senha</label>
                </div>

                <input
                    id="loggingPassword"
                    class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                />
              </div>

              <div class="mt-4">
                <div class="flex items-center">
                  <Checkbox
                      v-model="useTerms"
                      inputId="ingredient1"
                      name="pizza"
                      value="Cheese"
                  />
                  <label
                      class="ml-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      for="ingredient1"
                  >Aceito os
                    <a class="hover:underline cursor-pointer">Termos de uso</a>
                  </label>
                </div>
              </div>

              <div class="mt-6">
                <button
                    :class="{ 'disabled': !useTerms }"
                    :disabled="!useTerms"
                    class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Entrar
                </button>
              </div>

              <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <a
                    class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    href="/"
                >
                  Já tem uma conta?
                </a>

                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
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